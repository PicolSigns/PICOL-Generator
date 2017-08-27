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
				$("#project_title").html("").append($("<span>", { "class": "grey-text" }).text("Current project: ")).append(project.name);
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
			return $("<div>", { "class": "stage-container" }).append($("<div>", { "class": "stage icon_size" }).append($("<input>", { "type": "hidden", "id": "selected_size", "name": "selected_size" }).val("")).append($("<input>", { "type": "hidden", "id": "selected_imgs", "name": "selected_imgs" }).val("")).append($("<div>", { "class": "content valign center" }).append($("<div>", {
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
				} else {
					console.log("ok");
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
