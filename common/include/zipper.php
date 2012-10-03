<?php
header("Content-type: text/plain");

function check_and_load_pear($package_name, $package_file, $package_local_file){
	@require_once("System.php");
	if(class_exists("System", false)){
		include("PEAR/Registry.php");
		$reg = new PEAR_Registry;
		if(!in_array($package_name, $reg->listPackages())){
			return include ($package_local_file);
		} else {
			return include ($package_file);
		}
	}
}
function is_plural($item, $txt){
	if((int)$item > 1){
		return $txt . "s";
	} else {
		return $txt;
	}
}
$selected_files = explode(",", $_GET["files"]);
foreach($selected_files as $k => $selected_file){
	if(trim($selected_file) == ""){
		unset($selected_files[$k]);
	}
}
if(!isset($_GET["type"])){
	$type = "ZIP";
	$content_type = "application/zip";
} else {
	$type = strtoupper($_GET["type"]);
	$content_type = "application/x-gzip";
}
$directory = "../../generated/" . $_GET["tmp"];
$delete_directory = "../../generated/" . str_replace("/picol_prerelease_" . date("mdy"), "", $_GET["tmp"]);
$readme_filename = "README";
$readme_file = $delete_directory . "/" . $readme_filename;
	$compressed_filename = "picol_generated." . strtolower($type);
	$compressed_file = $directory . "/" . $compressed_filename;

if (opendir($directory)){
	$dir_ = @opendir($directory);
	if($type == "ZIP"){
		check_and_load_pear("archive_zip", "Archive/Zip.php", "funcs/PEAR/Zip.php");
		
		$obj = new Archive_Zip($compressed_file);
		$dirs = scandir($directory, 1);
		foreach($dirs as $dir){
			if($dir !== "." && $dir !== ".."){
				if(is_dir($directory . "/" . $dir)){
					$files = scandir($directory . "/" . $dir, 1);
					foreach($files as $file){
						if($file !== "." && $file !== ".." && in_array($file, $selected_files)){
							$the_file = $directory . "/" . $dir . "/" . $file;
							$files_data[$dir][] = $file;
							
							// Remove all track of temporaries path and stores files in "picol_prerelease_{DATE}" - like at http://picol.org/
							if ($session_count == 1){
								$obj->create($the_file, array("remove_all_path" => true, "add_path" => "picol_prerelease_" . date("mdy") . "/" . $dir));
							} else {
								$obj->add($the_file, array("remove_all_path" => true, "add_path" => "picol_prerelease_" . date("mdy") . "/" . $dir));
							}
						}
					}
				}
			}
		}
	} else {
		check_and_load_pear("archive_tar", "Archive/Tar.php", "funcs/PEAR/Tar.php");
		
		$obj = new Archive_Tar($compressed_file, "gz");
		$dirs = scandir($directory, 1);
		foreach($dirs as $dir){
			if($dir !== "." && $dir !== ".."){
				if(is_dir($directory . "/" . $dir)){
					$files = scandir($directory . "/" . $dir, 1);
					foreach($files as $file){
						if($file !== "." && $file !== ".." && in_array($file, $selected_files)){
							$the_file[] = $directory . "/" . $dir . "/" . $file;
							$files_data[$dir][] = $file;
						}
					}
				}
			}
		}
	}
	// Only for debug
	// header("Content-type: text/plain");
	/*////////////////////////////// CALCULATE THE STATISTICS OF STORED FILES //////////////////////////////*/
	krsort($files_data);
	foreach($files_data as $fk => $fv){
		sort($fv);
		foreach($fv as $fvv){
			$files_list[] = $fvv;
			$filed_arr = explode(".", $fvv);
			$icons[] = $filed_arr[0];
		}
	}
	$list_of_files = implode("\n - ", $files_list);
	$total_icons = count($icons);
	$h = 0;
	foreach($icons as $icon_file_name){
		$h++;
		$icon_file_data = explode("_", $icon_file_name);
		$i = 0;
		foreach($icon_file_data as $ifd){
			$i++;
			if($i < count($icon_file_data)){
				$icon_types[$h][$i] = $ifd;
			}
			if($i == count($icon_file_data)-1){
				$used_size[] = $ifd;
			}
			if($i == count($icon_file_data)){
				$used_color[] = $ifd;
			}
		}
	}
	foreach($icon_types as $k => $v){
		$itypes[] = implode("_", $v);
	}
	$icon_type = array_unique($itypes);
	$used_sizes = array_unique($used_size);
	$used_colors = array_unique($used_color);
	$total_icon_types = count($icon_type);
	$total_used_sizes = count($used_sizes);
	$total_used_colors = count($used_colors);
	
	$stats = $total_icons . " total " . is_plural($total_icons, "icon") . "\n + " . $total_icon_types . " icon-" . is_plural($total_icon_types, "type") . " used\n + " . $total_used_sizes . " " . is_plural($total_used_sizes, "size") . " used\n + " . $total_used_colors . " " . is_plural($total_used_colors, "color") . " used";
	
	/*////////////////////////////// ADD THE README FILE IN THE ROOT OF COMPRESSED FILE //////////////////////////////*/
	// Open the file and write it
	$fp = fopen($readme_file, "w");
	$date = date("m-d-Y");
	$readme = <<<README
This information and license notice covers the images in this directory.
/////////////////////////////////////////////////////////

Title: PICOL, Pictorial Commnuication Language
Designer: Melih Bilgil
URL: http://www.picol.org
E-Mail: dropaline@picol.org

This $type file was created with the PICOL Generator made by Alessandro Gubitosi
http://gubi.github.com/
You can download and use it under the terms of GPL license
https://github.com/gubi/PICOL-Generator

Date: $date
Description: Pre-release of the PICOL Icons online self generated
Files list:
 - $list_of_files

Statistics:
 + $stats

/////////////////////////////////////////////////////////

This work is licensed under a Creative Commons Attribution-Share Alike 3.0 Unported License. http://creativecommons.org/licenses/by-sa/3.0/

You are free:
- to Share — to copy, distribute and transmit the work
- to Remix — to adapt the work

Under the following conditions:
Attribution. 
Include a link to picol.org or blog.picol.org in your credits or any fitting place.

Share Alike. 
If you alter, transform, or build upon this work, you may distribute the resulting work only under the same, similar or a compatible license.

/////////////////////////////////////////////////////////

Feel free to send a mail dropaline@picol.org with a link or a screenshot of your project, if you've used the PICOL signs.

You can also download the entire generator!
Here's the code: https://github.com/gubi/PICOL-Generator
Is licensed under GPL!

Have fun with them. we hope you like the icons.

/////////////////////////////////////////////////////////
All available icons can be found on 
http://blog.picol.org/downloads/icons
README;
	
	fwrite($fp, $readme);
	fclose($fp);
	
	// Insert the readme file in the zip
	if($type == "ZIP"){
		$obj->add($readme_file, array("remove_all_path" => true));
	} else {
		$the_file[] = $readme_file;
		$obj->createModify($the_file, "", $delete_directory);
	}
	/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
	// Force download
	header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
	header("Content-type: " . $content_type . ";\n");
	header("Content-Transfer-Encoding: binary");
	header("Content-Disposition: attachment; filename=\"" . $compressed_filename . "\";\n\n");
	readfile($compressed_file);
	
	closedir($dir_);
	unlink($readme_file);
	unlink($compressed_file);
}
?>