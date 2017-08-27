(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
/* jshint esversion: 6 */
"strict mode";

var _generator = require("../../src/js/generator.es6");

var _generator2 = _interopRequireDefault(_generator);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var generator = new _generator2.default();
generator.run();

},{"../../src/js/generator.es6":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* jshint esversion: 6 */

var storage = Storages.initNamespaceStorage("ns_name").localStorage;

var IconSize = function () {
	/**
  * Class constructor
  */
	function IconSize() {
		_classCallCheck(this, IconSize);

		this.available_sizes = function () {
			var a = [],
			    i = 8;
			while (i <= 128) {
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

	_createClass(IconSize, [{
		key: "set_storage",
		value: function set_storage() {}
	}, {
		key: "load_project",
		value: function load_project(project) {
			$("#project_name_input").val(project.name).removeClass("invalid");
			$(".thumbNav").fadeIn();
			// this.set_storage(project_name);
			$("#slider").anythingSlider(2);
			console.log(project);
		}
	}, {
		key: "build",
		value: function build() {
			// console.log(this.available_sizes);
			var s = 0;
			var _selected = "",
			    img = "",
			    img_size = 256;
			return $("<div>", { "class": "stage-container" }).append($("<div>", { "class": "stage icon_size" }).append($("<input>", { "type": "hidden", "id": "selected_size", "name": "selected_size" }).val("32")).append($("<input>", { "type": "hidden", "id": "selected_imgs", "name": "selected_imgs" }).val("")).append($("<div>", { "class": "content valign center" }).append($("<div>", {
				"class": "card z-depth-0"
			}).append(function () {
				// console.log(img_size);
				if (img_size !== "") {
					return $("<img>", {
						"src": "../../../api/generator.php?size=" + img_size + "&action=show",
						"class": "responsive-img"
					});
				} else {
					return $("<input>", {
						"type": "text"
					});
				}
			}).append($("<div>", { "class": "row spacer-30" }).append($("<div>", { "class": "col l4 m4 s4 offset-l4 offset-m4 offset-s4" }).append($("<select>", {
				"tabindex": "-1",
				"class": "text-right browser-default",
				"id": "size_selector"
			}).append($("<option>", { "value": "", "disabled": "disabled" }).text("Select size")).append($.map(this.available_sizes, function (v) {
				var option_text = v.size !== "_" ? v.size + "px" : "Custom...";
				s++;
				return $("<option>", {
					"selected": function selected() {
						if (v.available && typeof v.size == "number") {
							_selected = v.size == 32 ? "selected" : null;
							img_size = v.size <= 64 ? v.size : parseInt(v.size / 1.2);
						} else {
							_selected = null;
							img = "cancel.png";
							img_size = "";
						}
						return _selected;
					},
					"value": v.size
				}).text(option_text);
			})).on("change", function () {
				if (this.value == "_") {
					// console.log($(this));
					// console.log($(this).closest("div"));
					var $input = $("<input>", {
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
				}
			})
			// ).append(
			// 	$("<span>", {"class": "input-group-addon"}).text("px")
			))))));
		}
	}]);

	return IconSize;
}();

exports.default = IconSize;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* jshint esversion: 6 */
/* jshint -W107 */

var _icon_size = require("./_icon_size.es6");

var _icon_size2 = _interopRequireDefault(_icon_size);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var STORAGE, ICON_SIZE;

var Project = function () {
	/**
  * Class constructor
  */
	function Project(storage) {
		_classCallCheck(this, Project);

		STORAGE = storage;
		ICON_SIZE = new _icon_size2.default(storage);
		// console.log(ICON_SIZE.load_project({}));
	}

	// load_project(project) {
	// 	$("#project_name_input").val(project.name).removeClass("invalid");
	// 	$(".thumbNav").fadeIn();
	// 	// this.set_storage(project_name);
	// 	$("#slider").anythingSlider(2);
	// 	this.icon_size.load_project(project);
	// }

	_createClass(Project, [{
		key: "build",
		value: function build() {
			var $card_action = $("<div>", { "class": "card-action" }).append($("<a>", {
				"class": "btn-flat white right",
				"href": "javascript:;",
				"tabindex": "-1",
				"id": "save_settings_btn"
			}).text("Continue")),
			    $new_project = $("<div>").append($("<div>", { "class": "row" }).append($("<div>", { "class": "col l8 m8 s6 offset-l2 offset-m2 offset-s3" }).append($("<div>", { "class": "project-input input-field" }).append($("<input>", {
				"type": "text",
				"id": "project_name_input",
				"class": "validate",
				"data-error": "No empty value",
				"tabindex": "-1",
				"autofocus": "autofocus",
				"placeholder": "Project name"
			}))))).append($("<div>", { "class": "row valign-wrapper" }).append($("<div>", { "class": "col l8 m8 s6" }).append($("<h6>").text("Local storage")).append($("<p>").html("Use the browser local memory to store your history and settings.").append($("<a>", {
				"href": "javascript:;",
				"data-position": "top",
				"data-tooltip": "This is not required but allows you to find your icons once you come back to this page.<br />At the final step you can export the entire project, anyway."
			}).append($("<i>", { "class": "picol_information" })).tooltip({
				html: true,
				delay: 0
			})))).append($("<div>", { "class": "col l4 m4 s6" }).append($("<div>", { "class": "switch right" }).append($("<label>").append("Off").append($("<input>", {
				"type": "checkbox",
				"tabindex": "-1",
				"id": "use_localstorage_btn",
				"checked": "checked"
			})).append($("<span>", { "class": "lever" })).append("On"))))),
			    $old_projects = $("<div>").append($("<h6>").text("Saved projects")).append($("<ul>", { "class": "collection" }).append(function () {
				return $.map(STORAGE, function (v) {
					var cd = new Date(v.project.date),
					    creation_date = cd.getFullYear() + "-" + cd.getMonth() + "-" + cd.getDate() + " " + cd.getHours() + ":" + (cd.getMinutes() < 10 ? "0" + cd.getMinutes() : cd.getMinutes());

					return $("<li>", { "class": "collection-item dismissable" }).append($("<div>").append($("<div>", { "class": "title" }).append(v.project.name)).append($("<span>", { "class": "help-text" }).text("Created on " + creation_date)).append($("<a>", {
						"href": "javascript:;",
						"class": "secondary-content grey-text"
					}).append($("<i>", { "class": "picol_controls_play" })).on("click", function () {
						ICON_SIZE.load_project(v.project);
					})));
				});
			}));

			return $("<div>", { "class": "stage-container" }).append($("<div>", { "class": "stage project" }).append($("<header>", { "class": "center-align" }).append($("<img>", {
				"class": "logo",
				"src": "assets/media/img/picol_logo.png"
			}))).append($("<div>", { "class": "content" }).append($("<div>", { "class": "card z-depth-0" }).append(function () {
				if (STORAGE === undefined) {
					// No storaged data
					return $("<div>", { "class": "card-content" }).append($new_project.append($("<div>", { "class": "spacer-60" })).append($card_action));
				} else {
					// There are storaged data
					// We display a 2 columns layout
					return $("<div>", { "class": "card-content" }).append($("<div>", { "class": "row separated-columns" }).append($("<div>", { "class": "col l6 m6 s6" }).append($old_projects)).append($("<div>", { "class": "col l6 m6 s6" }).append($new_project))).append($card_action);
				}
			}))));
		}
	}]);

	return Project;
}();

exports.default = Project;

},{"./_icon_size.es6":2}],4:[function(require,module,exports){
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
				"title": "CHOOSE ICON SIZE",
				"class": "IconSize",
				"script_file": ""
			}
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
		value: function get_storage() {}
		// console.log(STORAGE);


		/**
   * Set the localStorage for this session
   */

	}, {
		key: "set_storage",
		value: function set_storage(project_name) {
			var b = {},
			    storage_data = {
				project: {
					name: project_name,
					date: new Date(),
					browser: b
				}
			};

			if (STORAGE === undefined) {
				// Collect browser information
				$.each(navigator, function (k, v) {
					b[k] = v;
				});
				// Set the local storage
				storage.set("picol_generator", [storage_data]);
			} else {
				STORAGE.push(storage_data);
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
			$.each(this.sliders, function (item, value) {
				i++;
				_this.pages[i] = item;
				_this.scripts[i] = value.script_file;
				$("#slider").append($("<li>").append($("<fieldset>", { "id": value.id, "class": "selector" }).append($("<legend>").text(value.title)).append(function () {
					// Call single panels classes
					switch (value.class) {
						case "Project":
							return project.build();break;
						case "IconSize":
							return icon_size.build();break;
					}
					// item_class = new value.class();
				})));
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
			// $("#size_selector").material_select();
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
				animationTime: 450,
				easing: "easeOutCubic",
				onInitialized: function onInitialized() {
					// Hide panels menu
					$(".thumbNav").hide();

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
							icon_size.load_project(storage_data.project);
							// $("#project_name_input").removeClass("invalid");
							// $(".thumbNav").fadeIn();
							//
							// this.set_storage(project_name);
							// $("#slider").anythingSlider(2);
						}
					});
				}
				// onSlideComplete: (slider) => {
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
				// }
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

},{"./_icon_size.es6":2,"./_project.es6":3}]},{},[1]);
