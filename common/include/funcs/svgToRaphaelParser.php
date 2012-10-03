<?php

/*!
 * SVG to Raphael parser
 *
 * Copyright (c) 2010 Priit Pirita (http://bkp.ee/atirip)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
 
 /*
	published 22.02.2010
	added: gradient support 23.02.2010
	added: container, canvas & group name support for parse static function 18.05.2010
	
 */
	class svgToRaphaelParser {

		var $result = "\n"; // output string with Raphael code
		var $group_stack = array(); // holds group arguments
		var $default_shape_attrs = array('stroke' => 'none'); // add those if not present 
		var $nl = ";\n"; // js line ending
		var $container = 'this'; // Raphael containre name
		var $canvas = 'c'; // Raphael canvas name
		var $group = 'g'; // Raphel set name
		var $shape = false; // Raphael shape name, if you need access to shapes, set this to some string, like 's'
		var $shapeCounter = 0;

		
		/*
		
		*/
		function parse($fname, $container = 'container', $canvas = 'c', $group = 'g', $shape = false) {
			$parser = __CLASS__;
			$p = new $parser();
			$p->container = $container;
			$p->canvas = $canvas;
			$p->group = $group;
			$p->shape = $shape;
			return $p->_parse( @file_get_contents($fname) );
		}
		
		function _parse(&$str) {
			if ( !($this->xml_parser = @xml_parser_create()) ) 
				return false;
			@xml_set_object($this->xml_parser, $this);
			@xml_parser_set_option($this->xml_parser, XML_OPTION_CASE_FOLDING, 0);
			@xml_parser_set_option( $parser, XML_OPTION_SKIP_WHITE, 1 );
			@xml_set_element_handler($this->xml_parser, 'startElement', 'endElement');
			if ( !xml_parse($this->xml_parser, $str, true)) {
				return sprintf("XML error: %s at line %d\n", xml_error_string(xml_get_error_code($this->xml_parser)), xml_get_current_line_number($this->xml_parser));
			}
			@xml_parser_free($this->xml_parser);
			return $this->result;
		}

		/*
			attrs - array of attributes from XML parser
			ignore - array of names of attributes to ignore
			defaults - array of attributes to force, if not present in attrs
			
			result is string of Rapheal attr function - .attr({'stroke': 'none', 'fill' : '#000'})
			
			basically all svg attrubutes can be added as attr, so there's no need to parse x=0 y=0 width="100" height="100"
			into rect(0,0,100,100), rather we can parse it more universally (for other shapes too) as
			rect().attr({'x':0,'y':0,'width':100,'height':100})
		*/
		function attrs2attr($attrs, $ignore = array(), $defaults = array(), $res = '' ) {
			foreach(array_merge($defaults, $attrs) as $key => $val)
				if ( !in_array($key, $ignore) )
					$res .= ",'$key':'$val'";
			return strlen($res) ? ".attr({" . substr($res, 1) . "})" : '';
		}	

		/*
			keys - string or array of strings of attribute names to include as Raphael function argument
			attrs - array of attributes from XML parser
			args - resulting array of arguments
			ignore - resulting array of attributes to ignore
			
			f.e. svg path tag has argument 'd', which is needed as first argument of Raphael.path() function, so its added
			to args and ignore
			
		*/
		function attrs2args($keys, $attrs, &$args, &$ignore) {
			$keys = is_array($keys) ? $keys : array($keys);
			foreach($keys as $key):
				$args[] = $attrs[$key];
				$ignore[] = $key; // when attribute goes for argument, then ignore
			endforeach;
		}
		
		/*
			name - shape name
			attrs - attributes from XML parser
		*/
		function shape2raph($name, $attrs, $ignore = array(), $args = array() ) {
			switch ($name):
				case 'path':
					/* on path we must set 'd' as path argument */
					$this->attrs2args('d', $attrs, $args, $ignore);
					break;
				case 'image':
					$this->attrs2args('xlink:href', $attrs, $args, $ignore);
					break;
			endswitch;
			// if there's url pointing to gradient ?
			if ( isset($attrs['fill']) and preg_match('/url\(\#(.*)\)/', $attrs['fill'], $match) ):
				$attrs['fill'] = substr($this->gradients[$match[1]],0,-1);
			endif;
			$line = sprintf("%s.%s(%s)%s", $this->canvas, $name, count($args) ? "'" . implode("','", $args) . "'" : '', $this->attrs2attr($attrs, $ignore, $this->default_shape_attrs) );

			if ($this->shape ):
				$this->result .= sprintf("var %s%s=%s%s", $this->shape, ++$this->shapeCounter, $line, $this->nl);
				if ($c = count($this->group_stack)):
					$this->result .= sprintf("%s%s.push(%s)%s", $this->group, $c, sprintf("%s%s", $this->shape, $this->shapeCounter), $this->nl);
				endif;
			else:
				$this->result .= ($c = count($this->group_stack)) ? sprintf("%s%s.push(%s)%s", $this->group, $c, $line, $this->nl) : $line . $this->nl;			
			endif;
			
		}
		
		function startElement($parser, $name, $attrs) {
			$name = strtolower($name);
			switch($name):
				case 'svg':
					if ( isset($attrs['viewBox']) ):
						list($x, $y, $w, $h) = explode(" ", $attrs['viewBox']);
					else:
						$x = 0;
						$y = 0;
						$w = str_replace('px', '', $attrs['width']);
						$h = str_replace('px', '', $attrs['height']);
					endif;
					$this->result .= sprintf("var %s = Raphael(%s, %s, %s, %s, %s)%s", $this->canvas, $this->container, ceil($w), ceil($h), floor($x), floor($y), $this->nl );
					break;
					
				case 'g':
					//start group, put arguments in stack
					$this->group_stack[] = $this->attrs2attr($attrs, array('display'), array());
					$this->result .= sprintf("var %s%s = %s.set()%s", $this->group, count($this->group_stack), $this->canvas, $this->nl);
					break;

				case 'path':
				case 'image':
				case 'rect':
				case 'ellipse':
				case 'circle':
					$this->shape2raph($name, $attrs);
					break;
					
				case 'line':
					// emulate line with path
					$attrs['d'] = sprintf("M %s %s L %s %s", $attrs['x1'], $attrs['y1'], $attrs['x2'], $attrs['y2']);
					$this->shape2raph('path', $attrs, array('x1','x2','y1','y2') );
					break;

				case 'polyline':
				case 'polygon':
					// emulate polyline and polygon with path
					$f = strpos($attrs['points'], ' ');
					$attrs['d'] = sprintf("M %s L %s%s", substr($attrs['points'], 0, $f-1), substr($attrs['points'], $f+1), $name == 'polygon' ?  'z' : '');
					$this->shape2raph('path', $attrs, array('points') );
					break;

				case 'lineargradient':
					// start gradient definiton
					$this->gradients[$attrs['id']] = strval(atan2($attrs['x2']-$attrs['x1'],$attrs['y2']-$attrs['y1'])/(M_PI/180) + 270) . '-';
					break;

				case 'radialgradient':
					// start gradient definiton
					if ( isset($attrs['fx']) ):
						$this->gradients[$attrs['id']] = sprintf('r(%s,%s)', $attrs['fx'] / $attrs['cx'], $attrs['fy'] / $attrs['cy']);
					else:
						$this->gradients[$attrs['id']] = 'r';
					endif;
					break;

				case 'stop':
					// append colors (and offsets) to the gradient definition
					if ( isset($attrs['stop-color']) )
						$color = $attrs['stop-color'];
					else
						// Illustrator has style="stop-color:#000"
						foreach(explode(';', $attrs['style']) as $style):
							list($name, $color) = explode(':', $style);
							if ('stop-color' == $name)
								break;
						endforeach;
					$offset = intval(false === strpos($attrs['offset'],'%')) ? $attrs['offset'] * 100 : str_replace('%','',$attrs['offset']);
					end($this->gradients);
					$this->gradients[key($this->gradients)] .= $color . ((0 === $offset or 100 === $offset) ? '' : ':' . $offset) . '-';
					break;

			endswitch;
		}

		function endElement($parser, $name) {
			$name = strtolower($name);
			switch($name):
				case 'g':
					// if group had attributes, then set them now
					if ( strlen($str = array_pop($this->group_stack)) )
						$this->result .= sprintf("%s%s%s%s", $this->group, count($this->group_stack)+1, $str, $this->nl);
					break;
			endswitch;
		}

	}
?>