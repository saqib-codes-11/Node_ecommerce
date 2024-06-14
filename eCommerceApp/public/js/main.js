//G MAIN

animlogo = "wobble";

//user agent
var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);

$(function () {
	   
    //logo anim
    $("header .logo .animated").hover(
	  function () {
		  $("header .logo .animated").addClass(animlogo);
	  },
	  function () {
		  $("header .logo .animated").removeClass(animlogo);
	  }
	);
    
    // menu dropdown
	$('.nav .dropdown').hover(function() {
	$(this).find('.drop-container').first().toggle();
	  $(this).find('.dropdown-menu').first().stop(true, true).animate( {opacity: 1, top: '35px'});
	}, function() {
	  $(this).find('.dropdown-menu').first().stop(true, true).animate( {opacity: 0, top: '5px'}, 500, function() {
	  $(this).closest('.drop-container').toggle();
	  });
	});
		    
});

$(document).ready(function() {
	if($(".block").hasClass("slider-block")) {
		// Sequence slider
	    var options = {
	        autoPlay: true,
	        pagination: true,
	        nextButton: true,
	        prevButton: true,
	        preloader: false,
	        navigationSkip: false
	    };
	    var sequence = $("#sequence").sequence(options).data("sequence");
	
	    sequence.afterLoaded = function(){
	        $(".sequence-prev, .sequence-next").fadeIn(500);
	    }
	}	

    // Todo list
    $(".todo li").click(function() {
        $(this).toggleClass("todo-done");
    });

    // Init tooltips
    $("[data-toggle=tooltip]").tooltip("show");

    // Init tags input
    $("#tagsinput").tagsInput();

    // Init jQuery UI slider
    $("#slider").slider({
        min: 1,
        max: 5,
        value: 2,
        orientation: "horizontal",
        range: "min",
    });

    // JS input/textarea placeholder
    $("input, textarea").placeholder();

    // Make pagination demo work
    $(".pagination a").click(function() {
        if (!$(this).parent().hasClass("previous") && !$(this).parent().hasClass("next")) {
            $(this).parent().siblings("li").removeClass("active");
            $(this).parent().addClass("active");
        }
    });

    $(".btn-group a").click(function() {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    });

    // Disable link click not scroll top
    $("a[href='#']").click(function() {
        return false
    });

	$('.feedback').magnificPopup({
		type: 'ajax'
	});
	
});

// Retina @2x 
Retina = function() {
    return {
        init: function(){
            //Get pixel ratio and perform retina replacement
            //Optionally, you may also check a cookie to see if the user has opted out of (or in to) retina support
            var pixelRatio = !!window.devicePixelRatio ? window.devicePixelRatio : 1;
            if (pixelRatio > 1) {
                $("img").each(function(idx, el){
                    el = $(el);
                    if (el.attr("data-src2x")) {
                        el.attr("data-src-orig", el.attr("src"));
                        el.attr("src", el.attr("data-src2x"));
                    }
                });
            }
        }
    };
}(); Retina.init();

// loader
$(window).load(function() {
      $("div.loading").delay(400).fadeOut(800, function() {  $("div.loading").remove(); })
});
