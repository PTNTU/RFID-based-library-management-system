(function($){
	"use strict";

	var window_width 	 = $(window).width(),
	window_height 		 = window.innerHeight,
	header_height 		 = $(".default-header").height(),
	header_height_static = $(".site-header.static").outerHeight(),
	fitscreen 			 = window_height - header_height;

	productQuantityButton();
	
	$(".fullscreen").css("height", window_height)
	$(".fitscreen").css("height", fitscreen);

	$("[data-hover-color], [data-hover-opacity]").each(function() {
		var hoverColor = $(this).attr("data-hover-color");
		var hoverColorOpacity = $(this).attr("data-hover-opacity");
		$(this).css({
			backgroundColor: hoverColor,
			opacity: hoverColorOpacity
		});
		$(this).removeAttr("data-hover-color data-hover-opacity");
	});


// ---------  Sticky Main Menu Active-----------//

	$("#header1").sticky({topSpacing:0});
	$("#header5").sticky({topSpacing:0});

// ------------Mobile Menu Active--------------//

	$(function(){
		$('#mobile').slicknav();
	});

// --------- 16 Bootstrap Custom Popover Active-----------//

	$(".event-date").popover({
		trigger : 'click',  
		html: 'true', 
		content : '<div class="custom-popover">'+
		'<img src="img/event/5.jpg" alt="" class="img-responsive">'+
		'<div class="custom-popover-content"><h4>Designing Effective Parallax</h4>'+
		'<span>25th February, 2017</span>'+
		'<p class="p-title">External Campus Liberal University, West Rajkot, India</p>'+
		'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>'+
		'<a href="#">Read More <i class="fa fa-caret-right"></i> </a></div></div>',
		template: '<div class="popover"><div class="popover-content"></div></div>'
	});

		/*----------------------------------------
		product Quantity
	------------------------------------------*/
	function productQuantityButton() {
		$(".quantity-field .add").on("click", function (e) {
			$(this).prev().val(+$(this).prev().val() + 1);
		});
		$(".quantity-field .sub").on("click", function (e) {
			if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
		});
	}

// --------- 01 Home Slider Active-----------//

	$(".slider1").owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		mouseDrag: false,
		smartSpeed: 700,
		animateOut: 'fadeOut',
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		onInitialized: function() {
			$(".slider1 .owl-prev, .slider1 .owl-next").addClass("btn-floating btn-large waves-effect btn-white");
		}
	})

// --------- 32 Blog Home Slider Active-----------//
	$(".blog-slider").owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		mouseDrag: false,
		smartSpeed: 700,
		animateOut: 'fadeOut',
		navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
		onInitialized: function() {
			$(".slider1 .owl-prev, .slider1 .owl-next").addClass("btn-floating");
		}
	})
// --------- 32 Blog Home Slider Active-----------//
	$(".shop-home").owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		mouseDrag: false,
		smartSpeed: 700,
		animateOut: 'fadeOut',
		navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
		onInitialized: function() {
			$(".slider1 .owl-prev, .slider1 .owl-next").addClass("btn-floating");
		}
	})

// ---------  Wel Come Slider Active-----------//

	$(".wel-slider").owlCarousel({
		loop: true,
		items: 1,
		dots: true,
		autoplay: true,
		autoplayTimeout: 3000
	})

// ---------  Testimonial Slider Active-----------//
	$(".testimonial-content").owlCarousel({
		loop: true,
		items: 1,
		dots: true,
		autoplay: true,
		autoplayTimeout: 3000
	})
// ---------   Kindergarten Testimonial Slider Active-----------//
	$(".active-test-carousel").owlCarousel({
		loop: true,
		items: 2,
		dots: true,
		autoplay: true,
		autoplayTimeout: 3000,
		responsive:{
			0:{
				items:1,
				center: true,
			},
			600: {
				items: 2,
			}
		}
	})
// ---------   Designing Testimonial Slider Active-----------//
	$(".active-design-carousel").owlCarousel({
		loop: true,
		items: 1,
		dots: true,
		autoplay: true,
		autoplayTimeout: 3000
	})
// ---------  Brand Slide Active-----------//
	$(".brand").owlCarousel({
		loop: true,
		items: 6,
		dots: false,
		margin: 100,
		responsiveClass:true,
		responsive:{
			0:{
				items:1,
			},
			600:{
				items:3,
			},
			1000:{
				items:6,
			}
		}
	})
	// ---------  Single Product Slider Active-----------//
	$(".total-product-slider").owlCarousel({
		loop: true,
		items: 1,
		dots: true
	})

	// ---------  Testimonial Slider Active-----------//
	$(".total-testimonial-carousel").owlCarousel({
		loop: true,
		items: 3,
		dots: true
	})

	// ---------  Search Slide Active-----------//

	$('.search-icon').on("click", function (e){
		$('.search-area').slideToggle('slow');
		$("span", this).toggleClass("glyphicon-remove");
		$('.header-top').toggle();
		$('#focus').focus();
	});
	$('.search-icon').delay(200).on("click", function (e){
		$('#focus').focus();
	});


	// ------------Tab Active--------------//
	 $('#myTabs a').on("click", function (e) {
		e.preventDefault()
		$(this).tab('show')
	})
	// ------------Nice Select Active--------------//
	 
	 $('select').niceSelect();
	
	// ------------Load More Active--------------//

	$('.load-course').on("click", function (e) {
		e.preventDefault()
		$('.load-content').fadeIn(3000);
		$('.load-course').hide();
	});

	// ------------ Load More Review Active --------------//
	$('.click-review').on("click", function (e) {
		var hasclass = $(this).hasClass('no-border')
		if(hasclass){
			$(this).removeClass('no-border');
			$('.expand-review').fadeOut(500);
			$('.toltip').show();
		}else{
			$(this).addClass('no-border');
			$('.expand-review').fadeIn(1000);
			$('.toltip').hide();
		}		
		//$('.no-border').css({'border-bottom',"1px", "solid", "#fff"});
	});

	// ------------ Active Twitter Carousel -----------------//
    $('.tweet-carousel').owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        margin: 0
    })
    $('.next-tw').on("click", function (e) {
        $(".tweet-carousel").trigger('next.owl.carousel');
    })
    $('.prev-tw').on("click", function (e) {
        $(".tweet-carousel").trigger('prev.owl.carousel');
    });

    // ------------ Active Sidebar Navigation -----------------//

	$('.slide-toggle-btn').on("click", function (e) {
		e.preventDefault();
		$(this).parent().toggleClass('sidebar-open');
		
	});
    // ------------ Active Sidebar Google Map -----------------//

	$('.slide-toggle-map').on("click", function (e){
		e.preventDefault();
		$(this).parent().toggleClass('sidebar-open');

		
		var hasClass = $(this).find('.et-line').hasClass('icon-map-pin');
		if(hasClass){
			$(this).find('.et-line').addClass('icon-envelope');
			$(this).find('.et-line').removeClass('icon-map-pin');
		}else{
			$(this).find('.et-line').removeClass('icon-envelope');
			$(this).find('.et-line').addClass('icon-map-pin');
		}

	});

    // ------------ Active cooking Chef Animation -----------------//

	$('.cooking1 .head2, .cooking1 .head3, .cooking1 .head4').on("hover", function () {
		$(this).parent().addClass('animate-chef');
		$(this).parent().removeClass('animate-chef2');
		
	});
	$('.cooking1 .head1, .cooking1 .head5, .cooking1 .head6').on("hover", function () {
		$(this).parent().addClass('animate-chef2');
		$(this).parent().removeClass('animate-chef');
		
	});
// ------------ Active Driving Animation -----------------//
	$('.driving1 .head1').on("hover", function () {
		$('.driving2 img').css('transform', 'rotate(-25deg)');
	});
	$('.driving1 .head2').on("hover", function () {
		$('.driving2 img').css('transform', 'rotate(25deg)');
	});
	$('.driving1 .head3').on("hover", function () {
		$('.driving2 img').css('transform', 'rotate(90deg)');
	});
	$('.driving1 .head4').on("hover", function () {
		$('.driving2 img').css('transform', 'rotate(150deg)');
	});
	$('.driving1 .head5').on("hover", function () {
		$('.driving2 img').css('transform', 'rotate(210deg)');
	});
	$('.driving1 .head6').on("hover", function () {
		$('.driving2 img').css('transform', 'rotate(270deg)');
	});

	// ------------ Active Design Animation -----------------//
	$('.design1 .head1').on("mouseenter", function () {
		$('.design2 .circle-box .circle1').css('background-color', '#f6d71e');
	});
	$('.design1 .head1').on("mouseleave", function () {
		$('.design2 .circle-box .circle1').css('background-color', '#eeeeee');
	});
	$('.design1 .head2').on("mouseenter", function () {
		$('.design2 .circle-box .circle2').css('background-color', '#f8401b');
	});
	$('.design1 .head2').on("mouseleave", function () {
		$('.design2 .circle-box .circle2').css('background-color', '#eeeeee');
	});
	$('.design1 .head3').on("mouseenter", function () {
		$('.design2 .circle-box .circle3').css('background-color', '#56ddeb');
	});
	$('.design1 .head3').on("mouseleave", function () {
		$('.design2 .circle-box .circle3').css('background-color', '#eeeeee');
	});
	$('.design1 .head4').on("mouseenter", function () {
		$('.design2 .circle-box .circle4').css('background-color', '#ff5aa0');
	});
	$('.design1 .head4').on("mouseleave", function () {
		$('.design2 .circle-box .circle4').css('background-color', '#eeeeee');
	});
	$('.design1 .head5').on("mouseenter", function () {
		$('.design2 .circle-box .circle5').css('background-color', '#00b827');
	});
	$('.design1 .head5').on("mouseleave", function () {
		$('.design2 .circle-box .circle5').css('background-color', '#eeeeee');
	});
	$('.design1 .head6').on("mouseenter", function () {
		$('.design2 .circle-box .circle6').css('background-color', '#7f19a5');
	});
	$('.design1 .head6').on("mouseleave", function () {
		$('.design2 .circle-box .circle6').css('background-color', '#eeeeee');
	});


	//----------------- CheckAll  Js Active ----------------//

	$("#checkAll").on("change", function ()  {
	    $(".member-notification-table input:checkbox").prop('checked', $(this).prop("checked"));
	});




	//----------------- CountDown Js Active ----------------//

    
	// $(".countdown").jCounter({
 //    	date: "30 december 2017 12:00:00", 
 //    	timezone: "Europe/Bucharest",
 //    	format: "dd:hh:mm:ss",
 //    	twoDigits: 'on',
 //    	fallback: function() { console.log("Counter finished!") }
 //    });

})(jQuery);

	// -------   Mail Send ajax

	$(document).ready(function() {
        var form = $('#myForm'); // contact form
        var submit = $('.submit-btn'); // submit button
        var alert = $('.alert'); // alert div for show alert message

        // form submit event
        form.on('submit', function(e) {
            e.preventDefault(); // prevent default form submit

            $.ajax({
                url: 'mail.php', // form action url
                type: 'POST', // form submit method get/post
                dataType: 'html', // request type html/json/xml
                data: form.serialize(), // serialize form data
                beforeSend: function() {
                	alert.fadeOut();
                    submit.html('Sending....'); // change submit button text
                },
                success: function(data) {
                    alert.html(data).fadeIn(); // fade in response data
                    form.trigger('reset'); // reset form
                    submit.html('Send Email'); // reset submit button text
                },
                error: function(e) {
                	console.log(e)
                }
            });
        });
    });


			// ========================== //
			// 2017 Countdown JS
			// ========================== //

			var countdown = new Date("October 17, 2019");

			function getRemainingTime(endtime) {
				var milliseconds = Date.parse(endtime) - Date.parse(new Date());
				var seconds = Math.floor(milliseconds / 1000 % 60);
				var minutes = Math.floor(milliseconds / 1000 / 60 % 60);
				var hours = Math.floor(milliseconds / (1000 * 60 * 60) % 24);
				var days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

				return {
					'total': milliseconds,
					'seconds': seconds,
					'minutes': minutes,
					'hours': hours,
					'days': days
				};
			}

			function initClock(id, endtime) {
				var counter = document.getElementById(id);
				var daysItem = counter.querySelector('.js-countdown-days');
				var hoursItem = counter.querySelector('.js-countdown-hours');
				var minutesItem = counter.querySelector('.js-countdown-minutes');
				var secondsItem = counter.querySelector('.js-countdown-seconds');

				function updateClock() {
					var time = getRemainingTime(endtime);

					daysItem.innerHTML = time.days;
					hoursItem.innerHTML = ('0' + time.hours).slice(-2);
					minutesItem.innerHTML = ('0' + time.minutes).slice(-2);
					secondsItem.innerHTML = ('0' + time.seconds).slice(-2);

					if (time.total <= 0) {
						clearInterval(timeinterval);
					}
				}

				updateClock();
				var timeinterval = setInterval(updateClock, 1000);
			}

			initClock('js-countdown', countdown); 
