"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* jshint esversion: 6 */
/* jshint -W027 */

var _project = require("./_project.es6");

var _project2 = _interopRequireDefault(_project);

var _icon_size = require("./_icon_size.es6");

var _icon_size2 = _interopRequireDefault(_icon_size);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var
/**
 * Load all storaged data as variable
 * @return object 															The storaged data
 */
storage = Storages.initNamespaceStorage("ns_name").localStorage,
    STORAGE = storage.get("picol_generator") !== undefined ? storage.get("picol_generator") : undefined,

// Load classes
project = new _project2.default(STORAGE),
    icon_size = new _icon_size2.default(STORAGE);

var Generator = function () {
	/**
  * Class constructor
  */
	function Generator() {
		_classCallCheck(this, Generator);

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
				"title": "ICON SIZE",
				"class": "IconSize",
				"script_file": ""
			},
			"Colour": {
				"id": "colour",
				"title": "COLOUR",
				"class": "Colour",
				"script_file": ""
			}
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

	_createClass(Generator, [{
		key: "array_unique",
		value: function array_unique(a) {
			var r = [];o: for (var i = 0, n = a.length; i < n; i++) {
				for (var x = 0, y = r.length; x < y; x++) {
					if (r[x] == a[i]) continue o;
				}r[r.length] = a[i];
			}return r;
		}

		/* ---------------------------------------------------------------------- */

	}, {
		key: "get_storage",
		value: function get_storage() {
			// console.log(STORAGE);
		}
	}, {
		key: "get_base_data",
		value: function get_base_data(project_name) {
			var b = {},
			    storage_data = {
				project: {
					name: project_name,
					date: new Date(),
					// Collect browser information
					browser: function () {
						$.each(navigator, function (k, v) {
							b[k] = v;
						});
						return b;
					}()
				}
			};
			return storage_data;
		}

		/**
   * Set the localStorage for this session
   */

	}, {
		key: "set_storage",
		value: function set_storage(project_name) {
			if (STORAGE === undefined) {
				// Set the local storage
				storage.set("picol_generator", [this.get_base_data(project_name)]);
			} else {
				STORAGE.push(this.get_base_data(project_name));
				storage.set("picol_generator", STORAGE);
			}
		}

		/**
   * Build the sliders DOM object
   */

	}, {
		key: "build_sliders",
		value: function build_sliders() {
			var _this = this;

			var i = 0;

			// Prepare local store data
			$("body").prepend($("<span>", { "class": "hide", "id": "selected_badge" })).prepend($("<span>", { "class": "hide", "id": "selected_icons" })).prepend($("<span>", { "class": "hide", "id": "selected_colour" })).prepend($("<span>", { "class": "", "id": "selected_size" }));

			$.each(this.sliders, function (item, value) {
				i++;
				_this.pages[i] = item;
				_this.scripts[i] = value.script_file;

				// Prepare slider
				$("#slider").append($("<li>").append($("<fieldset>", { "id": value.id, "class": "selector" }).append($("<legend>").text(value.title)).append($("<div>", { "class": "stage-container" }).append(function () {
					// Call single panels classes
					switch (value.class) {
						case "Project":
							return project.build();break;
						case "IconSize":
							return icon_size.build();break;
					}
					// item_class = new value.class();
				}))));
			});

			$("#slider").anythingSlider({
				navigationFormatter: function navigationFormatter(i) {
					// add thumbnails as navigation links
					return _this.pages[i];
				},
				autoPlay: false,
				startPanel: 1,
				buildArrows: false,
				buildStartStop: false,
				expand: true,
				hashTags: false,
				resizeContents: true,
				infinteSlides: false,
				enableKeyboard: true,
				animationTime: 450,
				easing: "easeOutCubic",
				onInitialized: function onInitialized() {
					// Hide panels menu
					$(".thumbNav").hide();
					if ($("#project_title").length === 0) {
						$("<div>", { "id": "project_title" }).insertAfter(".anythingControls");
					}

					$("#save_settings_btn").on("click", function () {
						var project_name = $("#project_name_input").val().trim(),
						    use_local_storage = $("#use_localstorage_btn").is(":checked");

						// Lock position if:
						// * use_local_storage = true
						// * project_name is empty
						if (use_local_storage && project_name.length === 0) {
							$("#project_name_input").addClass("invalid").focus();
							$(".thumbNav").fadeOut();
						} else {
							// Save data to local storage
							if (use_local_storage) {
								_this.set_storage(project_name);
							}
							// Load the next slide
							icon_size.load_project(_this.get_base_data(project_name).project);
						}
					});
				},
				onSlideComplete: function onSlideComplete(slider) {
					var selected_size = $("#selected_size").text();
					console.log(parseInt(selected_size));
					if (slider.currentPage > 2 && (selected_size.trim().length === 0 || parseInt(selected_size) <= 0)) {
						$("#slider").anythingSlider(2);
					}

					// 	// if(slider.currentPage > 3 && $("#selected_imgs").val() === ""){
					// 	// 	if(slider.currentPage < 7 || $("#history").html() === ""){
					// 	// 		$("#slider").anythingSlider(3);
					// 	// 	}
					// 	// }
					// 	// if(slider.currentPage == 6){
					// 	// 	this.refresh_history();
					// 	// }
					// 	// if(slider.currentPage !== 3){
					// 	// 	$(document).unbind("keydown");
					// 	// } else {
					// 	// 	$("#filter").focus();
					// 	// }
					// 	// if(this.scripts[slider.currentPage] !== "" && this.scripts[slider.currentPage] !== undefined){
					// 	// 	$.get("common/js/include/" + this.scripts[slider.currentPage], () => {}, "script");
					// 	// }
					// },
					// onSlideBegin: (slider) => {
					// 	// if(slider.currentPage !== 3 && $("#selected_imgs").val() === ""){
					// 	// 	$("#generator_interface .forward > a").animate({"backgroundPosition": "-188px -40px"}, 1000);
					// 	// } else {
					// 	// 	$("#generator_interface .forward > a").animate({"backgroundPosition": "0 -40px"}, 1000);
					// 	// }
					// 	// if(slider.currentPage !== 6){
					// 	// 	this.refresh_history();
					// 	// }
				}
			});
			$(document).keydown(function (e) {
				if (e.keyCode == 9) {
					//tab pressed
					e.preventDefault(); // stops its action
				}
			});
		}
	}, {
		key: "select_unselect_img",
		value: function select_unselect_img(file_name, single, selector, selected_input, allow_removing) {
			if (allow_removing === undefined) {
				allow_removing = true;
			}
			if (!single) {
				var sid = $("#" + selected_input).val(),
				    selected_imgs = $("#" + selected_input).val(),
				    filename = "";

				if (file_name !== "") {
					if ($("#_" + file_name).hasClass("selected")) {
						if (selected_imgs.split(",") === 0) {
							filename = file_name;
						} else {
							filename = file_name + ",";
						}
						$("#_" + file_name).removeClass("selected");
						selected_imgs = selected_imgs.replace(filename, "");

						$("#" + selected_input).val(selected_imgs);
						if (sid == "") {
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
				var _filename = file_name.replace(".svg", "");
				if (_filename == $("#" + selected_input).val()) {
					if (allow_removing == true) {
						$("#" + selector + " td").removeClass("selected");
						$("#" + selected_input).val("");
					}
				} else {
					$("#" + selector + " td").removeClass("selected");
					$("#_" + _filename).addClass("selected");
					$("#" + selected_input).val(_filename);
				}
			}
			this.get_images();
		}
	}, {
		key: "get_images",
		value: function get_images() {
			var display = 0,
			    color = $("#output").val().replace("#", ""),
			    results_content = "<tr><td class=\"nothing\"></td></tr>",
			    selected_imgs = $("#selected_imgs").val(),
			    badge = $("#selected_badges").val(),
			    size = $("#selected_size").val(),
			    new_dir = $("#new_dir").val();

			$("#loader").css({ cursor: "wait" });
			size = parseInt(size);
			switch (size) {
				case 16:
					display = 15;break;
				case 32:
					display = 10;break;
				case 64:
					display = 6;break;
				case 128:
					display = 3;break;
				case 256:
					display = 2;break;
			}
			display = parseInt(display);
			if (badge.length > 0) {
				badge += ".svg";
			}
			$("#loader").fadeTo(0, 0, function () {
				if (selected_imgs.length > 0) {
					var selected = selected_imgs.split(",");
					selected.pop();
					selected.sort();
					results_content = "<tr>";
					for (var i = 0; i < selected.length; i++) {
						if (selected[i].length > 0) {
							if (i % display == 0) {
								results_content += "</tr><tr>";
							}
							var random = Math.random() * 11;
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
			$("#loader").css({ cursor: "default !important" });
		}
	}, {
		key: "refresh_history",
		value: function refresh_history() {
			var _this2 = this;

			var files = [],
			    f = -1,
			    new_dir = $("#new_dir").val();

			$.get("common/include/ajax_read_history.php", { dir: new_dir }, function (data) {
				$("#slider").find("#history").html(data);
				if ($("#slider").find("#history").html() !== "") {
					$("#slider").find("#history_content").css({ "backgroundImage": "none" });
					$("#slider").find("#download_btn").fadeIn();
				} else {
					$("#slider").find("#download_btn").fadeOut();
				}
				if (_this2.checkall) {
					$("#slider").find("#history input").attr("checked", true);
				} else {
					$("#slider").find("#history input").attr("checked", false);
				}
				jQuery.each($("#slider").find("#history input"), function () {
					f++;
					files[f] = $(this).attr("name");
				});
				files = _this2.array_unique(files);
				$("#slider").find("#blacklist").val(files);
			});
		}
	}, {
		key: "run",
		value: function run() {
			this.build_sliders();

			$(document).ready(function () {
				$.get("common/include/funcs/_ajax/generator_interface.php", function (data) {
					var img_count = 0,
					    icon_data = void 0,
					    icon = void 0,
					    file_name = "",
					    filename = "",
					    table = "",
					    icons = [];

					$("#new_dir").val(data.new_dir);
					$("#images").val(data.images);

					$.each(data.images, function (item, data) {
						img_count++;
						icon_data = data.split(".");
						icon = icon_data[0];
						file_name = icon;
						filename = icon.replace(/_/g, " ");
						icons.push(filename);

						if (img_count % 4 == 1) {
							table += "</tr><tr>";
						}
						// Display icons generated on the fly from svg
						table += "<td align=\"center\" onclick=\"select_unselect_img('" + file_name + "', false, 'icon_selector', 'selected_imgs', true);\" class=\"" + img_count + "\" id=\"_" + file_name + "\" title=\"" + filename + "\"><img src=\"common/include/svg_resizer.php?f=" + item + "\" /><br />" + filename + "</td>";
					});
					$("#icon_selector").append(table);
				}, "json");

				$("#loader").fadeOut(900);
				$("#generator_interface").delay(300).fadeIn(900);
			});
		}
	}]);

	return Generator;
}();

exports.default = Generator;
