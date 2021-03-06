
/**
 * Extend Array.prototype width remove function
 * @return {[Array]}
 */
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

/**
 * Returns an Array of all url parameters
 * @return {[Array]} [Key Value pairs form URL]
 */
 function getAllUrlParams() {
    var keyPairs = [],
          params = window.location.search.substring(1).split('&');
    for (var i = params.length - 1; i >= 0; i--) {
        keyPairs.push(params[i].split('='));
    };
    return keyPairs;
}

/**
 * Returns an Array of filters
 * @return {[Array]}
 */
function getFilters(){
	var urlParams = getAllUrlParams();
	var urlFilters;
	urlParams.forEach(function(e){
		if( e[0] == 'filter' ){
			urlFilters = e[1].split(',');
		}
	});
	return urlFilters;
}


document.addEventListener('DOMContentLoaded', () => {

	
	var categories = getFilters() ? getFilters() : Array();
	var triggers = document.querySelectorAll('ul.quick-filter a[class$="filter-btn"]');
	var filter_items_wrapper = document.getElementById('filter-items');
	var filter_items = filter_items_wrapper ? filter_items_wrapper.querySelectorAll('article') : [];
	
	
	Array.from(triggers).forEach(function(element) {
		var state = element.getAttribute('aria-selected');
		var name = element.getAttribute( 'data-name' );
		

		categories.forEach( function(e){
			if( e == name){
				element.setAttribute( 'aria-selected', 'true' );
			};
		});

		
		// if( state === 'true' ){
		// 	categories.push(name);
		// }else{
		// 	categories.remove( name );
		// }


		element.addEventListener('click', (event) => {
			event.preventDefault();
			var elName = event.target.getAttribute( 'data-name' );
			var state = event.target.getAttribute('aria-selected');

			if( state === 'true' ){
				event.target.setAttribute( 'aria-selected', 'false' );
				categories.remove(elName);
			}else{
				event.target.setAttribute( 'aria-selected', 'true' );
				categories.push( elName );
			}
			event.target.blur();


			filter_items_wrapper.setAttribute("data-animating",'animating');
			var nIntervId = setInterval(function(){
				filter_items_wrapper.removeAttribute("data-animating");
			}, 2000);

			/*Run the filter */
			filter();
		});

	});



	var filter = function (){
		Array.from(filter_items).forEach(function(element) {
			var is_visible = false;

			if(categories.length == 0){
				element.setAttribute('data-hidden', false);
				filter_items_wrapper.classList.remove("filtered");
				
				return;
			}
			
			for( var i=0; i< element.classList.length; i++ ){
				
				var el_cat = element.classList[i];
				if(el_cat == "module-work-item") continue;
				
				if( categories.includes(el_cat) ){
					is_visible = true;
					element.setAttribute('data-hidden', false);
					continue;
				}

				if( ( element.classList.length  == i+1 ) && is_visible == false ){
					element.setAttribute('data-hidden', true);
					filter_items_wrapper.classList.add("filtered");
				}

			};
				
		});

	}
	filter();



});

