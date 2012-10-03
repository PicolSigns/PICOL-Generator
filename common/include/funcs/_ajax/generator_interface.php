<?php
header("Content-type: text/plain");
// Remove dir recoursively
require_once("../r_rm_dir.php");

$main_directory = "../../../"; // Main directory
// Creates session directory
$microtime_dir = str_replace(array(".", " "), array("", "_"), microtime());
$new_dir = "picol_prerelease/" . date("d-m-Y") . "/" . $microtime_dir . "/picol_prerelease_" . date("mdy");
if (!file_exists("../../../../generated/picol_prerelease")) {
	mkdir("../../../../generated/picol_prerelease");
	chmod("../../../../generated/picol_prerelease", 0777);
} else {
	// Delete old sessions - make clean
	$temp_dir = @opendir("../../../../generated/picol_prerelease");
	if (opendir("../../../../generated/picol_prerelease")){
		while ($dirs = readdir($temp_dir)){
			if ($dirs !== "." && $dirs !== ".."){
				if (date("d-m-Y") !== $dirs){
					r_rm_dir("../../../../generated/picol_prerelease/" . $dirs);
				}
			}
		}
		closedir($temp_dir);
	}
}
if (!file_exists("../../../../generated/picol_prerelease/" . date("d-m-Y"))) {
	mkdir("../../../../generated/picol_prerelease/" . date("d-m-Y"));
	chmod("../../../../generated/picol_prerelease/" . date("d-m-Y"), 0777);
}
if (!file_exists("../../../../generated/picol_prerelease/" . date("d-m-Y") . "/" . $microtime_dir)) {
	mkdir("../../../../generated/picol_prerelease/" . date("d-m-Y") . "/" . $microtime_dir);
	chmod("../../../../generated/picol_prerelease/" . date("d-m-Y") . "/" . $microtime_dir, 0777);
}
if (!file_exists("../../../../generated/picol_prerelease/" . date("d-m-Y") . "/" . $microtime_dir . "/picol_prerelease_" . date("mdy"))) {
	mkdir("../../../../generated/picol_prerelease/" . date("d-m-Y") . "/" . $microtime_dir . "/picol_prerelease_" . date("mdy"));
	chmod("../../../../generated/picol_prerelease/" . date("d-m-Y") . "/" . $microtime_dir . "/picol_prerelease_" . date("mdy"), 0777);
}
	
$le_immaginine = "";
$directory = $main_directory . "/media/svg/icons"; // directory for preview
$dir = @opendir($directory);
if (opendir($directory)){
	while ($file = readdir($dir)){
		if ($file !== "." && $file !== ".."){
			$immaginine[] = $file;
			$le_immaginine .= str_replace(strrchr($file, "."), "", $file) . ",";
		}
	}
	closedir($dir);
}
sort($immaginine);

$returns["new_dir"] = $new_dir;
$returns["images"] = $immaginine;
print json_encode($returns);
?>