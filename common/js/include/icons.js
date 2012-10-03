<!--
function select_all(){
	$("#operation_txt").html("selecting all icons...");
	$('#selected_imgs').val(icons.toString().replace(/ /g, "_"));
	get_images();
	$("#icon_selector td").addClass('selected');
	$("#operation_txt").html("");
}
function unselect_all(){
	$("#operation_txt").html("deselecting all icons...");
	$('#icon_selector td').removeClass('selected');
	$('#selected_imgs').val("");
	select_unselect_img('', false, 'icon_selector', 'selected_imgs', true);
}
$(document).ready(function(){
	var doneTyping = function() {
		$("#filter").fadeOut(300, function(){
			$(this).val("");
			$("#guide").show();
		});
		$("#icon_selector td.hover").removeClass("hover");
	}
	var timer = null,
	available_icons = icons,
	autoselect_history = new Array(),
	selected = "";
	
	$(document).keydown(function(e) {
		clearTimeout(timer);
		if (e.keyCode >= 65 && e.keyCode <= 90) { // Only letters keypress
			$("#guide").hide();
			$("#filter").fadeIn(300).focus().autocomplete({
				source: function (request, response) {
					var term = $.ui.autocomplete.escapeRegex(request.term)
					, startsWithMatcher = new RegExp("^" + term, "i")
					, startsWith = $.grep(available_icons, function(value) {
						return startsWithMatcher.test(value.label || value.value || value);
					})
					, containsMatcher = new RegExp(term, "i")
					, contains = $.grep(available_icons, function (value) {
						return $.inArray(value, startsWith) < 0 && containsMatcher.test(value.label || value.value || value);
					});
					response(startsWith.concat(contains));
				},
				autoFocus: true,
				delay: 0,
				minLength: 0,
				focus: function(event, ui){
					$(this).autocomplete("close");
					
					// Defines last selected
					selected = ui.item.value;
					selected_id = selected.replace(/\s+/g, "_");
					// Highlight it
					$("#icon_selector td.hover").switchClass("hover", "", 0);
					$("#_" + selected_id).addClass("hover");
					$("#icon_selector_container").scrollTo($("#_" + selected_id), 100).scrollTo({top: "-=10px"}, 150, {axis: "y"});
				}
			});
		} else if(e.keyCode == 13){  // Keypress "Enter"
			e.preventDefault();
			doneTyping();
			select_unselect_img(selected_id, false, "icon_selector", "selected_imgs", true);
		} else if(e.keyCode == 27){ // Keypress "Esc"
			doneTyping();
		}
		timer = setTimeout(function(){
			doneTyping();
		}, 5000);
	});
	$("#filter").blur(function(){ clearTimeout(timer); doneTyping(); });
	
	/*
	// Generates the table of icons
	// This script already run at generator_interface.js ~ $(document).ready()...
	// Depends if you want to load it at first "Icon" calling or at first application loading
	var table = "",
	file_name = "",
	filename = "",
	img_count = 0;
	if($("#icon_selector").html() == ""){
		$.each(available_icons, function(f, img){
			img_count++;
			file_name = img;
			filename = img.replace(/ /g, "_");
			if ((img_count % 4) == 1){
				table += "</tr><tr>";
			}
			// Display icons generated on the fly from svg
			table += '<td align="center" onclick="select_unselect_img(\'' + file_name + '\', false, \'icon_selector\', \'selected_imgs\', true);" class="' + img_count + '" id="_' + file_name + '" title="' + filename + '"><img src="common/include/svg_resizer.php?f=' + f + '" /><br />' + filename + '</td>';
		});
		$("#icon_selector").append(table);
	}
	*/
});
-->