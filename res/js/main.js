/*----------------------------------------------*/
//	Dark Mode
/*-----------------------------------------------*/

var darkMode = localStorage.getItem("darkMode");
if (darkMode === "1") {
  enableDarkMode();
}
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.documentElement.setAttribute("data-theme", "dark");
} else {
  document.documentElement.setAttribute("data-theme", "light");
}

function goDark() {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode == "0") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}

function enableDarkMode() {
  document.documentElement.setAttribute("data-theme", "dark"); //enable
  localStorage.setItem("darkMode", 1); //save to local storage
}

function disableDarkMode() {
  document.documentElement.setAttribute("data-theme", "light");
  //save to local storage
  localStorage.setItem("darkMode", 0);
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
