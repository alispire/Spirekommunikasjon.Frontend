
document.addEventListener('DOMContentLoaded', () => {
	var body        = document.getElementById('page-body');
	var menu        = document.getElementById('main-menu-wrapper');
	var trigger     = document.getElementById('main-menu-toggle');
	var closeBtn    = document.getElementById('main-menu-close');
	var triggers    = document.getElementsByClassName('main-menu-toggle');
	
	Array.from(triggers).forEach(function(element) {
		element.addEventListener('click', (event) => {
			body.classList.toggle('menu-out');
			menu.classList.toggle('menu-out');
			event.preventDefault();
		});
	});



	
});
