<?php
$main_directory = "../../../../common"; // Main directory
$le_immaginine_bad = "";
$directory_bad = $main_directory . "/media/svg/badges"; // directory for preview
$dir_bad = @opendir($directory_bad);
if (opendir($directory_bad)){
	while ($file_bad = readdir($dir_bad)){
		if ($file_bad !== "." && $file_bad !== ".."){
			$immaginine_bad[] = $file_bad;
			$le_immaginine_bad .= str_replace(strrchr($file_bad, "."), "", $file_bad) . ",";
		}
	}
	closedir($dir_bad);
}
sort($immaginine_bad);
?>
<input type="hidden" id="selected_badges" name="selected_badges" value="" />
<div id="badge">
	<table cellpadding="10" cellspacing="10" id="badges_selector" style="width: 100%;">
		<tr>
		<?php
		$badge_count = 0;
		foreach ($immaginine_bad as $bad_img){
			$bad_file_name = str_replace(strrchr($bad_img, "."), "", $bad_img);
			$bad_filename = str_replace("_", " ", $bad_file_name);
			$badge_count++;
			if (($badge_count % 5) == 1){
				print "</tr><tr>";
			}
			print "<td align=\"center\" id=\"_" . $bad_file_name . "\" onclick=\"select_unselect_img('" . $bad_file_name . "', true, 'badges_selector', 'selected_badges', true); if ($('#selected_imgs').val() == ''){ setTimeout('$(\'#slider\').data(\'AnythingSlider\').goBack()', 300); } else { setTimeout('$(\'#slider\').data(\'AnythingSlider\').goForward()', 300); }\" title=\"" . $bad_filename . "\"><img src=\"" . $local_path . "common/include/svg_resizer.php?size=32&type=badges&filename=" . $bad_img . "\" /><br />" . $bad_filename . "</td>";
		}
		?>
		</tr>
	</table>
</div>