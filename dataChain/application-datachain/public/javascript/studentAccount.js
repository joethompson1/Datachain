

$(".col-9").hide();
$(".col-3").hide();
$(function(){
    $(".col-9").fadeIn("slow");
    $(".col-3").fadeIn("slow");
});

$("#certificate").hide();

$(function(){
	setTimeout(function(){
    	$("#welcome").fadeOut();
    }, 4000);
});
$(function(){
	setTimeout(function(){
    	$("#certificate").fadeIn("slow");
      $(".pageLoad").fadeIn("slow");
    }, 4400);
});





$(document).ready(function(){ 
  $("#accordionId3").click(function() {
    $("#accordionId3").fadeOut("slow",function(){
        $("#module_form3").fadeIn("slow");
    });
  });

  $("#cancelButton3").click(function() {
  	$("#module_form3").fadeOut("slow", function() {
  		$("#accordionId3").fadeIn("slow");
  	});
  });

  $(".show_module3").click(function() {
  	var contentPanelId = jQuery(this).attr("id");
    $(".module_cols3").fadeOut("slow",function(){
    	$('#' + contentPanelId + "moduleDetailsId3").fadeIn("slow");



    	$('#' + contentPanelId + "closeModule3").click(function() {
    		$('#' + contentPanelId + "moduleDetailsId3").fadeOut("slow", function() {
    			$(".module_cols3").fadeIn("slow")
    		});
    	});
    });
  });



  $("#accordionId2").click(function() {
    $("#accordionId2").fadeOut("slow",function(){
        $("#module_form2").fadeIn("slow");
    });
  });

  $("#cancelButton2").click(function() {
  	$("#module_form2").fadeOut("slow", function() {
  		$("#accordionId2").fadeIn("slow");
  	});
  });

  $(".show_module2").click(function() {
  	var contentPanelId = jQuery(this).attr("id");
    $(".module_cols2").fadeOut("slow",function(){
    	$('#' + contentPanelId + "moduleDetailsId2").fadeIn("slow");



    	$('#' + contentPanelId + "closeModule2").click(function() {
    		$('#' + contentPanelId + "moduleDetailsId2").fadeOut("slow", function() {
    			$(".module_cols2").fadeIn("slow")
    		});
    	});
    });
  });


  $("#accordionId1").click(function() {
    $("#accordionId1").fadeOut("slow",function(){
        $("#module_form").fadeIn("slow");
    });
  });

  $("#cancelButton").click(function() {
  	$("#module_form").fadeOut("slow", function() {
  		$("#accordionId1").fadeIn("slow");
  	});
  });

  $(".show_module1").click(function() {
  	var contentPanelId = jQuery(this).attr("id");
    $(".module_cols1").fadeOut("slow",function(){
    	$('#' + contentPanelId + "moduleDetailsId1").fadeIn("slow");



    	$('#' + contentPanelId + "closeModule1").click(function() {
    		$('#' + contentPanelId + "moduleDetailsId1").fadeOut("slow", function() {
    			$(".module_cols1").fadeIn("slow")
    		});
    	});
    });
  });
});









    

