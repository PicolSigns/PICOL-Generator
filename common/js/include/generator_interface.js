<!--
var pages = {},
scripts = {},
icons = [],
icon_data,
icon,
table = "",
file_name = "",
filename = "",
img_count = 0;
sliders = {
	"Size": {
		"id": "icon_size",
		"title": "CHOOSE ICON SIZE",
		"main_file": "icon_size.tpl",
		"script_file": ""
	},
	"Color": {
		"id": "color",
		"title": "COLOR",
		"main_file": "colorpicker.tpl",
		"script_file": ""
	},
	"Icons": {
		"id": "icons",
		"title": "ICONS",
		"main_file": "icons.tpl",
		"script_file": "icons.js"
	},
	"Badges": {
		"id": "badges",
		"title": "BADGEs",
		"main_file": "badge.tpl",
		"script_file": ""
	},
	"Single download": {
		"id": "single_file",
		"title": "DOWNLOAD SINGLE FILE",
		"main_file": "download_single.tpl",
		"script_file": ""
	},
	"Multiple download": {
		"id": "multiple_file",
		"title": "DOWNLOAD MULTIPLE FILE",
		"main_file": "download_multiple.tpl",
		"script_file": "download_multiple.js"
	}
},
checkall = true,
i = 0,
j = 0;
$(function() {
	new_dir = $("#new_dir").val();
	$.each(sliders, function(item, value){
		i++;
		pages[i] = item;
		scripts[i] = value["script_file"];
		$("#slider").append('<li><fieldset id="' + value["id"] + '"><legend>' + value["title"] + '</legend></li>');
		$.get("common/include/funcs/_ajax/executor.php", {file: value["main_file"]}, function(data){
			$("#" + value["id"]).append(data);
		});
	});
	$('#slider').anythingSlider({
		navigationFormatter: function(i, panel){ // add thumbnails as navigation links
		    return pages[i];
		},
		autoPlay: false,
		startPanel: 1,
		buildArrows: false,
		buildStartStop: false,
		expand: true,
		hashTags: false,
		resizeContents: true,
		infinteSlides: false,
		animationTime: 450,
		easing: "easeOutCubic",
		onSlideComplete: function(slider){
			if (slider.currentPage > 3 && $("#selected_imgs").val() == ""){
				if (slider.currentPage < 7 || $("#history").html() == ""){
					$("#slider").anythingSlider(3);
				}
			}
			if (slider.currentPage == 6){
				refresh_history();
			}
			if(slider.currentPage != 3){
				$(document).unbind("keydown");
			} else {
				$("#filter").focus();
			}
			if(scripts[slider.currentPage] != "" && scripts[slider.currentPage] != undefined){
				$.get("common/js/include/" + scripts[slider.currentPage], function(data){}, "script");
			}
		},
		onSlideBegin: function(slider){
			if (slider.currentPage != 3 && $("#selected_imgs").val() == ""){
				$("#generator_interface .forward > a").animate({"backgroundPosition": "-188px -40px"}, 1000);
			} else {
				$("#generator_interface .forward > a").animate({"backgroundPosition": "0 -40px"}, 1000);
			}
			if (slider.currentPage !== 6){
				refresh_history();
			}
		}
	});
});

function select_unselect_img(file_name, single, selector, selected_input, allow_removing){
	if(allow_removing == undefined){
		allow_removing = true;
	}
	if (single == false){
		var sid = $("#" + selected_input).val();
		var selected_imgs = $("#" + selected_input).val();
		var filename = "";
		
		if (file_name !== ""){
			if ($("#_" + file_name).hasClass('selected')){
				if (selected_imgs.split(",") == 0){
					filename = file_name;
				} else {
					filename = file_name + ",";
				}
				$("#_" + file_name).removeClass('selected'); 
				selected_imgs = selected_imgs.replace(filename, "");
				
				$("#" + selected_input).val(selected_imgs);
				if (sid == ""){
					$('#selected_badges').val("");
					$("#slider").find("#generated").html("<tr><td class=\"nothing\"></td></tr>");
					get_images();
				}
			} else {
				filename = file_name + ",";
				
				$("#_" + file_name).addClass('selected'); 
				selected_imgs += filename;
				$("#" + selected_input).val(selected_imgs);
			}
		} else {
			$("#slider").find("#generated").html("<tr><td class=\"nothing\"></td></tr>");
			$("#operation_txt").html("");
		}
	} else {
		var filename = file_name.replace(".svg", "");
		if (filename == $("#" + selected_input).val()){
			if(allow_removing == true){
				$("#" + selector + " td").removeClass('selected');
				$("#" + selected_input).val("");
			}
		} else {
			$("#" + selector + " td").removeClass('selected');
			$("#_" + filename).addClass('selected');
			$("#" + selected_input).val(filename);
		}
	}
	get_images();
}
function get_images(){
	var display = "",
	history = "",
	color = $("#output").val().replace("#", ""),
	results_content = "<tr><td class=\"nothing\"></td></tr>",
	selected_imgs = $("#selected_imgs").val(),
	badge = $("#selected_badges").val(),
	size = $("#selected_size").val(),
	new_dir = $("#new_dir").val();
	
	$("#loader").css({cursor: "wait"});
	size = parseInt(size);
		switch (size){
			case 16: display = 15; break;
			case 32: display = 10; break;
			case 64: display = 6; break;
			case 128: display = 3; break;
			case 256: display = 2; break;
		}
		display = parseInt(display);
	if (badge.length > 0){
		badge += ".svg";
	}
	$("#loader").fadeTo(0, 0, function(){
		if (selected_imgs.length > 0){
			selected = selected_imgs.split(",");
			selected.pop();
			selected.sort();
			results_content = "<tr>";
			for (i =0; i < selected.length; i++){
				if(selected[i].length > 0){
					if ((i % display) == 0){
						results_content += "</tr><tr>";
					}
					var random = Math.random()*11;
					results_content += '<td align="center" title="Click to download image" onclick="location.href=\'common/include/generator.php?size=' + size + '&color=' + color + '&img=' + selected[i] + '.png&badge=' + badge + '\'"><img src="common/include/generator.php?size=' + size + '&color=' + color + '&img=' + selected[i] + '.png&badge=' + badge + '&new_dir=' + new_dir + '&action=show&rand=' + random + '" /></td>';
				}
			}
		}
		results_content += "</tr>";
		results_content = results_content.replace("<tr></tr>", "");
		$("#slider").find("#generated").html(results_content);
			$("#generated div").delay(300).fadeIn(150);
		$.get("common/include/ajax_read_history.php", {"dir": new_dir},
		function(data){
			$("#slider").find("#history").html(data);
		});
	});
	$("#loader").fadeOut();
	$("#loader").css({cursor: "default !important"});
}
function array_unique(a) {var r = new Array(); o:for(var i = 0, n = a.length; i < n; i++) { for(var x = 0, y = r.length; x < y; x++) { if(r[x]==a[i]) continue o; } r[r.length] = a[i]; } return r; }
function refresh_history(){
	var files = new Array(),
	i_files = "",
	f = -1,
	new_dir = $("#new_dir").val();
	
	$.get("common/include/ajax_read_history.php", {dir: new_dir},
	function(data){
		$("#slider").find("#history").html(data);
		if ($("#slider").find("#history").html() !== ""){
			$("#slider").find("#history_content").css({"backgroundImage": "none"});
			$("#slider").find("#download_btn").fadeIn();
		} else {
			$("#slider").find("#download_btn").fadeOut();
		}
		if (checkall == true){
			$('#slider').find('#history input').attr('checked', true);
		} else {
			$('#slider').find('#history input').attr('checked', false);
		}
		jQuery.each($('#slider').find('#history input'), function(){
			f++;
			files[f]= $(this).attr("name");
		});
		files = array_unique(files);
		$("#slider").find("#blacklist").val(files);
	});
}
$(document).ready(function(){
	$.get("common/include/funcs/_ajax/generator_interface.php", function(data){
		$("#new_dir").val(data.new_dir);
		$("#images").val(data.images);
		
		$.each(data.images, function(item, data){
			img_count++;
			icon_data = data.split(".");
			icon = icon_data[0];
			file_name = icon;
			filename = icon.replace(/_/g, " ");
			icons.push(filename);
			
			if ((img_count % 4) == 1){
				table += "</tr><tr>";
			}
			// Display icons generated on the fly from svg
			table += '<td align="center" onclick="select_unselect_img(\'' + file_name + '\', false, \'icon_selector\', \'selected_imgs\', true);" class="' + img_count + '" id="_' + file_name + '" title="' + filename + '"><img src="common/include/svg_resizer.php?f=' +item+ '" /><br />' + filename + '</td>';
		});
		$("#icon_selector").append(table);
	}, "json");
});
-->