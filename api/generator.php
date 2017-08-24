<?php
header("Content-Type: text/plain;");


/**
 * Class Generator
 *
 * @author  Alessandro Gubitosi <gubi.ale@iod.io>
 * @version 1.0.0
 * @uses    libRSVG https://wiki.gnome.org/action/show/Projects/LibRsvg
 * @uses    convert https://www.imagemagick.org/script/convert.php
 */
class PICOL_Generator {
	static $req;
	static $roots;
    static $ext = ".svg";
    static $output;

    /**
     * Convert a regular Hexadecimal colour (6 characters) to its shorthand (3 characters)
     * @param  string                           $colour                         The hex colour
     * @return string                                                           The shorthand hex colour
     */
    private static function hex2shorthand($colour) {
        return preg_replace('/([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/i', "$1$3$5", $colour);
    }

    /**
     * Convert a shorthand Hexadecimal colour (3 characters) to its regular value (6 characters)
     * @param  string                           $colour                         The hex colour
     * @return string                                                           The shorthand hex colour
     */
    private static function shorthand2hex($colour) {
        return preg_replace('/([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/i', "$1$1$2$2$3$3", $colour);
    }

    /**
     * Convert an Hexadecimal colour to the corresponding RGBA value
     * @param  string                           $hex                            The Hexadecimal colour
     * @return string                                                           The rgba() value
     */
    private static function hex2rgba($hex, $alpha = 100) {
        $hex = "#" . str_replace("#", "", ((strlen($hex) == 3) ? self::shorthand2hex($hex) : $hex));
        list($r, $g, $b) = sscanf($hex, "#%02x%02x%02x");
        $alpha = number_format(($alpha < 0) ? 0 : (($alpha > 100) ? 100 : floatval($alpha)), 1, ".", "");
        return "rgba({$r}, {$g}, {$b}, {$alpha})";
    }

    /**
     * Clean and compact a given hexadecimal colour
     * @param  string                           $colour                         The subject hexadecimal color
     * @return string                                                           The cleaned and (in case) compacted hexadecimal colour
     */
    private static function compact_hex_colour($colour) {
        $colour = trim(substr(preg_replace('/[^0-9a-fA-F]+/iu', "", $colour), 0, 6));
        preg_match_all('/[0-9a-fA-F]/', $colour, $hex);
        $hex = $hex[0];
        $imploded = implode("", $hex);
        return ($hex[0] == $hex[1] && $hex[2] == $hex[3] && $hex[4] == $hex[5]) ? self::hex2shorthand($imploded) : $imploded;
    }

    /**
    * Remove a value in array
    * @param  array                            $array                          The subject array
    * @param  string|integer                   $value                          The value to remove
    * @return array                                                            The array without the given value
    */
    private static function remove_array_value($array, $value) {
        $array = array_unique($array);
        $key = array_search($value, $array);
        if(false !== $key) {
            unset($array[$key]);
        }
        return $array;
    }

    /**
     * Adjust the `alpha` input
     * @param  integer|float                    $alpha                          The alpha input
     * @param  integer|float                    $alpha                          The alpha value
     * @return float                                                            The correct alpha setting
     */
    private static function adjust_alpha($alpha) {
        $alpha = floatval($alpha);
        $alpha = ($alpha > 10 && $alpha <= 100) ? $alpha / 100 : $alpha;
        $alpha = ($alpha > 1 && $alpha <= 10) ? $alpha / 10 : $alpha;
        $alpha = ($alpha > 1) ? 1 : $alpha;
        $alpha = ($alpha <= 0) ? 0.1 : $alpha;
        return ($alpha < 1) ? number_format($alpha, 1, ".", "") : $alpha;
    }


    /* ---------------------------------------------------------------------- */

    /**
     * Set root paths
     * @return array                                                            An array with all needed root paths
     */
    private static function get_root_paths() {
        $main_dir = "media/svg/";
        $roots = [
            "root"   => $main_dir,
            "img"   => $main_dir . ((self::$req->img == "document_page_width" . self::$ext) ? "" : "icons/"),
            "badge" => $main_dir . "badges/",
            "tmp" => [
                "root"  => "tmp/",
                "img"   => "tmp/img/",
                "badge" => "tmp/badges/",
                "mask"  => "tmp/masks/"
            ]
        ];

        return $roots;
    }

    /**
     * Parse the request
     * @param  array                            $request                        The request array
     * @return object                                                           An object with all needed collected params
     */
	public static function parse_request($request) {
		$req = new stdClass();
		$req->size = ((isset($request["size"]) && strlen($request["size"]) >= 2) ? trim(preg_replace('/[^\d]+/', "", $request["size"])) : 16);
		$req->colour = ((isset($request["colour"]) && strlen($request["colour"]) >= 3) ? self::compact_hex_colour($request["colour"]) : "000");
        $req->alpha = self::adjust_alpha((isset($request["alpha"]) && strlen($request["alpha"]) >= 1) ? trim(preg_replace('/[^\d\.\-]+/', "", $request["alpha"])) : 100);
		$req->img = ((isset($request["img"]) && strlen($request["img"]) >= 3) ? trim(preg_replace('/[^\w\d\_]+/', "", str_replace([".png", ".svg"], "", $request["img"]))) . self::$ext : "document_page_width" . self::$ext);
		$req->badge = (isset($request["badge"]) ? "badge_" . trim(preg_replace('/[^\w\d\_]+/', "", str_replace(["badge_", ".png", ".svg"], "", $request["badge"]))) . self::$ext : null);
		$req->show = ((isset($request["action"]) && $request["action"] == "show") ? true : false);
		return $req;
	}

    /**
     * Change the temporary file name with the following structure:
     * `picol_image`_`size`_`colour`_`alpha`.ext
     * @example document_text_300_f0f.png
     *
     * @param  string                           $file                           The bad file name
     * @param  boolean                          $add_badge                      If true add the badge to the name
     * @param  boolean                          $add_colour                     If true add the colour to the name
     * @param  boolean                          $add_alpha                      If true add the colour to the name
     * @return string                                                           The conventional PICOL Icon name
     */
    private static function convert_name($file, $add_badge = false, $add_colour = true, $add_alpha = false) {
        $info = pathinfo($file);
        // Parse the badge input
        $badge = str_replace(["badge_", ".svg"], "", self::$req->badge);
        // Parse the colour input
        $colour = self::$req->colour;
        // Parse the alpha input
        $alpha = preg_replace("/[\.]+/", "", "a" . self::$req->alpha);
        $filename = explode("_", $info["filename"]);
        $filename = self::remove_array_value($filename, $badge);
        $filename = self::remove_array_value($filename, self::$req->size);
        $filename = self::remove_array_value($filename, self::$req->colour);
        $filename = self::remove_array_value($filename, self::$req->alpha);
        // Add the badge
        if($add_badge) {    $filename[] = $badge;   }
        // The size is placed for anycase
        $filename[] = self::$req->size;
        // Add the colour
        if($add_colour) {   $filename[] = $colour;  }
        if($add_alpha) {    $filename[] = $alpha;   }

        // Preserve the tmp file path
        $dirname = ($info["dirname"] !== ".") ? $info["dirname"] . "/" : "";
        return $dirname . implode("_", $filename) . ".png";
    }

    private static function execute_cmd($command) {
        // print $command . "\n";
        return ($command == "done" || trim(shell_exec($command)) == "done") ? true : false;
    }

    /**
     * Generate the image
     * @uses rsvg-convert
     * @see  https://wiki.gnome.org/action/show/Projects/LibRsvg
     * @see  https://en.wikipedia.org/wiki/Librsvg
     * @uses convert
     * @see  https://www.imagemagick.org/script/convert.php
     *
     * @param  string                           $path                           The path of the image
     * @param  string                           $img                            The subject image
     * @return string                                                           The image generation command
     */
    private static function generate_image_cmd($path, $img, $tmp_path) {
        $tmp_p = explode("/", $tmp_path);
        if(count($tmp_p) == 1) {
            $tmp = self::$roots[$tmp_p[0]];
        } else {
            $tmp = self::$roots[$tmp_p[0]][$tmp_p[1]];
        }

        $filename = ($tmp_path !== "tmp/mask") ? self::convert_name($img, false, false) : self::convert_name($img, false, false);
        $output_file = $tmp . $filename;

        // Prevent file overwriting
        if(!file_exists($tmp . $filename)) {
            $command = "rsvg-convert -a";
            $sizes = "-w " . self::$req->size . " -h " . self::$req->size;
            $source = $path . $img;
            $after = "echo '" . $tmp . $filename . "'";
            $generate_image_cmd = "\"$({$command} {$sizes} {$source} > {$output_file} && {$after})\"";
        } else {
            $generate_image_cmd = $tmp . $filename;
        }
        return $generate_image_cmd;
    }

    /**
     * Generate the requested image
     * @uses convert
     * @see  https://www.imagemagick.org/script/convert.php
     * @uses sRGB.icc colour profile
     * @see  http://archive.ubuntu.com/ubuntu/pool/main/i/icc-profiles-free/
     *
     * @return mixed                                                            Render the generated image or promt for download
     */
    private static function generate_picol() {
        $output_img = self::$roots["tmp"]["root"] . self::convert_name(self::$req->img, !is_null(self::$req->badge), false);
        $after = "echo 'done'";
        $alpha = (self::$req->alpha == 1) ? 1 : self::$req->alpha;
        $final_img = self::convert_name($output_img, true, true, ($alpha !== 1));

        /**
         * Get the image
         */
        $img = self::generate_image_cmd(self::$roots["img"], self::$req->img, "tmp/img");

        // Prevent file recreation
        if(!file_exists($final_img)) {
            if(!is_null(self::$req->badge)) {
                /**
                 * Mask the image for the badge overlay
                 */
    			$mask = self::generate_image_cmd(self::$roots["root"], "mask" . self::$ext, "tmp/mask");

                /**
                 * Generate the badge
                 */
    			$badge = self::generate_image_cmd(self::$roots["badge"], self::$req->badge, "tmp/badge");

                /**
                 * Generate the command to execute on the Server
                 */
                if(!file_exists($output_img)) {
                    $merge_command = "convert -density 5000 {$badge} {$img} {$mask} -composite {$output_img} && {$after}";
                } else {
                    $merge_command = "done";
                }
            } else {
                // This file was already generated!
                // So we just need to copy to another position
                $merge_command = "cp {$img} {$output_img} && {$after}";
            }
            $colourize_command = "convert {$output_img} -fuzz 99% -alpha on -alpha on -channel rgba -fill '" . self::hex2rgba(self::$req->colour, self::$req->alpha) . "' -opaque black -alpha on -channel a -evaluate multiply {$alpha} +channel -profile sRGB.icc {$final_img} && {$after}";
            // Merge
            if(self::execute_cmd($merge_command)) {
                // Colourize
                if(self::execute_cmd($colourize_command)) {
                    self::$output = $final_img;
                    self::output();
                }
            }
        } else {
            self::$output = $final_img;
            self::output();
        }
    }

    private static function output() {
        if(!self::$req->show) {
            $info = pathinfo(self::$output);
            header("Content-Disposition: Attachment; filename=" . $info["filename"] . "." . $info["extension"]);
        }
    	header("Content-Type: image/png");
    	readfile(self::$output);
    }

	public static function run($request) {
        ob_start();
        self::$req = self::parse_request($request);
        self::$roots = self::get_root_paths();

        if(self::$req->img !== "") {
            self::generate_picol();
        }
    	ob_end_flush ();
	}
}

PICOL_Generator::run($_GET);

?>
