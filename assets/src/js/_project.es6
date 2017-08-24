/* jshint esversion: 6 */

class Project {
	/**
	 * Class constructor
	 */
	constructor() {
	}

	build() {
		console.log("ok");
		return $("<table>").append(
			$("<tr>").append(
				$("<td>").append(
					$("<table>", {"id": "project_selector", "class": "stage"}).append(
						$("<td>", {
							// "valign": "middle",
							// "onclick": "select_unselect_img('" + v.size + "', true, 'size_selector', 'selected_size', false); setTimeout('$(\'#slider\').data(\'AnythingSlider\').goForward()', 300);",
							// "id": "_" + v.size,
							// "title": v.size + "px",
							// "valign": "bottom",
							// "align": "center",
							// "class": "selected"
						}).append(
						)
					)
				)
			)
		);
	}
}

export default Project;
