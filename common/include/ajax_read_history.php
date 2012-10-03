<?php
if (isset($_GET["dir"]) && trim($_GET["dir"]) !== ""){
	$directory = "../../generated/" . urldecode($_GET["dir"]);
	
	$dirs = scandir($directory, 1);
	foreach($dirs as $dir){
		if($dir !== "." && $dir !== ".."){
			if(is_dir($directory . "/" . $dir)){
				$files = scandir($directory . "/" . $dir, 1);
				foreach($files as $file){
					if($file !== "." && $file !== ".."){
						$the_files[][urldecode($_GET["dir"]) . "/" . $dir] = $file;
					}
				}
			}
		}
	}
}
if (is_array($the_files)){
	sort($the_files);
	foreach($the_files as $k => $v){
		foreach($v as $path => $file){
			print "<tr id=\"history_" . $file . "\" class=\"history\">";
				print "<td style=\"width: 27px\"><input type=\"checkbox\" checked=\"checked\" name=\"" . $file . "\" onclick=\"blacklist()\" /></td>";
				print "<td style=\"width: 18px\"><img src=\"generated/" . $path . "/" . $file . "\" /></td><td>" . $file . "</td>";
			print "</tr>";
		}
	}
}
?>