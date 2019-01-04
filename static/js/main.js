console.log('JS added');
document.addEventListener('DOMContentLoaded', () => {




  //Opening Title Animation

    //Carousel Activate
    var carousels = bulmaCarousel.attach();


    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
          $target.classList.toggle('slide-in');
  
        });
      });
    }
    

      
});

backToTop = function(){
  var scrollStep = -window.scrollY / (400 / 15),
  scrollInterval = setInterval(function(){
    if ( window.scrollY != 0 ) {
      window.scrollBy( 0, scrollStep );
    }
    else 
      clearInterval(scrollInterval); 
  },15);
};
window.addEventListener("scroll", function (event) {    
  if(this.scrollY > window.innerHeight-300){    
    document.getElementById("toTopWrapper").style.opacity = 1;
  }
  else{
    document.getElementById("toTopWrapper").style.opacity = 0;
  }
});
