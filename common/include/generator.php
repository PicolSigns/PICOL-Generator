<?php
// Place an "hole" in the img
function image_mask(&$src, &$mask) {
	imagesavealpha($src, true);
	imagealphablending($src, false);
	// scan image pixels
	for ($x = 0; $x < imagesx($src); $x++) {
		for ($y = 0; $y < imagesy($src); $y++) {
			$mask_pix = imagecolorat($mask,$x,$y);
			$mask_pix_color = imagecolorsforindex($mask, $mask_pix);
			if ($mask_pix_color['alpha'] < 127) {
				$src_pix = imagecolorat($src,$x,$y);
				$src_pix_array = imagecolorsforindex($src, $src_pix);
				imagesetpixel($src, $x, $y, imagecolorallocatealpha($src, $src_pix_array['red'], $src_pix_array['green'], $src_pix_array['blue'], 127 - $mask_pix_color['alpha']));
			}
		}
	}
}
if ($_GET["size"] && trim($_GET["size"]) !== ""){
	ob_start();
			// Change this path if you want to generate only from PNG
			$main_dir = "../media/svg/";

	if ($_GET["img"] == "document_page_width.svg" || $_GET["img"] == "document_page_width.png"){
		//From root
		$img_directory = $main_dir;
	} else {
		//From root
		$img_directory = $main_dir . "icons";
	}
	$badge_directory = $main_dir . "badges";

	$color = $_GET["color"];
	if($color == "000" || $color == "000000"){
		$color_name = "";
	} else {
		$color_name = "_" . $color;
	}
	if ($_GET["img"] && trim($_GET["img"]) !== ""){
		// If the user want the badge
		if (isset($_GET["badge"]) && trim($_GET["badge"]) !== ""){
			$_GET["img"] = str_replace(".png", ".svg", $_GET["img"]);
			$_GET["badge"] = str_replace(".png", ".svg", $_GET["badge"]);
			$size = $_GET["size"];

			// Get the first image
			$first = new Imagick();
			$first -> setBackgroundColor(new ImagickPixel('transparent'));
			$first -> readImage($img_directory . "/" . trim($_GET["img"]));
				// Get the resolution
				$res = $first -> getImageResolution();
				$x_ratio = $res['x'] / $first -> getImageWidth();
				$y_ratio = $res['y'] / $first -> getImageHeight();
				$first -> removeImage();
				// Set new resolution
				$first -> setResolution($size * $x_ratio, $size* $y_ratio);
				$first -> readImage($img_directory . "/" . trim($_GET["img"]));
			// - - -
			// Mask image (change to "mask.png" if you want generate from PNG)
			$cancel = new Imagick();
			$cancel -> setBackgroundColor(new ImagickPixel('transparent'));
			$cancel -> readImage($main_dir . "mask.svg");
				// Get the resolution
				$res = $cancel -> getImageResolution();
				$x_ratio = $res['x'] / $cancel -> getImageWidth();
				$y_ratio = $res['y'] / $cancel -> getImageHeight();
				$cancel -> removeImage();
				// Set new resolution
				$cancel -> setResolution($size * $x_ratio, $size* $y_ratio);
				$cancel -> readImage($main_dir . "mask.svg");
			// - - -
			// Get the second image (badge)
			$second = new Imagick();
			$second -> setBackgroundColor(new ImagickPixel('transparent'));
			$second -> readImage($badge_directory . "/" . trim($_GET["badge"]));
				$res = $second -> getImageResolution();
				$x_ratio = $res['x'] / $second -> getImageWidth();
				$y_ratio = $res['y'] / $second -> getImageHeight();
				$second -> removeImage();
				$second -> setResolution($size * $x_ratio, $size* $y_ratio);
				$second -> readImage($badge_directory . "/" . trim($_GET["badge"]));

			// Second image is put on top of the first
			$first -> compositeImage($cancel, imagick::COMPOSITE_DSTOUT, 0, 0);
			$first -> compositeImage($second, imagick::COMPOSITE_OVER, 0, 0);
			$first -> colorizeImage("#" . $color, 1, true);
			$first -> setImageFormat("png32");
			$img_c = $first;

			$name = str_replace(".svg", "", $_GET["img"]);
			$name_badge = str_replace(".svg", "_" . $_GET["size"] . $color_name . ".png", str_replace("badge", "", $_GET["badge"]));
			$file_name = $name . $name_badge;
				if (isset($_GET["new_dir"])){
					if (!file_exists("../../generated/" . $_GET["new_dir"] . "/" . $_GET["size"])) {
						mkdir("../../generated/" . $_GET["new_dir"] . "/" . $_GET["size"]);
						chmod("../../generated/" . $_GET["new_dir"] . "/" . $_GET["size"], 0777);
					}
					$first -> writeImage("../../generated/" . $_GET["new_dir"] . "/" . $_GET["size"] . "/" . $file_name);
				}
		// If the user don't need a badge
		} else {
			// Comment this line if you want generator from PNG
			$_GET["img"] = str_replace(".png", ".svg", $_GET["img"]);
			$size = $_GET["size"];

			$first = new Imagick();
			$first -> setBackgroundColor(new ImagickPixel('transparent'));
			$first -> readImage($img_directory . "/" . trim($_GET["img"]));
				$res = $first -> getImageResolution();
				$x_ratio = $res['x'] / $first -> getImageWidth();
				$y_ratio = $res['y'] / $first -> getImageHeight();
				$first -> removeImage();
				$first -> setResolution($size * $x_ratio, $size* $y_ratio);
				$first -> readImage($img_directory . "/" . trim($_GET["img"]));
<<<<<<< Updated upstream
				$first -> colorizeImage("#" . $color, 1, true));
			
=======
				$first -> colorizeImage("#" . $color, 1, true);

>>>>>>> Stashed changes
			$first -> setImageFormat("png32");
			$img_c = $first;
			$file_name = str_replace(".svg", "_" . $_GET["size"] . $color_name . ".png", $_GET["img"]);
				if (isset($_GET["new_dir"])){
					if (!file_exists("../../generated/" . $_GET["new_dir"] . "/" . $_GET["size"])) {
						mkdir("../../generated/" . $_GET["new_dir"] . "/" . $_GET["size"]);
						chmod("../../generated/" . $_GET["new_dir"] . "/" . $_GET["size"], 0777);
					}
					$first -> writeImage("../../generated/" . $_GET["new_dir"] . "/" . $_GET["size"] . "/" . $file_name);
				}
		}
	}
	if (!isset($_GET["action"]) || trim($_GET["action"]) !== "show"){
		header("Content-Disposition: Attachment; filename=" . $file_name);
	}
	header("Content-Type: image/png");
	print $img_c;
	ob_end_flush ();
}
?>
