/* jshint esversion: 6 */

var storage = Storages.initNamespaceStorage("ns_name").localStorage;

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
				size: "_",
				available: true
			});
			return a;
		}();
	}

	set_storage() {

	}

	load_project(project) {
		console.log(project);
		if(project.name.trim().length > 0) {
			$(".stage-container").append($("#project_title").html("").append($("<span>", {"class": "grey-text"}).text("Current project: ")).append(project.name));
		}
		$("#project_name_input").val(project.name).removeClass("invalid");
		$(".thumbNav").fadeIn();
		// this.set_storage(project_name);
		$("#slider").anythingSlider(2);
		console.log(project);
	}

	build() {
		// console.log(this.available_sizes);
		var s = 0;
		let selected = "",
			img = "",
			img_size = 256;
		return $("<div>", {"class": "stage-container"}).append(
			$("<div>", {"class": "stage icon_size"}).append(
				$("<input>", {"type": "hidden", "id": "selected_size", "name": "selected_size"}).val("")
			).append(
				$("<input>", {"type": "hidden", "id": "selected_imgs", "name": "selected_imgs"}).val("")
			).append(
				$("<div>", {"class": "content valign center"}).append(
					$("<div>", {
						"class": "card z-depth-0"
					}).append(
						function() {
							// console.log(img_size);
							if(img_size !== "") {
								return $("<img>", {
									"src": "../../../api/generator.php?size=" + img_size +  "&action=show",
									"class": "responsive-img"
								});
							} else {
								return $("<input>", {
									"type": "text"
								});
							}
						}
					).append(
						$("<div>", {"class": "row spacer-30"}).append(
							$("<div>", {"class": "col l4 m8 s10 offset-l4 offset-m2 offset-s1"}).append(
								$("<select>", {
									"tabindex": "-1",
									"class": "text-right browser-default",
									"id": "size_selector"
								}).append(
									$("<option>", {"value": "", "disabled": "disabled", "selected": "selected"}).text("Select size...")
								).append(
									$.map(this.available_sizes, (v) => {
										let option_text = (v.size !== "_") ? v.size + "px" : "Custom...";
										s++;
										return $("<option>", {
											"selected": () => {
												if(v.available && typeof v.size == "number"){
													selected = (v.size == "") ? "selected" : null;
													img_size = (v.size <= 64) ? v.size : parseInt(v.size/1.2);
												} else {
													selected = null;
													img = "cancel.png";
													img_size = "";
												}
												return selected;
											},
											"value": v.size
										}).text(option_text);
									})
								).on("change", function() {
									if(this.value == "_") {
										// console.log($(this));
										// console.log($(this).closest("div"));
										let $input = $("<input>", {
											"type": "number",
											"dir": "rtl",
											"tabindex": "-1",
											"class": "form-control",
											"placeholder": "Icon size ",
											"min": 5,
											"max": 1000
										});
										$(this).closest("div").prepend($input);
										$(this).remove();
										$input.focus();
									} else {
										console.log("ok");
										$("#slider").anythingSlider(3);
									}
								})
							// ).append(
							// 	$("<span>", {"class": "input-group-addon"}).text("px")
							)
						)
					)
				)
			)
		);
	}
}

export default IconSize;
