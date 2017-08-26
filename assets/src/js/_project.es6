/* jshint esversion: 6 */

class Project {
	/**
	 * Class constructor
	 */
	constructor() {
	}

	build() {
		return $("<div>", {"class": "stage-container"}).append(
			$("<div>", {"class": "stage"}).append(
				$("<header>").append(
					$("<img>", {
						"class": "logo",
						"src": "http://picol.org/img/header.png"
					})
				).append(
					$("<div>", {"class": "project-input"}).append(
						function() {
							return $("<input>", {
								"type": "text",
								"id": "project_name_input",
								"tabindex": "-1",
								"class": "form-control",
								"placeholder": "Project name"
							});
						}
					)
				)
			).append(
				$("<div>", {"class": "content"}).append(
					$("<div>", {"class": "row"}).append(
						$("<div>", {"class": "col-lg-6 col-md-5 col-sm-5 col-xs-8 text-left vcenter"}).append(
							$("<h6>").text("Local storage")
						).append(
							$("<small>", {"class": "help-block"}).html("Use the browser local memory to store your history and settings.<br />Thi is not required ")
						)
					).append(
						$("<div>", {"class": "col-lg-3 col-md-3 col-sm-3 col-xs-8 text-right vcenter"}).append(
							$("<input>", {
								"type": "checkbox",
								"tabindex": "-1",
								"id": "use_localstorage_btn",
								"checked": "checked"
							})
						)
					)
				).append(
					$("<div>", {"class": "spacer-50"})
				).append(
					$("<div>", {"class": "row"}).append(
						$("<button>", {
							"class": "btn btn-primary",
							"tabindex": "-1",
							"id": "save_settings_btn"
						}).text("Continue")
					)
				)
			)
		);
	}
}

export default Project;
