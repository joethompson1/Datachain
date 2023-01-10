$(".col-9").hide();
$(".col-3").hide();
$(function(){
	setTimeout(function(){
    	$("#welcome").fadeOut();
    }, 4000);
});
$(function(){
	setTimeout(function(){
    	$(".col-9").fadeIn("slow");
    	$(".col-3").fadeIn("slow");
    }, 4400);
});