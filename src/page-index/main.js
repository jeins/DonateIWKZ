import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
require('./page.css')
require('./card.css');

/* make navbar fixed on scroll */
  $.get( "http://prs.iwkz.de/prs.php", function( response ) {
    var data = JSON.parse(response); 
    /* progress bar animation */
$(".progress-bar").animate({
  width: data.percentage,
}, 5500);

$('#totalDonate').text(data.total);
  });
// When the user scrolls the page, execute myFunction 
window.onscroll = function() {gccScroll()};

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function gccScroll() {
  // Get the header
  var header = document.getElementById("navigation");
  // Get the offset position of the navbar
  var sticky = header.offsetTop;
  if (window.pageYOffset > sticky) {
    header.classList.add("fixed-top");
  } else {
    header.classList.remove("fixed-top");
  }
}

/* owl slider */
$('.owl-carousel').owlCarousel({
  center: true,
  loop: true,
  nav: true,
  items: 5,
  responsiveClass: true,
  //navText: ['<i class="fas fa-chevron-left"></i>','<i class="fas fa-chevron-right"></i>'],
  responsive:{
   
    318:{
      items: 3
    },
    990:{
      items: 3
    },
    1199:{
      items: 5
    }
  },
  onInitialized: coverFlowEfx,
  onTranslate: coverFlowEfx,
});

function coverFlowEfx(e){
  if ($('.owl-dots')) {
    $('.owl-dots').remove();
  }
  idx = e.item.index;
  $('.owl-item.big').removeClass('big');
  $('.owl-item.medium').removeClass('medium');
  $('.owl-item.mdright').removeClass('mdright');
  $('.owl-item.mdleft').removeClass('mdleft');
  $('.owl-item.smallRight').removeClass('smallRight');
  $('.owl-item.smallLeft').removeClass('smallLeft');
  $('.owl-item').eq(idx -1).addClass('medium mdleft');
  $('.owl-item').eq(idx).addClass('big');
  $('.owl-item').eq(idx + 1).addClass('medium mdright');
  $('.owl-item').eq(idx + 2).addClass('smallRight');
  $('.owl-item').eq(idx - 2).addClass('smallLeft');
}


/* back to top */
(function(){
    // Back to Top - by CodyHouse.co
  var backTop = document.getElementsByClassName('js-cd-top')[0],
    // browser window scroll (in pixels) after which the "back to top" link is shown
    offset = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    offsetOpacity = 1200,
    scrollDuration = 700
    scrolling = false;
  if( backTop ) {
    //update back to top visibility on scrolling
    window.addEventListener("scroll", function(event) {
      if( !scrolling ) {
        scrolling = true;
        (!window.requestAnimationFrame) ? setTimeout(checkBackToTop, 250) : window.requestAnimationFrame(checkBackToTop);
      }
    });
    //smooth scroll to top
    backTop.addEventListener('click', function(event) {
      event.preventDefault();
      (!window.requestAnimationFrame) ? window.scrollTo(0, 0) : scrollTop(scrollDuration);
    });
  }
  
  function checkBackToTop() {
    var windowTop = window.scrollY || document.documentElement.scrollTop;
    ( windowTop > offset ) ? addClass(backTop, 'cd-top--show') : removeClass(backTop, 'cd-top--show', 'cd-top--fade-out');
    ( windowTop > offsetOpacity ) && addClass(backTop, 'cd-top--fade-out');
    scrolling = false;
  }
  
  function scrollTop(duration) {
      var start = window.scrollY || document.documentElement.scrollTop,
          currentTime = null;
          
      var animateScroll = function(timestamp){
        if (!currentTime) currentTime = timestamp;        
          var progress = timestamp - currentTime;
          var val = Math.max(Math.easeInOutQuad(progress, start, -start, duration), 0);
          window.scrollTo(0, val);
          if(progress < duration) {
              window.requestAnimationFrame(animateScroll);
          }
      };
  
      window.requestAnimationFrame(animateScroll);
  }
  
  Math.easeInOutQuad = function (t, b, c, d) {
     t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  };
  
  //class manipulations - needed if classList is not supported
  function hasClass(el, className) {
      if (el.classList) return el.classList.contains(className);
      else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }
  function addClass(el, className) {
    var classList = className.split(' ');
     if (el.classList) el.classList.add(classList[0]);
     else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
     if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
  }
  function removeClass(el, className) {
    var classList = className.split(' ');
      if (el.classList) el.classList.remove(classList[0]);	
      else if(hasClass(el, classList[0])) {
        var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
        el.className=el.className.replace(reg, ' ');
      }
      if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
  }
  })();
  
  // Add slideDown animation to dropdown
  $('.dropdown').on('show.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
  });
  
  // Add slideUp animation to dropdown
  $('.dropdown').on('hide.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
  });

  /* smooth scroll for scrollspy */
$(document).ready(function(){
  /* preloader */



  $('#dokumentasi-card-container').lightGallery(); 

	setTimeout(function(){
		$('body').addClass('loaded');
	}, 3000);

  // Add smooth scrolling to all links
  $("a").on('click', function(event) {
    $( "li.active" ).removeClass( "active" );
    $(this).parent().addClass('active');
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 600, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});
