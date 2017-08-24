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
		key: "build",
		value: function build() {
			// console.log(this.available_sizes);
			var s = 0;
			var _selected = "",
			    img = "",
			    img_size = 256;
			return $("<table>").append($("<tr>").append($("<td>").append($("<input>", { "type": "hidden", "id": "selected_size", "name": "selected_size" }).val("32")).append($("<input>", { "type": "hidden", "id": "selected_imgs", "name": "selected_imgs" }).val("")).append($("<table>", { "id": "size_selector", "class": "stage" }).append($("<td>", {
				"valign": "middle",
				// "onclick": "select_unselect_img('" + v.size + "', true, 'size_selector', 'selected_size', false); setTimeout('$(\'#slider\').data(\'AnythingSlider\').goForward()', 300);",
				// "id": "_" + v.size,
				// "title": v.size + "px",
				// "valign": "bottom",
				"align": "center",
				"class": _selected
			}).append(function () {
				// console.log(img_size);
				if (img_size !== "") {
					return $("<img>", {
						"src": "../../../api/generator.php?size=" + img_size + "&action=show",
						"class": "img-responsive"
					});
				} else {
					return $("<input>", {
						"type": "text"
					});
				}
			}).append($("<div>", { "class": "input-group col-lg-3 col-md-3 col-sm-3 col-xs-8" }).append($("<select>", { "class": "form-control text-right" }).append($("<option>", { "value": "", "disabled": "disabled" }).text("Select size")).append($.map(this.available_sizes, function (v) {
				var option_text = v.size !== "_" ? v.size : "Custom...";
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
					console.log($(this));
					console.log($(this).closest("div"));
					var $input = $("<input>", {
						"type": "number",
						"dir": "rtl",
						"class": "form-control",
						"placeholder": "Icon size ",
						"min": 5,
						"max": 1000
					});
					$(this).closest("div").prepend($input);
					$(this).remove();
					$input.focus();
				}
			})).append($("<span>", { "class": "input-group-addon" }).text("px")))))));
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* jshint esversion: 6 */

var Project = function () {
	/**
  * Class constructor
  */
	function Project() {
		_classCallCheck(this, Project);
	}

	_createClass(Project, [{
		key: "build",
		value: function build() {
			console.log("ok");
			return $("<table>").append($("<tr>").append($("<td>").append($("<table>", { "id": "project_selector", "class": "stage" }).append($("<td>", {
				// "valign": "middle",
				// "onclick": "select_unselect_img('" + v.size + "', true, 'size_selector', 'selected_size', false); setTimeout('$(\'#slider\').data(\'AnythingSlider\').goForward()', 300);",
				// "id": "_" + v.size,
				// "title": v.size + "px",
				// "valign": "bottom",
				// "align": "center",
				// "class": "selected"
			}).append()))));
		}
	}]);

	return Project;
}();

exports.default = Project;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* jshint esversion: 6 */

var _project = require("./_project.es6");

var _project2 = _interopRequireDefault(_project);

var _icon_size = require("./_icon_size.es6");

var _icon_size2 = _interopRequireDefault(_icon_size);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var project = new _project2.default(),
    icon_size = new _icon_size2.default();

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
				"id": "project",
				"title": "PROJECT NAME",
				"main_file": "",
				"script_file": ""
			},
			"Size": {
				"id": "icon_size",
				"title": "CHOOSE ICON SIZE",
				// "main_file": "icon_size.tpl",
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
	}, {
		key: "build_sliders",
		value: function build_sliders() {
			var _this = this;

			var i = 0;
			$.each(this.sliders, function (item, value) {
				i++;
				_this.pages[i] = item;
				_this.scripts[i] = value.script_file;
				$("#slider").append($("<li>").append($("<fieldset>", { "id": value.id, "class": "selector" }).append($("<legend>").text(value.title))));
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
				$("#" + value.id).append(project.build());
				$("#" + value.id).append(icon_size.build());
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
				animationTime: 450,
				easing: "easeOutCubic",
				onSlideComplete: function onSlideComplete(slider) {
					if (slider.currentPage > 3 && $("#selected_imgs").val() === "") {
						if (slider.currentPage < 7 || $("#history").html() === "") {
							$("#slider").anythingSlider(3);
						}
					}
					if (slider.currentPage == 6) {
						_this.refresh_history();
					}
					if (slider.currentPage !== 3) {
						$(document).unbind("keydown");
					} else {
						$("#filter").focus();
					}
					if (_this.scripts[slider.currentPage] !== "" && _this.scripts[slider.currentPage] !== undefined) {
						$.get("common/js/include/" + _this.scripts[slider.currentPage], function () {}, "script");
					}
				},
				onSlideBegin: function onSlideBegin(slider) {
					if (slider.currentPage !== 3 && $("#selected_imgs").val() === "") {
						$("#generator_interface .forward > a").animate({ "backgroundPosition": "-188px -40px" }, 1000);
					} else {
						$("#generator_interface .forward > a").animate({ "backgroundPosition": "0 -40px" }, 1000);
					}
					if (slider.currentPage !== 6) {
						_this.refresh_history();
					}
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

},{"./_icon_size.es6":2,"./_project.es6":3}]},{},[1]);
