$(document).ready(function () {
//    NavBar scrolled
    $(window).on("scroll", function () {
       if($(this).scrollTop()>90){
           $(".navbar").addClass("navbar-scrolled");
       }else{
           $(".navbar").removeClass("navbar-scrolled");
       }
    });

    //Feature Carousel
    $('.feature-carousel').owlCarousel({
        loop: true,
        margin: 0,
        responsiveClass: true,
        autoplay: true,
        responsive: {
            0:{
                items: 1,
            },
            600:{
                items: 2,
            },
            1000:{
                items: 3,
            }
        }
    });

    //Apps ScreenShot Carousel
    $('.screenshot-carousel').owlCarousel({
        loop: true,
        margin: 40,
        responsiveClass: true,
        autoplay: true,
        responsive: {
            0:{
                items: 1,
            },
            600:{
                items: 2,
            },
            1000:{
                items: 4,
            }
        }
    });

    //Apps testimonial Carousel
    $('.testimonial-carousel').owlCarousel({
        loop: true,
        margin: 40,
        responsiveClass: true,
        autoplay: true,
        responsive: {
            0:{
                items: 1,
            },
            600:{
                items: 2,
            },
            1000:{
                items: 4,
            }
        }
    });

});
