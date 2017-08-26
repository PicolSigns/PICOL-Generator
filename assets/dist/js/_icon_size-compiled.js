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
			}).append($("<div>", { "class": "input-group col-lg-3 col-md-3 col-sm-3 col-xs-8" }).append($("<select>", {
				"tabindex": "-1",
				"class": "form-control text-right"
			}).append($("<option>", { "value": "", "disabled": "disabled" }).text("Select size")).append($.map(this.available_sizes, function (v) {
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
			})).append($("<span>", { "class": "input-group-addon" }).text("px")))))));
		}
	}]);

	return IconSize;
}();

exports.default = IconSize;
