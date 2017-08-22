/* jshint esversion: 6 */

class IconSize {
	/**
	 * Class constructor
	 */
	constructor() {
		this.available_sizes = function() {
			let a = [], i = 8;
			while(i <= 128){
				i += i;
				a.push({
					size: i,
					available: true
				});
			}
			a.push({
				size: "custom",
				available: true
			});
			return a;
		}();
	}

	build() {
		console.log(this.available_sizes);
		let s = 0,
			selected = "",
			img = "",
			img_size = 0;
		return $("<table>").append(
			$("<tr>").append(
				$("<td>").append(
					$("<input>", {"type": "hidden", "id": "selected_size", "name": "selected_size"}).val("32")
				).append(
					$("<input>", {"type": "hidden", "id": "selected_imgs", "name": "selected_imgs"}).val("")
				).append(
					$("<table>", {"id": "size_selector", "class": "stage"}).append(
						$.map(this.available_sizes, (v) => {
							s++;
							if(v.available && typeof v.size == "number"){
								selected = (v.size == 32) ? "selected" : "";
								img_size = (v.size <= 64) ? v.size : parseInt(v.size/1.2);
							} else {
								selected = "no_selectable";
								img = "cancel.png";
								img_size = "";
							}
							console.log(v, selected, img_size);
							return $("<td>", {
								"valign": "middle",
								"onclick": "select_unselect_img('" + v.size + "', true, 'size_selector', 'selected_size', false); setTimeout('$(\'#slider\').data(\'AnythingSlider\').goForward()', 300);",
								"id": "_" + v.size,
								"title": v.size + "px",
								// "valign": "bottom",
								"align": "center",
								"class": selected
							}).append(
								function() {
									console.log(img_size);
									if(img_size !== "") {
										return $("<img>", {
											"src": "../../../api/generator.php?size=" + img_size +  "&colour=000&img=document_page_width&action=show"
										});
									} else {
										return $("<input>", {
											"type": "text"
										});
									}
								}
							).append(
								$("<br />")
							).append(
								v.size + "px"
							);
						})
					)
				)
			)
		);
	}
}

export default IconSize;
