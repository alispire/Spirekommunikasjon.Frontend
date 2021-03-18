(function($, undefined) {
	$(document).on('ready',function(){

		var win = $(window),
		body = $('body'),
		win_width = win.width(),
		win_height = win.height(),
		window_ratio = win_height / win_width,
		header_el = $('#site-header'),
		// video_wrapper = $('#front-page-video'),
		distance_to_ignore = 10,
		curr_scroll_top = win.scrollTop();

		
		function set_header(curr_scroll_top){
			if( curr_scroll_top > distance_to_ignore ){
				header_el.addClass('below');
				body.addClass('below');
			} else {
				header_el.removeClass('below');
				body.removeClass('below');
			}
		}
		set_header( curr_scroll_top );

		

		win.on('resize',  function(){
			win_width = win.width();
			win_height = win.height();
			window_ratio = win_height / win_width;
		});

		win.on('scroll', function(){      
		 	curr_scroll_top = win.scrollTop();
			set_header(curr_scroll_top);
		});

	});
})(jQuery);


