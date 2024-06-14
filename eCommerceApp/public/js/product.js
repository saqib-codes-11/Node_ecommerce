//G PRODUCT

function total(){
	var subtotal = 0;
	var products = 0;
	var quantity = 1;
	$("li.item-cart").each(function() {
	  price = parseFloat( $(this).children("div").children("strong").text().replace(',','.') ).toFixed(2);
	  quantity = parseInt( $(this).children("div").children("span").text() );
	  subtotal = parseFloat(subtotal) + ( parseFloat(price) * parseInt(quantity) );
	  products++;
	});
	taxes = (subtotal/100)*10;
	discount = (subtotal/100)*5;
	if(subtotal==0) { delivery = 0; $('.next_step').hide(); } else { delivery = 23; $('.next_step').show(); };
	totalorder = subtotal + taxes - discount + delivery;
	$("p.subtotal strong").html( (subtotal).toFixed(2) + " €");
	$("p.taxes strong").html( (taxes).toFixed(2) + " €" );
	$("p.discount strong").html( (discount).toFixed(2) + " €" );
	$("p.totalorder strong").html( (totalorder).toFixed(2) + " €" );
	$("p.delivery strong").html( (delivery).toFixed(2) + " €" );
	$(".counter").html(products);
	
	$(".remove").click(function(){
		current_fs = $(this).parent().parent();
		current_fs.fadeOut(500, function(){current_fs.remove(); total();});
	});
	
	$("a[href='#']").click(function() { return false });

}
total();

$(function(){

	$(".addcart").click(function(){
		nameitem = $(this).parent().attr('id');
		h2item = $(this).parent().children("h2").html();
		priceitem = $(this).parent().children("div.price").children("p").html();
		if ( $('.side-cart ul .item-cart').hasClass(nameitem) ) {
			nitem = parseInt($('.side-cart .'+nameitem+' span').text());
			nitem++;
			$('.side-cart ul .'+nameitem+' span').text(nitem);
		} else {
			$('.side-cart ul').append('<li class="'+nameitem+' item-cart"><h4 class="col1-text">'+h2item+'</h4><div><strong>'+priceitem+'</strong>x<span>1</span> <a href="#" class="remove">x</a></div></li>');
			$('.side-cart ul li.'+nameitem).fadeIn(500);
		}
		total();
	});
	
	$('#tabproduct a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	})

});


$(window).load(function() {
	$(".product-zoom").elevateZoom({
	    zoomType: "inner",
	    zoomWindowFadeIn: 500,
		zoomWindowFadeOut: 750,
		gallery:'product-gallery',
		cursor: 'pointer',
		galleryActiveClass: 'active',
		imageCrossfade: true
	}); 
});




