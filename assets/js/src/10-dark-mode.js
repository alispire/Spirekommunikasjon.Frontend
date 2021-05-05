
document.addEventListener('DOMContentLoaded', () => {
	var body        = document.getElementById('page-body');
	var nightSwitch = document.getElementById('night-switch');
	

	if( sessionStorage.getItem( 'darkMode' ) == null ){
		sessionStorage.setItem( 'darkMode', 'false' );
	}else if(sessionStorage.getItem( 'darkMode' ) == 'true'){
		body.classList.toggle('night-mode');
		nightSwitch.checked = true;
	};
	

	nightSwitch.addEventListener('change', (event) => {
		toggleDarkMode();
	});


	function toggleDarkMode(){
		body.classList.toggle('night-mode');	

		if( sessionStorage.getItem( 'darkMode' ) == 'false' ){
			sessionStorage.setItem( 'darkMode', 'true' );
		}else if( sessionStorage.getItem( 'darkMode' ) == 'true' ){
			sessionStorage.setItem( 'darkMode', 'false' );
		};

	}

	
});
