<?php
header("Content-Type: text/plain;");


/**
 * Class Generator
 *
 * @author  Alessandro Gubitosi <gubi.ale@iod.io>
 * @version 1.0.0
 * @uses    yaml_parse_file http://php.net/manual/en/book.yaml.php
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
    private static function reg_hex2shorthand($colour) {
        return preg_replace('/([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/i', "$1$3$5", $colour);
    }

    /**
     * Convert a shorthand Hexadecimal colour (3 characters) to its regular value (6 characters)
     * @param  string                           $colour                         The hex colour
     * @return string                                                           The shorthand hex colour
     */
    private static function shorthand2reg_hex($colour) {
        return preg_replace('/([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/i', "$1$1$2$2$3$3", $colour);
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
		$req->size = ((isset($request["size"]) && strlen($request["colour"]) >= 2) ? trim(preg_replace('/[^\d]+/', "", $request["size"])) : 16);
		$req->colour = ((isset($request["colour"]) && strlen($request["colour"]) >= 3) ? trim(substr(preg_replace('/[^0-9a-fA-F]+/iu', "", $request["colour"]), 0, 6)) : "000");
        if(strlen($req->colour) == 6) {
            $req->colour = self::reg_hex2shorthand($req->colour);
        }
		$req->img = ((isset($request["img"]) && strlen($request["img"]) >= 3) ? trim(preg_replace('/[^\w\d\_]+/', "", str_replace([".png", ".svg"], "", $request["img"]))) . self::$ext : "document_page_width");
		$req->badge = (isset($request["badge"]) ? "badge_" . trim(preg_replace('/[^\w\d\_]+/', "", str_replace(["badge_", ".png", ".svg"], "", $request["badge"]))) . self::$ext : null);
		$req->show = ((isset($request["action"]) && $request["action"] == "show") ? true : false);
		return $req;
	}

    /**
     * Change the temporary file name with the following structure:
     * `picol_image`_`size`_`colour`.ext
     * @example document_text_300_f0f.png
     *
     * @param  string                           $file                           The bad file name
     * @param  boolean                          $add_badge                      In true add the badge to the name
     * @return string                                                           The conventional PICOL Icon name
     */
    private static function convert_name($file, $add_badge = false) {
        $badge = (($add_badge) ? str_replace(["badge_", ".svg"], "_", self::$req->badge) : "_");
        return str_replace(self::$ext, $badge . self::$req->size . "_" . self::$req->colour . ".png", $file);
    }

    /**
     * Generate the image
     * @uses rsvg-convert
     * @see https://wiki.gnome.org/action/show/Projects/LibRsvg
     * @see https://en.wikipedia.org/wiki/Librsvg
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

        // Prevent file overwriting
        if(!file_exists($tmp . self::convert_name($img))) {
            $command = "rsvg-convert -a";
            $sizes = "-w " . self::$req->size . " -h " . self::$req->size;
            $source = $path . $img;
            $output = $tmp . self::convert_name($img);
            if($tmp_path !== "tmp/mask") {
                $colourize = "&& convert -fuzz 100% " . $tmp . self::convert_name($img) . " -fill '#" . self::shorthand2reg_hex(self::$req->colour) . "' -opaque '#000' " . $tmp . self::convert_name($img);
            } else {
                $colourize = "";
            }
            $after = "echo '" . $tmp . self::convert_name($img) . "'";
            $generate_image_cmd = "\"$({$command} {$sizes} {$source} > {$output} {$colourize} && {$after})\"";
        } else {
            $generate_image_cmd = $tmp . self::convert_name($img);
        }
        // print $generate_image_cmd;
        // exit();
        return $generate_image_cmd;
    }

    /**
     * Generate the requested image
     * @return mixed                                                            Render the generated image or promt for download
     */
    private static function generate_picol() {
        /**
         * Get the image
         */
        $img = self::generate_image_cmd(self::$roots["img"], self::$req->img, "tmp/img");
        $output_img = self::$roots["tmp"]["root"] . self::convert_name(self::$req->img, !is_null(self::$req->badge));
        $after = "echo 'done'";

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
            $merge_command = "convert -density 5000 {$badge} {$img} {$mask} -composite {$output_img} && {$after}";
        } else {
            // Wait: this file was already generated!
            // So we just need to copy to another position
            $merge_command = "cp {$img} {$output_img} && {$after}";
        }
        $composite = (trim(shell_exec($merge_command)) == "done") ? true : false;
        if($composite) {
            self::$output = $output_img;
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
    	ob_end_flush ();
    }

	public static function run($request) {
        ob_start();
        self::$req = self::parse_request($request);
        self::$roots = self::get_root_paths();

        if(self::$req->img !== "") {
            self::generate_picol();
        }
	}
}

PICOL_Generator::run($_GET);

?>
