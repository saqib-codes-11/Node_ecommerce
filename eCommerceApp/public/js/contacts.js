//G CONTACTS

$(function(){

	$('a.map').click(function() {
		$('.title-block.map .fade-layer, .title-block.map .title-info, .title-block.map .line ').fadeToggle(500);
		$('.title-block.map').toggleClass('expandmap');
		if( $('.title-block.map').hasClass('expandmap') ) { $('a.map').text("close map"); } else { $('a.map').text("view map"); }
	});


	markerino = "images/marker.png";
	$(".map-block").gmap3({
	  getlatlng:{
	    address:  "1 Infinite Loop Cupertino, CA 95014",
	    callback: function(results){
	      if ( !results ) return;
	      $(this).gmap3({
	        marker:{
	          	latLng:results[0].geometry.location ,
			  	options:{ animation: google.maps.Animation.BOUNCE, icon:new google.maps.MarkerImage(markerino) }
	        },
	        map:{
				options:{ 
				zoom:10,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: true,
				mapTypeControl: false,
	            panControl: false,
	            zoomControl: false,
	            scaleControl: false,
	            streetViewControl: false,
	            rotateControl: false,
	            rotateControlOptions: false,
	            overviewMapControl: false,
	            OverviewMapControlOptions: false }
			}
	      });
	    }
	  }
	});
});