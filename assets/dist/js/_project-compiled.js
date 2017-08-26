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
			return $("<div>", { "class": "stage-container" }).append($("<div>", { "class": "stage" }).append($("<header>").append($("<img>", {
				"class": "logo",
				"src": "http://picol.org/img/header.png"
			})).append($("<div>", { "class": "project-input" }).append(function () {
				return $("<input>", {
					"type": "text",
					"id": "project_name_input",
					"tabindex": "-1",
					"class": "form-control",
					"placeholder": "Project name"
				});
			}))).append($("<div>", { "class": "content" }).append($("<div>", { "class": "row" }).append($("<div>", { "class": "col-lg-6 col-md-5 col-sm-5 col-xs-8 text-left vcenter" }).append($("<h6>").text("Local storage")).append($("<small>", { "class": "help-block" }).html("Use the browser local memory to store your history and settings.<br />Thi is not required "))).append($("<div>", { "class": "col-lg-3 col-md-3 col-sm-3 col-xs-8 text-right vcenter" }).append($("<input>", {
				"type": "checkbox",
				"tabindex": "-1",
				"id": "use_localstorage_btn",
				"checked": "checked"
			})))).append($("<div>", { "class": "spacer-50" })).append($("<div>", { "class": "row" }).append($("<button>", {
				"class": "btn btn-primary",
				"tabindex": "-1",
				"id": "save_settings_btn"
			}).text("Continue")))));
		}
	}]);

	return Project;
}();

exports.default = Project;
