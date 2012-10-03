<table cellpadding="5" cellspacing="5" style="width: 100%; height: 100%;">
	<tr>
		<td>
			<input type="hidden" id="selected_size" name="selected_size" value="32" />
			<input type="hidden" id="selected_imgs" name="selected_imgs" value="" />
			<table cellpadding="5" cellspacing="5" id="size_selector" align="center" style="width: 100%; border: #cfcfcf 1px solid; background-color: #fff;">
				<tr>
					<?php
					$ss = 8;
					while($ss <= 128){
						$ss += $ss;
						$available_sizes[$ss] = true;
					}
					/*
					// Run this if you want generate from PNG
					// Check the available size in the relative directories
					$dir = @opendir($main_directory);
					if (opendir($directory)){
						while ($dirs = readdir($dir)){
							if ($dirs !== "." && $dirs !== ".." && $dirs !== "badges" && $dirs !== "icons" && $dirs !== "_examples"){
								$subdir = @opendir($main_directory . "/" . $dirs);
								while ($dirss = @readdir($subdir)){
									if (!@opendir($main_directory . "/" . $dirs . "/" . $dirss . "/icons")){
										$available_sizes[$dirs] = true;
									} else {
										$available_sizes[$dirs] = false;
									}
								}
							}
						}
					}
					ksort($available_sizes);
					*/
					$s = 0;
					foreach ($available_sizes as $sizes => $available){
						$s++;
						if ($available == true){
							if ($sizes == "32"){
								$selectd = "class=\"selected\"";
							} else {
								$selectd = "";
							}
						} else {
							$selectd = "class=\"no_selectable\"";
							$img = $main_directory . "/cancel.png";
						}
						if ($sizes <= 64){
							$img_sizes = $sizes;
						} else {
							$img_sizes = $sizes/1.2;
						}
						print "<td valign=\"middle\" onclick=\"select_unselect_img('" . $sizes . "', true, 'size_selector', 'selected_size', false); setTimeout('$(\'#slider\').data(\'AnythingSlider\').goForward()', 300);\" id=\"_" . $sizes . "\" title=\"" . $sizes . "px\" valign=\"bottom\" align=\"center\" " . $selectd . "><img src=\"" . $local_path . "common/include/generator.php?size=" . $img_sizes .  "&img=document_page_width.svg&badge=&action=show\" /><br />" . $sizes . "px</td>";
					}
					?>
				</tr>
			</table>
		</td>
	</tr>
</table>