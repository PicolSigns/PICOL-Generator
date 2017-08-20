<?php
if(!defined("SYSTEM_ROOT")) {
    chdir(__DIR__ . "/../../../../");
    require_once("_defines.php");
}
if(isset($_GET["file"]) && trim($_GET["file"]) !== ""){
	require_once(TEMPLATE_DIR . $_GET["file"]);
}
?>
