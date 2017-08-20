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
	function IconSize(container) {
		_classCallCheck(this, IconSize);

		this.container = container;
	}

	_createClass(IconSize, [{
		key: "build",
		value: function build() {
			return $("<i>");
		}
	}]);

	return IconSize;
}();

exports.default = IconSize;
