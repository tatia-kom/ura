$(document).ready(function() {
    // index slider

    $('.index-slider').addClass('owl-carousel');
    $('.index-slider').owlCarousel({
        items: 1,
        nav: true,
        dots: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 8000,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true,
                loop: true,
            },
            1366: {
                items: 1,
                nav: true,
                dots: true,
                loop: true
            }
        }
    });

    // item photos slider

    $('.item-photos-main').addClass('owl-carousel');
    var itemPhotos = $('.item-photos-main').owlCarousel({
        items: 1,
        nav: true,
        loop: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true,
                loop: true,
            },
            768: {
                items: 1,
                nav: true,
                dots: true,
                loop: true
            }
        }
    });

    itemPhotos.on('changed.owl.carousel', function(event) {
        var idx = $('.item-photos-main .owl-dots button.active').index();
        if ($('.item-photos-nav__slide--active').index() != idx) {
            $('.item-photos-nav__slide--active').removeClass('item-photos-nav__slide--active');
            $('.item-photos-nav__slide').eq(idx).addClass('item-photos-nav__slide--active');
        }
    });

    $('.item-photos-nav__slide').click(function() {
        $('.item-photos-nav__slide--active').removeClass('item-photos-nav__slide--active');
        $(this).addClass('item-photos-nav__slide--active');
        itemPhotos.trigger('to.owl.carousel', $(this).index());
    });

    // item right panel stick

    if ($('.item-wrap').offset()) {
        var start = $('.item-wrap').offset().top;
        var block = $('.item-right');
        var blockWidth = $('.item-right').width();
        var stickArea = $('.item-right').parent().height();
        var marginTop = parseInt(block.css('marginTop'));

        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll > start) {
                if ((scroll - (start + marginTop)) >= (stickArea - block.height() - 80)) {
                    block.parent().addClass('item-right-wrap--bottom');
                    block.removeClass('item-right--sticked');
                }
                else {
                    block.parent().removeClass('item-right-wrap--bottom');
                    if (!block.hasClass('item-right--sticked')) {
                        block.css({width: blockWidth + 'px'});
                        block.addClass('item-right--sticked');
                    }
                }
            }
            else {
                block.removeClass('item-right--sticked');
            }
        });
    }

    // similar slider

    $('.similar-slider').addClass('owl-carousel');
    $('.similar-slider').owlCarousel({
        items: 4,
        nav: true,
        dots: false,
        loop: true,
        autoplay: false,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true,
                loop: true,
            },
            576: {
                items: 2,
                nav: false,
                dots: true,
                loop: true
            },
            768: {
                items: 3,
                nav: false,
                dots: true,
                loop: true
            },
            1366: {
                items: 4,
                nav: true,
                dots: false,
                loop: true
            }
        }
    });

    // catalog categories

    $('.catalog-left-categories__item').click(function(e) {
        $(this).toggleClass('catalog-left-categories__item--active');
    });
});