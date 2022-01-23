$(document).ready(function() {
	var includes = $('[data-include]');
	jQuery.each(includes, function(){
	  var file = 'INCLUDE/' + $(this).data('include') + '.html';
	  $(this).load(file);
	});
});