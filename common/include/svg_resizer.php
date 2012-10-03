<?php
// Size
if (!isset($_GET["size"]) || trim($_GET["size"]) == "" || !is_numeric($_GET["size"])){
	$size = 32;
} else {
	$size = $_GET["size"];
}

$main_directory = "../media/svg/"; // Main directory
if (!isset($_GET["type"]) || trim($_GET["type"]) == "icons"){
	$directory = $main_directory . "icons"; // directory for preview
} else {
	$directory = $main_directory . "badges";
}
$dir = @opendir($directory);
if (opendir($directory)){
	while ($file = readdir($dir)){
		if ($file !== "." && $file !== ".."){
			$files[] = $file;
		}
	}
	closedir($dir);
}
sort($files);
foreach($files as $f => $file){
	if ($f == $_GET["f"]){
		// Size
		if (!isset($_GET["filename"]) || trim($_GET["filename"]) == ""){
			$file = $file;
		} else {
			$file = $_GET["filename"];
		}
		$im = new Imagick();
		$im -> readImage($directory . "/" . $file);
		$res = $im -> getImageResolution();
		$x_ratio = $res['x'] / $im -> getImageWidth();
		$y_ratio = $res['y'] / $im -> getImageHeight();
		$im -> removeImage();
		$im -> setResolution($size * $x_ratio, $size* $y_ratio);
		$im -> readImage($directory . "/" . $file);
		$im -> setImageFormat("png");
		
		header("Content-Type: image/png");
		print $im;
	}
}
?>