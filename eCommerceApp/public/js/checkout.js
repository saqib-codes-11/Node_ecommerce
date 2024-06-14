//G CHECKOUT

function total(){
	var subtotal = 0;
	var products = 0;
	var quantity = 1;
	$(".shop-list li").each(function() {
	  price = parseFloat( $(this).children(".price").children("p").text().replace(',','.') ).toFixed(2);
	  quantity = parseInt( $(this).children(".quantity").val() );
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
	$("div.totalorder strong").html( (totalorder).toFixed(2) + " €" );
	$("p.delivery strong").html( (delivery).toFixed(2) + " €" );
	$(".counter").html(products);
}
total();

$(".quantity").change(function() {
  total();
});

$(".next_step").click(function(){
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	current_fs.fadeOut(500);
	next_fs.delay(500).fadeIn(500);
});

$("#progressbar .point").click(function(){
	next_fs = $(this).attr("value");
	last_active = $("#progressbar .active:last").attr("value");
	$("#progressbar .point").each(function() {
		valuepoint = $(this).attr("value");
		if ( next_fs < valuepoint ) { $(this).removeClass("active"); } else { $(this).addClass("active"); }
	});	
	if (!(last_active==next_fs)) {
		$('#checkout fieldset:nth-child('+last_active+')').fadeOut(500);
		$('#checkout fieldset:nth-child('+next_fs+')').delay(500).fadeIn(500);
	}
});

$(".next_step").click(function(){
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	current_fs.fadeOut(500);
	next_fs.delay(500).fadeIn(500);
});

$(".shipment div.card").click(function(){
	$(".shipment div.card").removeClass("active");
	$(this).addClass("active");
});

$(".payment div.card").click(function(){
	$(".payment div.card").removeClass("active");
	$(this).addClass("active");
});

$(".previous_step").click(function(){
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	current_fs.fadeOut(500);
	previous_fs.delay(500).fadeIn(500);
});

$(".submit").click(function(){
	return false;
})

$(".remove-product").click(function(){
	current_fs = $(this).parent();
	current_fs.fadeOut(500, function(){current_fs.remove(); total();});
});