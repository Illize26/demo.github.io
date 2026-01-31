/**
 * Slider animation script
 */

var $homeSlide = $('.slide'),
    $slideNavNext = $('#next'),
    $slideNavPrev = $('#prev');

window.sliderAnimating = false;

/* NEXT */

window.goToNextSlide = function(slideOut, slideIn, slideInAll) {

  var t1 = new TimelineLite({
    onComplete: function(){
      window.sliderAnimating = false;
    }
  }),
  slideOutContent = slideOut.find('.card-content'),
  slideInContent = slideIn.find('.card-content'),
  slideOutImg = slideOut.find('.card-img'),
  slideInImg = slideIn.find('.card-img'),
  index = slideIn.index(),
  size = $homeSlide.length;

  if(slideIn.length !== 0) {
    t1
    .set(slideIn, {autoAlpha: 1, className: '+=active'})
    .set(slideOut, {className: '-=active'})
    .to(slideOutContent, 0.65, {y: "+=40px", ease: Power3.easeInOut}, 0)
    .to(slideOutImg, 0.65, {backgroundPosition :'bottom', ease: Power3.easeInOut}, 0)
    .to(slideInAll, 1, {y: "-=100%", ease: Power3.easeInOut}, 0)
    .fromTo(slideInContent, 0.65, {y: '-=40px'}, {y : 0, ease: Power3.easeInOut}, "-=0.7")
    .fromTo(slideInImg, 0.65, {backgroundPosition: 'top'}, {backgroundPosition: 'bottom', ease: Power3.easeInOut}, '-=0.7');
  }

  TweenMax.set($slideNavPrev, {autoAlpha: 1});

  if(index === size - 1){
    TweenMax.to($slideNavNext, 0.3, {autoAlpha: 0.2, ease:Linear.easeNone});
  }
}

/* PREV */

window.goToPrevSlide = function(slideOut, slideIn, slideInAll) {

  var t1 = new TimelineLite({
    onComplete: function(){
      window.sliderAnimating = false;
    }
  }),
  slideOutContent = slideOut.find('.card-content'),
  slideInContent = slideIn.find('.card-content'),
  slideOutImg = slideOut.find('.card-img'),
  slideInImg = slideIn.find('.card-img'),
  index = slideIn.index(),
  size = $homeSlide.length;

  if(slideIn.length !== 0) {
    t1
    .set(slideIn, {autoAlpha: 1, className: '+=active'})
    .set(slideOut, {className: '-=active'})
    .to(slideOutContent, 0.65, {y: "-=40px", ease: Power3.easeInOut}, 0)
    .to(slideOutImg, 0.65, {backgroundPosition :'top', ease: Power3.easeInOut}, 0)
    .to(slideInAll, 1, {y: "+=100%", ease: Power3.easeInOut}, 0)
    .fromTo(slideInContent, 0.65, {y: '+=40px'}, {y : 0, ease: Power3.easeInOut}, "-=0.7")
    .fromTo(slideInImg, 0.65, {backgroundPosition: 'bottom'}, {backgroundPosition: 'top', ease: Power3.easeInOut}, '-=0.7');
  }

  TweenMax.set($slideNavNext, {autoAlpha: 1});

  if(index === 0){
    TweenMax.to($slideNavPrev, 0.3, {autoAlpha: 0.2, ease:Linear.easeNone});
  }
}

/* EVENTS */

$slideNavNext.click(function(e) {
  e.preventDefault();
  if(window.sliderAnimating) return;
  window.sliderAnimating = true;

  var slideOut = $('.slide.active'),
      slideIn = slideOut.next('.slide'),
      slideInAll = $('.slide');

  window.goToNextSlide(slideOut, slideIn, slideInAll);
});

$slideNavPrev.click(function(e) {
  e.preventDefault();
  if(window.sliderAnimating) return;
  window.sliderAnimating = true;

  var slideOut = $('.slide.active'),
      slideIn = slideOut.prev('.slide'),
      slideInAll = $('.slide');

  window.goToPrevSlide(slideOut, slideIn, slideInAll);
});
