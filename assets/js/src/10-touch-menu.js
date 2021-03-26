
document.addEventListener('DOMContentLoaded', () => {
	var body        = document.getElementById('page-body');
	var menu        = document.getElementById('main-menu-wrapper');
	var trigger     = document.getElementById('main-menu-toggle');
	var closeBtn    = document.getElementById('main-menu-close');
	var triggers    = document.getElementsByClassName('main-menu-toggle');
	var nightSwitch = document.getElementById('night-switch');
	
	// console.log('foo');
	Array.from(triggers).forEach(function(element) {
		element.addEventListener('click', (event) => {
			body.classList.toggle('menu-out');
			menu.classList.toggle('menu-out');
			event.preventDefault();
		});
	});

	nightSwitch.addEventListener('change', (event) => {
		body.classList.toggle('night-mode');	
	});

	
});
