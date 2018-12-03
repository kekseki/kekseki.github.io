
function musaka(){  //zazene igricos
	if(soundStanje==1) nonepass.play();
	var intro = document.getElementById("introScreen");
	var info = document.getElementById("pokaziSe");
	var htmlOgrodje = document.getElementById("content");
    intro.style.visibility='hidden';
    htmlOgrodje.style.visibility='visible';
    info.style.visibility='hidden';
    ceSmoNaIntroju=0;
	start();
}


var musicStanje=1; //play music
function musicOFF(){
	if(soundStanje==1) klikam.play();
	var themeSong = document.getElementById("music");
	if(musicStanje==1){
		themeSong.pause();
		musicStanje=0;
		document.getElementById("3div").innerHTML = "<img src='assets/musicOFF.png' width='34%'>";
	}else{
		themeSong.play();
		musicStanje=1;
		document.getElementById("3div").innerHTML = "<img src='assets/musicON.png' width='34%'>";
	}
}

function soundOFF(){
	if(soundStanje==1) {
		soundStanje=0;
		document.getElementById("2div").innerHTML = "<img src='assets/soundOFF.png' width='38%'>";
	}
	else{ 
		soundStanje=1;
		klikam.play();
		document.getElementById("2div").innerHTML = "<img src='assets/soundON.png' width='38%''>";
	}
}

function lightingOFF(){
	if(soundStanje==1) klikam.play();
	if(lighting == true){
		lighting = false;
		document.getElementById("1div").style.color="#ea0000";
	}
	else {
		lighting = true;
		document.getElementById("1div").style.color="white";
	}
}

var klik=0; //prvi klik
var kolkoKrat=0;
function informator(){
	if(soundStanje==1) klikam.play();
	kolkoKrat++;
	var info = document.getElementById("pokaziSe");
	switch(klik){
	case 0:
		info.style.visibility = "visible";
		info.innerHTML = "NONE SHALL PASS!!!";
		klik++;
		break;
	case 1:
		info.innerHTML = "Kill as many Black knights as possible. Collect coconuts to heal yourself.";
		klik++;		
		break;
	case 2:
		info.innerHTML = "Made by:  <code>Gregor Bajt</code>  and  <code>Damjan Pjević</code>";
		klik=0;		
		break;
	}
	if (kolkoKrat==20){
		info.innerHTML = "EASTER EGG";
		info.style.color = "yellow";
	}if (kolkoKrat==21) info.style.color = "white";
}