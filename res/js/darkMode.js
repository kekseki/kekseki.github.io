let darkMode = localStorage.getItem('darkMode'); 
const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
	//enable
	document.body.classList.add('darkMode');
	//save to local storage
	localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
	//enable
	document.body.classList.remove('darkMode');
	//save to local storage
	localStorage.setItem('darkMode', null);
}

if (darkMode === 'enabled') {
  enableDarkMode();
}

darkModeToggle.addEventListener('click',()=> {
	darkMode = localStorage.getItem('darkMode'); 
	if(darkMode !== 'enabled'){
		enableDarkMode();
	}else{
		disableDarkMode();
	}
});