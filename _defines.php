<?php
/**
 * HOST
 */
if(!defined("DEV")) { define("DEV", ($_SERVER["HTTP_HOST"] == "iod.local") ? true : false); }
if(!defined("HOST")) { define("HOST", (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] && $_SERVER["HTTPS"] != "off") ? "https" : "http" . "://" . ((!isset($_SERVER["SERVER_NAME"])) ? php_uname("n") : $_SERVER["SERVER_NAME"]) . "/"); }

/**
 * Root
 */
// chdir(__DIR__ . "/../../");
if(!defined("SYSTEM_ROOT")) { define("SYSTEM_ROOT", getcwd() . "/"); }
if(!defined("SYSTEM_ROOT_URI")) { define("SYSTEM_ROOT_URI", $_SERVER["REQUEST_SCHEME"] . "://" . $_SERVER["SERVER_NAME"] . "/"); }

/**
 * root:assets/
 */
if(!defined("ASSETS_DIR")) { define("ASSETS_DIR", SYSTEM_ROOT . "assets/"); }
if(!defined("ASSETS_URI")) { define("ASSETS_URI", SYSTEM_ROOT_URI . "assets/"); }
    /**
     * assets:bower_components/
     */
    if(!defined("BOWER_DIR")) { define("BOWER_DIR", ASSETS_DIR . "bower_components/"); }
    if(!defined("BOWER_URI")) { define("BOWER_URI", ASSETS_URI . "bower_components/"); }
    /**
     * assets:dist/
     */
    if(!defined("DIST_DIR")) { define("DIST_DIR", ASSETS_DIR . "dist/"); }
    if(!defined("DIST_URI")) { define("DIST_URI", ASSETS_URI . "dist/"); }
        /**
         * assets:dist/
         */
        if(!defined("CSS_DIR")) { define("CSS_DIR", DIST_DIR . "css/"); }
        if(!defined("CSS_URI")) { define("CSS_URI", DIST_URI . "css/"); }
        /**
         * assets:dist/
         */
        if(!defined("JS_DIR")) { define("JS_DIR", DIST_DIR . "js/"); }
        if(!defined("JS_URI")) { define("JS_URI", DIST_URI . "js/"); }
    /**
     * assets:src/
     */
    if(!defined("SRC_DIR")) { define("SRC_DIR", ASSETS_DIR . "src/"); }
    if(!defined("SRC_URI")) { define("SRC_URI", ASSETS_URI . "src/"); }
    /**
     * assets:media/
     */
    if(!defined("MEDIA_DIR")) { define("MEDIA_DIR", ASSETS_DIR . "media/"); }
    if(!defined("MEDIA_URI")) { define("MEDIA_URI", ASSETS_URI . "media/"); }
        /**
         * assets:media/img/
         */
        if(!defined("FONTS_DIR")) { define("FONTS_DIR", MEDIA_DIR . "fonts/"); }
        if(!defined("FONTS_URI")) { define("FONTS_URI", MEDIA_URI . "fonts/"); }
        /**
         * assets:media/img/
         */
        if(!defined("IMAGES_DIR")) { define("IMAGES_DIR", MEDIA_DIR . "img/"); }
        if(!defined("IMAGES_URI")) { define("IMAGES_URI", MEDIA_URI . "img/"); }
        /**
        * assets:media/svg/
        */
        if(!defined("SVG_DIR")) { define("SVG_DIR", MEDIA_DIR . "svg/"); }
        if(!defined("SVG_URI")) { define("SVG_URI", MEDIA_URI . "svg/"); }
/**
* root:common/
*/
if(!defined("COMMON_DIR")) { define("COMMON_DIR", SYSTEM_ROOT . "common/"); }
if(!defined("COMMON_URI")) { define("COMMON_URI", SYSTEM_ROOT_URI . "common/"); }
    /**
    * common:include/
    */
    if(!defined("INCLUDE_DIR")) { define("INCLUDE_DIR", COMMON_DIR . "include/"); }
    if(!defined("INCLUDE_URI")) { define("INCLUDE_URI", COMMON_URI . "include/"); }
    /**
    * common:tpl/
    */
    if(!defined("TEMPLATE_DIR")) { define("TEMPLATE_DIR", COMMON_DIR . "tpl/"); }
    if(!defined("TEMPLATE_URI")) { define("TEMPLATE_URI", COMMON_URI . "tpl/"); }

/**
 * The main domain
 */
$domain = (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] && $_SERVER["HTTPS"] != "off") ? "https" : "http" . "://" . $_SERVER["SERVER_NAME"];

/**
 * A simple bool variable to determine logged users status.
 * Peace of mind :)
 * @var bool                    $logged                 The current user is logged in?
 */
$logged = false;


?>
