/*----------------------------------------------*/
//	Dark Mode
/*-----------------------------------------------*/

var darkMode; //local variable
//var darkMode = localStorage.getItem("darkMode"); //local storage
//if (darkMode === "1") enableDarkMode(); //local storage

//enable dark mode through system preferece:
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  enableDarkMode();
} else {
  disableDarkMode();
}

function goDark() {
  if (darkMode == "0") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}

function enableDarkMode() {
  document.documentElement.setAttribute("data-theme", "dark");
  darkMode = 1; //set the session variable
  //localStorage.setItem("darkMode", 1); //save to local storage
}

function disableDarkMode() {
  document.documentElement.setAttribute("data-theme", "light");
  darkMode = 0; //set the session variabl
  //localStorage.setItem("darkMode", 0); //save to local storage
}

/*----------------------------------------------*/
//	Slider
/*-----------------------------------------------*/

var slidesM = document.getElementsByClassName("slide-mnenje");
var dotsM = document.getElementsByClassName("dot-mnenje");
var slidesJ = document.getElementsByClassName("slide-job");
var dotsJ = document.getElementsByClassName("dot-job");
selectSlide(slidesM, dotsM, 0); //select first slide
selectSlide(slidesJ, dotsJ, 0); //select first slide

//Dot triggers mnenje
function showSlidesMnenje(n) {
  selectSlide(slidesM, dotsM, n);
}
//Dot triggers job

function showSlidesJob(n) {
  selectSlide(slidesJ, dotsJ, n);
}

function selectSlide(slides, dots, n) {
  let i;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].style.backgroundColor = "var(--hover)";
  }
  slides[n].style.display = "block";
  dots[n].style.backgroundColor = "var(--oposite-color)";
}
