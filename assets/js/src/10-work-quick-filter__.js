document.addEventListener('DOMContentLoaded', () => {
	var triggers    = document.getElementsByClassName('work-quick-filter-btn');
	Array.from(triggers).forEach(function(element) {
		element.addEventListener('click', (event) => {
			event.preventDefault();
			var state = event.target.getAttribute('aria-selected');
			// console.log(typeof state);
			if( state === 'true' ){
				event.target.setAttribute( 'aria-selected', 'false' );
			}else{
				event.target.setAttribute( 'aria-selected', 'true' );
			}
			event.target.blur( );
		});
	});
});


// employee filter
// $("ul.work-quick-filter li").click(function () {
// 	var filters = $(this).data("filter");
// 	console.log(filters);
// 	$("div#FilterContainer").find("article").hide();
// 	$("div#FilterContainer").find("article." + filters).show();
// });

// reset works filter
localStorage.setItem('works-filters', JSON.stringify([]));

// works filter
$("ul.work-quick-filter li").click(function () {
	var filters = $(this).data("filter");
	console.log($(this).data);

	var addNewFilter = function (name) {
		var filters = JSON.parse(localStorage.getItem('works-filters')) || [];

		if (filters.includes(name)) {
			filters = $.grep(filters, function (value) {
				return value != name;
			});
		} else {
			filters.push(name);
		}

		localStorage.setItem('works-filters', JSON.stringify(filters));
		return filters;
	}

	var filtersList = addNewFilter(filters);
	
	if (filtersList.length > 0) {
		$("div#works-container").find("article").hide();
	}

	for (var i = 0; i < filtersList.length; i++) {
		$("div#works-container").find("article." + filtersList[i]).show();
	}
});
