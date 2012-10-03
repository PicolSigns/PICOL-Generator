<!--
jQuery.download = function(url, data, method){
	if( url && data ){ 
		data = typeof data == 'string' ? data : jQuery.param(data);
		var inputs = '';
		jQuery.each(data.split('&'), function(){ 
			var pair = this.split('=');
			inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />'; 
		});
		jQuery('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>').appendTo('body').submit().remove();
	};
};
function download_multiple(type){
	var inputs = $("#blacklist").val();
	
	if (inputs.length > 0){
		$("#download_btn").fadeIn();
		$.download("common/include/zipper.php", "type=" + type + "&files=" + inputs + "&tmp=" + $("#new_dir").val(), "get");
	} else {
		$("#download_btn").fadeOut();
	}
}
function blacklist(){
	var values = "",
	blacklist = $("#blacklist").val(),
	checked_,
	files = blacklist.split(",");
	
	$("#history input:checkbox").each(function(){
		if($(this).is(":checked")){
			$("#check_all_btn").text("Uncheck all");
			$("#checkall").attr("checked", true);
			files[files.length] = $(this).attr("name");
			files = array_unique(files);
		} else {
			$("#checkall").attr("checked", false);
			for(var i = 0; i < files.length; i++ ){
				if(files[i] == $(this).attr("name")){
					files.splice(i, 1);
				}
			}
		}
	});
	string_files = files.toString();
	$("#blacklist").val(string_files);
	
	// Update variable
	blacklist = $("#blacklist").val();
	if (string_files == 0){
		checkall = false;
		$("#checkall").attr("checked", false);
		$("#download_btn").fadeOut();
		$("#check_all_btn").text("Check all");
	} else {
		$("#checkall").attr("checked", true);
		$("#download_btn").fadeIn();
	}
}
function check_uncheck_all(){
	if ($("#history input:checkbox").not(':checked').length > 0){
		checkall = true;
		$("#history input:checkbox").each(function(){
			$(this).attr("checked", true);
		})
		blacklist();
	} else {
		checkall = false;
		$("#history input:checkbox").each(function(){
			$(this).attr("checked", false);
		})
		blacklist();
	}
}
-->