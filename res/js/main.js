var siteSliderRange = function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	};
	// siteSliderRange();

	var siteCarousel = function () {
		if ( $('.nonloop-block-13').length > 0 ) {
			$('.nonloop-block-13').owlCarousel({
		    center: false,
		    items: 1,
		    loop: true,
				stagePadding: 0,
		    margin: 0,
		    autoplay: true,
		    nav: true,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
		    responsive:{
	        600:{
	        	margin: 0,
	        	nav: true,
	          items: 2
	        },
	        1000:{
	        	margin: 0,
	        	stagePadding: 0,
	        	nav: true,
	          items: 3
	        },
	        1200:{
	        	margin: 0,
	        	stagePadding: 0,
	        	nav: true,
	          items: 4
	        }
		    }
			});
		}

		$('.slide-one-item').owlCarousel({
	    items: 1,
	    margin: 0,
	    loop: true,
	    center: false,
	    mouseDrag: true,
	    touchDrag: true,
	    nav: false,
	    autoplay: true,
	    autoplayTimeout: 7000,
	    autoplayHoverPause: true,
	    autoHeight: true,
	    smartSpeed: 1000,
	    navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
	  });

	  
	};
	siteCarousel();

/*----------------------------------------------*/
// Back to top button
/*-----------------------------------------------*/
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 450) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})

/*----------------------------------------------*/
// Hide buttons when scroll
/*-----------------------------------------------*/
const button = document.querySelector(".buttonOne");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 50) {
    button.classList.add("hideBut");
  } else {
    button.classList.remove("hideBut");
  }
})

const button2 = document.querySelector(".buttonTwo");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 50) {
    button2.classList.add("hideBut");
  } else {
    button2.classList.remove("hideBut");
  }
})