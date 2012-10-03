<?php
if(isset($_GET["file"]) && trim($_GET["file"]) !== ""){
	require_once("../../../tpl/" . $_GET["file"]);
}
?>