<?php
#
#	This program is free software: you can redistribute it and/or modify
#	it under the terms of the GNU General Public License as published by
#	the Free Software Foundation, either version 3 of the License, or
#	(at your option) any later version.
#
#	This program is distributed in the hope that it will be useful,
#	but WITHOUT ANY WARRANTY; without even the implied warranty of
#	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#	GNU General Public License for more details.
#
#	You should have received a copy of the GNU General Public License
#	along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
#
#	- - -
#	Created by Alessandro Gubitosi
#	for the PICOL Project
#	on November 2010
#

if(!defined("SYSTEM_ROOT")) {
    require_once("_defines.php");
}

if ($_SERVER["REQUEST_URI"] !== "/apps/picol_generator/1.2/"){
	$local_path = "http://www.gotanotherway.com/apps/picol_generator/1.1.6/";
} else {
	$local_path = "";
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="it" dir="ltr">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<title>PICOL generator</title>

		<base href="" />
		<meta name="Author" content="Alessandro Gubitosi" />
		<meta name="Description" content="Create, configure and export your own PICOL incons set." />
		<meta name="Keywords" content="PICOL PIctorial COmmunication Language icon generator svg png" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<!-- <link type="text/css" href="common/js/jquery/jquery-ui-1.8.23.custom/css/smoothness/jquery-ui-1.8.23.custom.css" rel="stylesheet" media="screen" /> -->
		<!-- jquery AnythingSlider -->
		<!-- <link type="text/css" href="<?php print BOWER_URI; ?>/picol_anythingslider.css" rel="stylesheet" media="screen" /> -->

		<link rel="stylesheet" href="<?php print BOWER_URI; ?>picol-font/css/picol.css" type="text/css" media="screen" />
		<link rel="stylesheet" href="<?php print BOWER_URI; ?>materialize/dist/css/materialize.min.css" type="text/css" media="screen" />
        <link rel="stylesheet" href="<?php print BOWER_URI; ?>anythingslider/css/anythingslider.css" />
        <link rel="stylesheet" href="<?php print BOWER_URI; ?>colorpicker/jquery.colorpicker.css" />
		<link rel="stylesheet" href="<?php print CSS_URI; ?>main.min.css" type="text/css" media="screen" />
	</head>
	<body>
		<!-- <div id="loader"></div> -->
		<div id="generator_interface" class="row">
            <div id="slider_content" class="col l6 col m6 col s8 offset-l3 offset-m3 offset-s2">
            	<ul id="slider"></ul>
            </div>
		</div>
		<br />
		<br />
        <!-- Insert here your contents -->
        <!-- ... -->
        <!--  -->

        <!-- jQuery & jQuery UI -->
        <script type="text/javascript" src="<?php print BOWER_URI; ?>jquery/dist/jquery.min.js"></script>
        <script type="text/javascript" src="<?php print BOWER_URI; ?>js-storage/js.storage.min.js"></script>
        <script type="text/javascript" src="<?php print BOWER_URI; ?>jquery-ui/jquery-ui.min.js"></script>
        <script type="text/javascript" src="<?php print BOWER_URI; ?>materialize/dist/js/materialize.min.js"></script>
        <script type="text/javascript" src="<?php print BOWER_URI; ?>jquery.scrollTo/jquery.scrollTo.min.js"></script>
        <script type="text/javascript" src="<?php print BOWER_URI; ?>colorpicker/jquery.colorpicker.js"></script>
        <script type="text/javascript" src="<?php print BOWER_URI; ?>anythingslider/js/jquery.anythingslider.min.js"></script>
        <script type="text/javascript" src="<?php print JS_URI; ?>main.js"></script>
	</body>
</html>
