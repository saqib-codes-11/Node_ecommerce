//G SKIN

function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;   
}

function changeCol1() {
	rgba = "rgba("+hexToRgb(hex).r+","+hexToRgb(hex).g+","+hexToRgb(hex).b+",0.4)";
    colourswitch = '<div class="colorstyle1"><style>.col1,.col1h:hover,.col1a::after,.col1b::before{background:'+hex+' !important;}.col1-text,.col1h-text:hover,.col1a-text::after,.col1b-text::before{color:'+hex+' !important;}.col1-border,.col1h-border:hover,.col1a-border::after,.col1b-border::before{border-color:'+hex+' !important;}.col1-alpha{background:'+rgba+' !important;}</style></div>';
    $("body").append(colourswitch);
}

function changeCol2() {
	rgba = "rgba("+hexToRgb(hex).r+","+hexToRgb(hex).g+","+hexToRgb(hex).b+",0.4)";
    colourswitch = '<div class="colorstyle2"><style>.col2,.col2h:hover,.col2a::after,col2b::before{background:'+hex+' !important;}.col2-text,.col2h-text:hover,.col2a-text::after,.col2b-text::before{color:'+hex+' !important;}.col2-border,.col2h-border:hover,.col2a-border::after,.col2b-border::before{border-color:'+hex+' !important;}.col2-alpha{background:'+rgba+' !important;}</style></div>';
    $("body").append(colourswitch);
}

function changeCol3() {
	rgba = "rgba("+hexToRgb(hex).r+","+hexToRgb(hex).g+","+hexToRgb(hex).b+",0.4)";
    colourswitch = '<div class="colorstyle3"><style>.col3,.col3h:hover,.col3a::after,col3b::before{background:'+hex+' !important;}.col3-text,.col3h-text:hover,.col3a-text::after,.col3b-text::before{color:'+hex+' !important;}.col3-border,.col3h-border:hover,.col3a-border::after,.col3b-border::before{border-color:'+hex+' !important;}.col3-alpha{background:'+rgba+' !important;}</style></div>';
    $("body").append(colourswitch);
}


$(function () {
	$("body").append('<div class="editor-panel"><input type="checkbox" id="onoffswitch" checked><label class="onoffswitch-label" for="onoffswitch"><div class="onoffswitch-inner"></div><div class="onoffswitch-switch col1 col1-border"></div></label><input type="checkbox" id="onofflayout" checked><label class="onofflayout-label" for="onofflayout"><div class="onofflayout-inner"></div><div class="onofflayout-switch col1 col1-border"></div></label><div class="colors"><div class="gcolor1 input-append color bscp colorswitch" data-color="#E76D66" data-color-format="hex" id="color1switch"><input type="text" value="#E76D66" readonly ><span class="add-on"><i style="background-color: #E76D66">1</i></span></div><div class="gcolor2 input-append color bscp colorswitch" data-color="#A0BC8D" data-color-format="hex" id="color2switch"><input type="text" value="#A0BC8D" readonly ><span class="add-on"><i style="background-color: #A0BC8D">2</i></span></div><div class="gcolor3 input-append color bscp colorswitch" data-color="#579AAA" data-color-format="hex" id="color3switch"><input type="text" value="#579AAA" readonly ><span class="add-on"><i style="background-color: #579AAA">3</i></span></div></div><div class="resetcolor"><i class="icons">&#10227;</i>Reset</div><div class="closepanel"><i class="icons">&#10060;</i></div></div>');
	
	Gwidebody = $.cookie("Gwidebody"); 
	Gdarkskin = $.cookie("Gdarkskin");
	Gcolor1 = $.cookie("Gcolor1");
	Gcolor2 = $.cookie("Gcolor2");
	Gcolor3 = $.cookie("Gcolor3");
	Gclosepanel = $.cookie("Gclosepanel");
	
	if(Gwidebody) {
		$("body").addClass('widebody');
		$('#onofflayout').attr('checked', false);
		if( $("body").hasClass("home") ) { window.location = 'wide-home.html'; }
	} else if ( $("body").hasClass("widebody") ) {
		//if custom wide home page
		$('#onofflayout').attr('checked', false);
	}
	
	if(Gdarkskin) {
		if (!( $("body").hasClass("custompage") ) ) {
			$('link[href="css/g-light.css"]').remove();
			$("head").append('<link rel="stylesheet" type="text/css" href="css/g-dark.css" />');
			$('#onoffswitch').attr('checked', false);
		}
	}
	
	if(Gcolor1) {
		hex=Gcolor1;
		changeCol1();
		$(".gcolor1").attr( "data-color", hex );
		$(".gcolor1 input").attr( "value", hex );
		$(".gcolor1 i").css( "background-color", hex );
	}

	if(Gcolor2) {
		hex=Gcolor2;
		changeCol2();
		$(".gcolor2").attr( "data-color", hex );
		$(".gcolor2 input").attr( "value", hex );
		$(".gcolor2 i").css( "background-color", hex );
	}

	if(Gcolor3) {
		hex=Gcolor3;
		changeCol3();
		$(".gcolor3").attr( "data-color", hex );
		$(".gcolor3 input").attr( "value", hex );
		$(".gcolor3 i").css( "background-color", hex );
	}
	
	$(".closepanel").click(function() {
        if($(".closepanel").hasClass("closed")) {
        	$(".closepanel").animate({ right: '-5px'}, 200, 'swing', function() {
		        $(".closepanel").removeClass('closed').html('<i class="icons">&#10060;</i>');
		        $('.editor-panel').animate({ left: '0px'}, 500, 'swing');
		        $.removeCookie("Gclosepanel");
	        });
        } else {
	        $('.editor-panel').animate({ left: '-90px'}, 500, 'swing', function() {
		        $(".closepanel").addClass('closed').html('<i class="icons">&#59230;</i>').animate({ right: '-23px'}, 200, 'swing');
		        $.cookie("Gclosepanel", 1);
	        });
        }
	});

	if(Gclosepanel) {
		$(".closepanel").click();
	}
	
	if ( $("body").hasClass("custompage") ) {
		$(".onoffswitch-label").hide();
	}
	
	$("div.onofffade").delay(100).fadeOut(500);
	
});

$(document).ready(function() {
	
	// reset
	$(".resetcolor").click(function() {
        $('#color1switch').colorpicker('setValue', '#E76D66');
        $('#color2switch').colorpicker('setValue', '#A0BC8D');
        $('#color3switch').colorpicker('setValue', '#579AAA');
        if(!($('#onoffswitch').is(':checked'))) { $('#onoffswitch').click(); };
        if(!($('#onofflayout').is(':checked'))) { $('#onofflayout').click(); };
		$.removeCookie("Gwidebody"); 
		$.removeCookie("Gdarkskin");
        $.removeCookie("Gcolor1");
        $.removeCookie("Gcolor2");
        $.removeCookie("Gcolor3");
	});
		
	//theme switch
	$('#onoffswitch').change(function() {
	    $("body").append('<div class="onofffade"></div>');
	    if($(this).is(':checked')) {
		    $(".logo div.animated").addClass('wobble');
		    $("div.onofffade").fadeIn(500, function() {
		    	$('link[href="css/g-dark.css"]').remove();
		        $("head").append('<link rel="stylesheet" type="text/css" href="css/g-light.css" />');
		        $.removeCookie("Gdarkskin");
		        $("div.onofffade").fadeOut(500, function() { 
		        	$("div.onofffade").remove();
		        	$(".logo div.animated").removeClass('wobble');
		        });
		    });
	    } else {
		    $(".logo div.animated").addClass('wobble');
		    $("div.onofffade").fadeIn(500, function() {
		    	$('link[href="css/g-light.css"]').remove();
		        $("head").append('<link rel="stylesheet" type="text/css" href="css/g-dark.css" />');
		        $.cookie("Gdarkskin", 1);
		        $("div.onofffade").fadeOut(500, function() { 
		        	$("div.onofffade").remove();
		        	$(".logo div.animated").removeClass('wobble');
		        });
		    });
	    }
	});
	
	//wide-fixed switch
	$('#onofflayout').change(function() {
	    $("body").append('<div class="onofffade"></div>');
	    if($(this).is(':checked')) {
		    $(".logo div.animated").addClass('wobble');
		    $("div.onofffade").fadeIn(500, function() {
				$("body").removeClass('widebody');
				$.removeCookie("Gwidebody");
				if( $("body").hasClass("wideslider") ) { window.location = 'index.html'; }
		        $("div.onofffade").fadeOut(500, function() { 
		        	$("div.onofffade").remove();
		        	$(".logo div.animated").removeClass('wobble');
		        });
		    });
	    } else {
		    $(".logo div.animated").addClass('wobble');
		    $("div.onofffade").fadeIn(500, function() {
				$("body").addClass('widebody');
				if( $("body").hasClass("home") ) { window.location = 'wide-home.html'; }
				$.cookie("Gwidebody", 1);
		        $("div.onofffade").fadeOut(500, function() { 
		        	$("div.onofffade").remove();
		        	$(".logo div.animated").removeClass('wobble');
		        });
		    });
	    }
	});
	
	//colors
	$('#color1switch').colorpicker({ format: 'hex' }).on('changeColor', function(ev) {
        $('.colorstyle1').remove();
        hex = ev.color.toHex();
        changeCol1();
        $.cookie("Gcolor1", hex);
    });
    $('#color2switch').colorpicker({ format: 'hex' }).on('changeColor', function(ev) {
        $('.colorstyle2').remove();
        hex = ev.color.toHex();
        changeCol2();
        $.cookie("Gcolor2", hex);
    });
    $('#color3switch').colorpicker({ format: 'hex' }).on('changeColor', function(ev) {
        $('.colorstyle3').remove();
        hex = ev.color.toHex();
        changeCol3();
        $.cookie("Gcolor3", hex);
    });	

});

