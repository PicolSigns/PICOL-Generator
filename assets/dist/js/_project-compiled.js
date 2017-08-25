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
			return $("<table>").append($("<tr>").append($("<td>").append($("<table>", { "class": "stage" }).append($("<td>", {
				"valign": "middle",
				// "onclick": "select_unselect_img('" + v.size + "', true, 'size_selector', 'selected_size', false); setTimeout('$(\'#slider\').data(\'AnythingSlider\').goForward()', 300);",
				// "id": "_" + v.size,
				// "title": v.size + "px",
				// "valign": "bottom",
				"align": "center"
				// "class": "selected"
			}).append($("<div>", { "class": "input-group col-lg-3 col-md-3 col-sm-3 col-xs-8" }).append($("<input>", {
				"type": "text",
				"class": "form-control",
				"placeholder": "Project name"
			})))))));
		}
	}]);

	return Project;
}();

exports.default = Project;
