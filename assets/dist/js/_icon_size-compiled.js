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
			console.log(project);
			if (project.name.trim().length > 0) {
				if ($("#project_title").length === 0) {
					$(".stage-container").append($("#project_title").append($("<span>", { "class": "grey-text" }).text("Current project: ")).append(project.name));
				} else {
					$("#project_title").html("").append($("<span>", { "class": "grey-text" }).text("Current project: ")).append(project.name);
				}
			}
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
			return $("<div>", { "class": "stage-container" }).append($("<div>", { "class": "stage icon_size" }).append($("<div>", { "class": "content valign center" }).append($("<div>", {
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
			}).append($("<div>", { "class": "row spacer-30" }).append($("<div>", { "class": "col l4 m8 s10 offset-l4 offset-m2 offset-s1" }).append($("<select>", {
				"tabindex": "-1",
				"class": "text-right browser-default",
				"id": "size_selector"
			}).append($("<option>", { "value": "", "disabled": "disabled", "selected": "selected" }).text("Select size...")).append($.map(this.available_sizes, function (v) {
				var option_text = v.size !== "_" ? v.size + "px" : "Custom...";
				s++;
				return $("<option>", {
					"selected": function selected() {
						if (v.available && typeof v.size == "number") {
							_selected = v.size == "" ? "selected" : null;
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
					var $input = $("<input>", {
						"type": "number",
						// "dir": "rtl",
						"tabindex": "-1",
						"id": "size_input_selector",
						"placeholder": "Icon size ",
						"min": 5,
						"max": 1000
					}).on("keydown", function (e) {
						if (e.keycode == 13 || e.which == 13) {
							$("#selected_size").text($input.val());
							$("#slider").anythingSlider(3);
						}
					});

					$("#selected_size").text("");
					$(this).closest("div").prepend($input);
					$(this).remove();
					$input.focus();
				} else {
					$("#selected_size").text(this.value);
					$("#slider").anythingSlider(3);
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
