/* jshint esversion: 6 */


import Project from "./_project.es6";
import IconSize from "./_icon_size.es6";

var project = new Project(),
	icon_size = new IconSize();

class Generator {
	/**
	 * Class constructor
	 */
	constructor() {
		this.pages = {};
		this.scripts = {};
		this.sliders = {
			"Project": {
				"id": "project_selector",
				"title": "PROJECT",
				"class": "Project",
				"script_file": ""
			},
			"Size": {
				"id": "icon_size_selector",
				"title": "CHOOSE ICON SIZE",
				"class": "IconSize",
				"script_file": ""
			},
			// "Color": {
			// 	"id": "color",
			// 	"title": "COLOUR",
			// 	"main_file": "colorpicker.tpl",
			// 	"script_file": ""
			// },
			// "Icons": {
			// 	"id": "icons",
			// 	"title": "ICONS",
			// 	"main_file": "icons.tpl",
			// 	"script_file": "icons.js"
			// },
			// "Badges": {
			// 	"id": "badges",
			// 	"title": "BADGES",
			// 	"main_file": "badge.tpl",
			// 	"script_file": ""
			// },
			// "Single download": {
			// 	"id": "single_file",
			// 	"title": "DOWNLOAD SINGLE FILE",
			// 	"main_file": "download_single.tpl",
			// 	"script_file": ""
			// },
			// "Multiple download": {
			// 	"id": "multiple_file",
			// 	"title": "DOWNLOAD PACKED FILES",
			// 	"main_file": "download_multiple.tpl",
			// 	"script_file": "download_multiple.js"
			// }
		};
		this.checkall = true;
		this.j = 0;
	}

	array_unique(a) { let r = []; o: for(let i = 0, n = a.length; i < n; i++) { for(let x = 0, y = r.length; x < y; x++) { if(r[x] == a[i]) continue o; } r[r.length] = a[i]; } return r; }

	build_sliders() {
		let i = 0;
		$.each(this.sliders, (item, value) => {
			i++;
			this.pages[i] = item;
			this.scripts[i] = value.script_file;
			$("#slider").append(
				$("<li>").append(
					$("<fieldset>", {"id": value.id, "class": "selector"}).append(
						$("<legend>").text(value.title)
					).append(
						function() {
							switch(value.class) {
								case "Project"	: 	return project.build();			break;
								case "IconSize"	: 	return icon_size.build();		break;
							}
							// item_class = new value.class();
						}
					)
				)
			);
			// $.ajax({
			// 	url: "common/include/funcs/_ajax/executor.php",
			// 	data: {
			// 		file: value.main_file
			// 	},
			// 	dataType: "text",
			// 	success: (data) => {
			// 		$("#" + value.id).append($(data));
			// 	}
			// });
			// $("#" + value.id).append(project.build());
			// $("#" + value.id).append(icon_size.build());
		});
		$("#slider").anythingSlider({
			navigationFormatter: (i) => { // add thumbnails as navigation links
				return this.pages[i];
			},
			autoPlay: false,
			startPanel: 1,
			buildArrows: false,
			buildStartStop: false,
			expand: true,
			hashTags: false,
			resizeContents: true,
			infinteSlides: false,
			animationTime: 450,
			easing: "easeOutCubic",
			onSlideComplete: (slider) => {
				// if(slider.currentPage > 3 && $("#selected_imgs").val() === ""){
				// 	if(slider.currentPage < 7 || $("#history").html() === ""){
				// 		$("#slider").anythingSlider(3);
				// 	}
				// }
				// if(slider.currentPage == 6){
				// 	this.refresh_history();
				// }
				// if(slider.currentPage !== 3){
				// 	$(document).unbind("keydown");
				// } else {
				// 	$("#filter").focus();
				// }
				// if(this.scripts[slider.currentPage] !== "" && this.scripts[slider.currentPage] !== undefined){
				// 	$.get("common/js/include/" + this.scripts[slider.currentPage], () => {}, "script");
				// }
			},
			onSlideBegin: (slider) => {
				// if(slider.currentPage !== 3 && $("#selected_imgs").val() === ""){
				// 	$("#generator_interface .forward > a").animate({"backgroundPosition": "-188px -40px"}, 1000);
				// } else {
				// 	$("#generator_interface .forward > a").animate({"backgroundPosition": "0 -40px"}, 1000);
				// }
				// if(slider.currentPage !== 6){
				// 	this.refresh_history();
				// }
			}
		});
	}

	select_unselect_img(file_name, single, selector, selected_input, allow_removing) {
		if(allow_removing === undefined){
			allow_removing = true;
		}
		if(!single){
			let sid = $("#" + selected_input).val(),
				selected_imgs = $("#" + selected_input).val(),
				filename = "";

			if(file_name !== ""){
				if($("#_" + file_name).hasClass("selected")){
					if(selected_imgs.split(",") === 0){
						filename = file_name;
					} else {
						filename = file_name + ",";
					}
					$("#_" + file_name).removeClass("selected");
					selected_imgs = selected_imgs.replace(filename, "");

					$("#" + selected_input).val(selected_imgs);
					if(sid == ""){
						$("#selected_badges").val("");
						$("#slider").find("#generated").html("<tr><td class=\"nothing\"></td></tr>");
						this.get_images();
					}
				} else {
					filename = file_name + ",";

					$("#_" + file_name).addClass("selected");
					selected_imgs += filename;
					$("#" + selected_input).val(selected_imgs);
				}
			} else {
				$("#slider").find("#generated").html("<tr><td class=\"nothing\"></td></tr>");
				$("#operation_txt").html("");
			}
		} else {
			let filename = file_name.replace(".svg", "");
			if(filename == $("#" + selected_input).val()){
				if(allow_removing == true){
					$("#" + selector + " td").removeClass("selected");
					$("#" + selected_input).val("");
				}
			} else {
				$("#" + selector + " td").removeClass("selected");
				$("#_" + filename).addClass("selected");
				$("#" + selected_input).val(filename);
			}
		}
		this.get_images();
	}

	get_images() {
		let display = 0,
			color = $("#output").val().replace("#", ""),
			results_content = "<tr><td class=\"nothing\"></td></tr>",
			selected_imgs = $("#selected_imgs").val(),
			badge = $("#selected_badges").val(),
			size = $("#selected_size").val(),
			new_dir = $("#new_dir").val();

		$("#loader").css({cursor: "wait"});
		size = parseInt(size);
		switch(size){
			case 16: display = 15; break;
			case 32: display = 10; break;
			case 64: display = 6; break;
			case 128: display = 3; break;
			case 256: display = 2; break;
		}
		display = parseInt(display);
		if(badge.length > 0){
			badge += ".svg";
		}
		$("#loader").fadeTo(0, 0, () => {
			if(selected_imgs.length > 0){
				let selected = selected_imgs.split(",");
				selected.pop();
				selected.sort();
				results_content = "<tr>";
				for(let i = 0; i < selected.length; i++){
					if(selected[i].length > 0){
						if((i % display) == 0){
							results_content += "</tr><tr>";
						}
						var random = Math.random()*11;
						results_content += "<td align=\"center\" title=\"Click to download image\" onclick=\"location.href='common/include/generator.php?size=" + size + "&colour=" + color + "&img=" + selected[i] + "&badge=" + badge + "'\"><img src=\"common/include/generator.php?size=" + size + "&colour=" + color + "&img=" + selected[i] + "&badge=" + badge + "&new_dir=" + new_dir + "&action=show&rand=" + random + "\" /></td>";
					}
				}
			}
			results_content += "</tr>";
			results_content = results_content.replace("<tr></tr>", "");
			$("#slider").find("#generated").html(results_content);
			$("#generated div").delay(300).fadeIn(150);
			// $.get("common/include/ajax_read_history.php", {"dir": new_dir},
			// function(data){
			// 	$("#slider").find("#history").html(data);
			// });
		});
		$("#loader").fadeOut();
		$("#loader").css({cursor: "default !important"});
	}

	refresh_history() {
		let files = [],
			f = -1,
			new_dir = $("#new_dir").val();

		$.get("common/include/ajax_read_history.php", {dir: new_dir}, (data) => {
			$("#slider").find("#history").html(data);
			if($("#slider").find("#history").html() !== ""){
				$("#slider").find("#history_content").css({"backgroundImage": "none"});
				$("#slider").find("#download_btn").fadeIn();
			} else {
				$("#slider").find("#download_btn").fadeOut();
			}
			if(this.checkall){
				$("#slider").find("#history input").attr("checked", true);
			} else {
				$("#slider").find("#history input").attr("checked", false);
			}
			jQuery.each($("#slider").find("#history input"), function(){
				f++;
				files[f] = $(this).attr("name");
			});
			files = this.array_unique(files);
			$("#slider").find("#blacklist").val(files);
		});
	}

	run() {
		this.build_sliders();

		$(document).ready(() => {
			$.get("common/include/funcs/_ajax/generator_interface.php", (data) => {
				let img_count = 0,
					icon_data,
					icon,
					file_name = "",
					filename = "",
					table = "",
					icons = [];

				$("#new_dir").val(data.new_dir);
				$("#images").val(data.images);

				$.each(data.images, (item, data) => {
					img_count++;
					icon_data = data.split(".");
					icon = icon_data[0];
					file_name = icon;
					filename = icon.replace(/_/g, " ");
					icons.push(filename);

					if ((img_count % 4) == 1){
						table += "</tr><tr>";
					}
					// Display icons generated on the fly from svg
					table += "<td align=\"center\" onclick=\"select_unselect_img('" + file_name + "', false, 'icon_selector', 'selected_imgs', true);\" class=\"" + img_count + "\" id=\"_" + file_name + "\" title=\"" + filename + "\"><img src=\"common/include/svg_resizer.php?f=" +item+ "\" /><br />" + filename + "</td>";
				});
				$("#icon_selector").append(table);
			}, "json");

			$("#loader").fadeOut(900);
			$("#generator_interface").delay(300).fadeIn(900);
		});
	}
}

export default Generator;
