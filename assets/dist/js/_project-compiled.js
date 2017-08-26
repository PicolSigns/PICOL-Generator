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
			return $("<div>", { "class": "stage-container" }).append($("<div>", { "class": "stage project" }).append($("<header>", { "class": "center-align" }).append($("<img>", {
				"class": "logo",
				"src": "assets/media/img/picol_logo.png"
			})).append($("<div>", { "class": "project-input" }).append(function () {
				return $("<input>", {
					"type": "text",
					"id": "project_name_input",
					"tabindex": "-1",
					"autofocus": "autofocus",
					"placeholder": "Project name"
				});
			}))).append($("<div>", { "class": "content" }).append($("<div>", { "class": "card z-depth-0" }).append($("<div>", { "class": "card-content" }).append($("<div>", { "class": "col l8 m8 s6" }).append($("<h6>").text("Local storage")).append($("<p>").html("Use the browser local memory to store your history and settings.<br />Thi is not required "))).append($("<div>", { "class": "row" }).append($("<div>", { "class": "col l4 m4 s6" }).append($("<div>", { "class": "switch right" }).append($("<label>").append("Off").append($("<input>", {
				"type": "checkbox",
				"tabindex": "-1",
				"id": "use_localstorage_btn",
				"checked": "checked"
			})).append($("<span>", { "class": "lever" })).append("On"))))).append($("<div>", { "class": "spacer-60" })).append($("<div>", { "class": "card-action" }).append($("<a>", {
				"class": "btn-flat white right",
				"href": "javascript:;",
				"tabindex": "-1",
				"id": "save_settings_btn"
			}).text("Continue")))))));
		}
	}]);

	return Project;
}();

exports.default = Project;
