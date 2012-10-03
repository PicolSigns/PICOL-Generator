<?php
#	
#	This program is free software: you can redistribute it and/or modify
#	it under the terms of the GNU General Public License as published by
#	the Free Software Foundation, either version 3 of the License, or
#	(at your option) any later version.
#
#	This program is distributed in the hope that it will be useful,
#	but WITHOUT ANY WARRANTY; without even the implied warranty of
#	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#	GNU General Public License for more details.
#
#	You should have received a copy of the GNU General Public License
#	along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
#
#	- - -
#	Created by Alessandro Gubitosi
#	for the PICOL Project
#	on November 2010
#

if ($_SERVER["REQUEST_URI"] !== "/apps/picol_generator/1.2/"){
	$local_path = "http://www.gotanotherway.com/apps/picol_generator/1.1.6/";
} else {
	$local_path = "";
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="it" dir="ltr">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<title>PICOL generator</title>

		<base href="" />
		<meta name="Author" content="Alessandro Gubitosi" />
		<meta name="Description" content="Create, configure and export your own PICOL incons set." />
		<meta name="Keywords" content="PICOL PIctorial COmmunication Language icon generator svg png" />
		
		<script type="text/javascript" src="common/js/jquery/jquery-ui-1.8.23.custom/js/jquery-1.8.0.min.js"></script>
		<script type="text/javascript" src="common/js/jquery/jquery-ui-1.8.23.custom/js/jquery-ui-1.8.23.custom.min.js"></script>
		<link type="text/css" href="common/js/jquery/jquery-ui-1.8.23.custom/css/smoothness/jquery-ui-1.8.23.custom.css" rel="stylesheet" media="screen" />
		<script type="text/javascript" src="common/js/jquery.scrollTo-min.js"></script>
		<!-- jquery AnythingSlider -->
		<link type="text/css" href="common/css/picol_anythingslider.css" rel="stylesheet" media="screen" />
		<script type="text/javascript" src="common/js/jquery/AnythingSlider/js/jquery.anythingslider.js"></script>
		
		<link rel="stylesheet" href="common/css/main.css" type="text/css" media="screen" />
		<script type="text/javascript">
		$(document).ready(function() {
			$("#loader").fadeOut(900);
			$("#generator_interface").delay(300).fadeIn(900);
		});
		</script>
	</head>
	<body>
		<div id="loader"></div>
		<div id="generator_interface">
			<?php
			require_once("common/tpl/generator_interface.tpl");
			?>
		</div>
		<br />
		<br />
		<!-- Insert here your contents -->
	</body>
</html>