//G HOME

$(document).ready(function() {
	$('.portfolio-list').magnificPopup({
		delegate: 'a.gallery',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		removalDelay: 350,
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				portlink = item.el.parent().children("figcaption").children("a").attr('href');
				return item.el.attr('title') + "<a class='col3' href='" + portlink + "'>Read more</a>";
			}
		}
	});
  	
  	$( ".portfolio-list figure").hover(
	  function() {
		$(this).children("a.gallery").children("img").animate({'top': '-90px'},300);
	  }, function() {
		$(this).children("a.gallery").children("img").animate({'top': '0px'},300);  
	  }
	);
	
});

