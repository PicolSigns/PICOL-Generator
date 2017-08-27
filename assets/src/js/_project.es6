/* jshint esversion: 6 */
/* jshint -W107 */

import IconSize from "./_icon_size.es6";

var STORAGE,
	ICON_SIZE;

class Project {
	/**
	 * Class constructor
	 */
	constructor(storage) {
		STORAGE = storage;
		ICON_SIZE = new IconSize(storage);
		// console.log(ICON_SIZE.load_project({}));
	}

	// load_project(project) {
	// 	$("#project_name_input").val(project.name).removeClass("invalid");
	// 	$(".thumbNav").fadeIn();
	// 	// this.set_storage(project_name);
	// 	$("#slider").anythingSlider(2);
	// 	this.icon_size.load_project(project);
	// }

	build() {
		let $card_action = $("<div>", {"class": "card-action"}).append(
				$("<a>", {
					"class": "btn-flat white right",
					"href": "javascript:;",
					"tabindex": "-1",
					"id": "save_settings_btn"
				}).text("Continue")
			),
			$new_project = $("<div>").append(
				$("<div>", {"class": "row"}).append(
					$("<div>", {"class": "col l10 m12 s12 offset-l1"}).append(
						$("<div>", {"class": "project-input input-field"}).append(
							$("<input>", {
								"type": "text",
								"id": "project_name_input",
								"class": "validate",
								"data-error": "No empty value",
								"tabindex": "-1",
								"autofocus": "autofocus",
								"placeholder": "Project name"
							})
						)
					)
				)
			).append(
				$("<div>", {"class": "row"}).append(
					$("<div>", {"class": "col l8 m12 s12"}).append(
						$("<h6>").text("Local storage")
					).append(
						$("<p>").html("Use the browser local memory to store your history and settings.").append(
							$("<a>", {
								"href": "javascript:;",
								"data-position": "top",
								"data-tooltip": "This is not required but allows you to find your icons once you come back to this page.<br />At the final step you can export the entire project, anyway."
							}).append(
								$("<i>", {"class": "picol_information"})
							).tooltip({
								html: true,
								delay: 0
							})
						)
					)
				).append(
					$("<div>", {"class": "col l4 m12 s12"}).append(
						$("<div>", {"class": "switch right"}).append(
							$("<label>").append("Off").append(
								$("<input>", {
									"type": "checkbox",
									"tabindex": "-1",
									"id": "use_localstorage_btn"
								})
							).append(
								$("<span>", {"class": "lever"})
							).append("On")
						)
					)
				)
			),
			$old_projects = $("<div>").append(
				$("<h6>").text("Saved projects")
			).append(
				$("<ul>", {"class": "collection"}).append(
					() => {
						return $.map(STORAGE, (v) => {
							let cd = new Date(v.project.date),
								creation_date = cd.getFullYear() + "-" + cd.getMonth() + "-" + cd.getDate() + " " + cd.getHours() + ":" + ((cd.getMinutes() < 10) ? "0" + cd.getMinutes() : cd.getMinutes());

							return $("<li>", {"class": "collection-item dismissable"}).append(
								$("<div>").append(
									$("<div>", {"class": "title"}).append(v.project.name)
								).append(
									$("<span>", {"class": "help-text"}).text("Created on " + creation_date)
								).append(
									$("<a>", {
										"href": "javascript:;",
										"class": "secondary-content grey-text"
									}).append(
										$("<i>", {"class": "picol_controls_play"})
									).on("click", () => {
										ICON_SIZE.load_project(v.project);
									})
								)
							);
						});
					}
				)
			);

		return $("<div>", {"class": "stage project"}).append(
			$("<header>", {"class": "center-align"}).append(
				$("<img>", {
					"class": "logo",
					"src": "assets/media/img/picol_logo.png"
				})
			)
		).append(
			$("<div>", {"class": "content"}).append(
				$("<div>", {"class": "card z-depth-0"}).append(
					function() {
						if(STORAGE === undefined) {
							// No storaged data
							return $("<div>", {"class": "card-content"}).append(
								$new_project.append(
									$("<div>", {"class": "spacer-60 hide-on-small-only"})
								).append($card_action)
							);
						} else {
							// There are storaged data
							// We display a 2 columns layout
							return $("<div>", {"class": "card-content"}).append(
								$("<div>", {"class": "row"}).append(
									$("<div>", {"class": "col l6 m6 s12"}).append(
										$old_projects
									)
								).append(
									$("<div>", {"class": "col l6 m6 s12"}).append(
										$new_project
									)
								)
							).append($card_action);
						}
					}
				)
			)
		);
	}
}

export default Project;
