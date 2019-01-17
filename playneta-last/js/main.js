
(function() {

    'use strict';

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    // Definition of caller element
    var getTriggerElement = function(el) {
        var isCollapse = el.getAttribute('data-collapse');
        if (isCollapse !== null) {
            return el;
        } else {
            var isParentCollapse = el.parentNode.getAttribute('data-collapse');
            return (isParentCollapse !== null) ? el.parentNode : undefined;
        }
    };

    // A handler for click on toggle button
    var collapseClickHandler = function(event) {
        var triggerEl = getTriggerElement(event.target);
        // If trigger element does not exist
        if (triggerEl === undefined) {
            event.preventDefault();
            return false;
        }

        // If the target element exists
        var targetEl = document.querySelector(triggerEl.getAttribute('data-target'));
        if (targetEl) {
            triggerEl.classList.toggle('-active');
            targetEl.classList.toggle('-on');
        }
    };

    // Delegated event
    document.addEventListener('click', collapseClickHandler, false);


    var sliderMain = function() {

        $('.flexslider').flexslider({
            animation: "fade",
            slideshowSpeed: 5000,
            directionNav: true,
            start: function(){
                setTimeout(function(){
                    $('.project').removeClass('animated fadeInUp');
                    $('.flex-active-slide').find('.project').addClass('animated fadeInUp');
                }, 500);
            },
            before: function(){
                setTimeout(function(){
                    $('.project').removeClass('animated fadeInUp');
                    $('.flex-active-slide').find('.project').addClass('animated fadeInUp');
                }, 500);
            }

        });
    };

    var contentWayPoint = function() {
        var i = 0;
        $('.animate-box').waypoint( function( direction ) {

            if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {

                i++;

                $(this.element).addClass('item-animate');
                setTimeout(function(){

                    $('body .animate-box.item-animate').each(function(k){
                        var el = $(this);
                        setTimeout( function () {
                            var effect = el.data('animate-effect');
                            if ( effect === 'fadeIn') {
                                el.addClass('fadeIn animated-fast');
                            } else if ( effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated-fast');
                            } else if ( effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated-fast');
                            } else {
                                el.addClass('fadeInUp animated-fast');
                            }

                            el.removeClass('item-animate');
                        },  k * 200, 'easeInOutExpo' );
                    });

                }, 100);

            }

        } , { offset: '85%' } );
    };

    var parallax = function() {

        if ( !isMobile.any() ) {
            $(window).stellar({
                horizontalScrolling: false,
                hideDistantElements: false,
                responsive: true

            });
        }
    };

    $(function(){
        sliderMain();
        contentWayPoint();
        parallax();
    });


})(document, window);

