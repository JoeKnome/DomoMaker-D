"use strict";

$(document).ready(function() {

    function handleError(message) {
        $("#errorMessage").text(message);
        $("#domoMessage").animate({width:'toggle'},350);
    }
    
    function sendAjax(action, data) {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                $("#domoMessage").animate({width:'hide'},350);

                window.location = result.redirect;
            },
            error: function(xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
    
    $("#makeDomoSubmit").on("click", function(e) {
        e.preventDefault();
    
        $("#domoMessage").animate({width:'hide'},350);
    
        if($("#domoName").val() == '' || $("#domoAge").val() == '') {
            handleError("RAWR! Name and age are required");
            return false;
        }
				
		sendAjax($("#domoForm").attr("action"), $("#domoForm").serialize());
		
        return false;
    });
    
	$(".deleteDomo").on("click", function(e) {
        e.preventDefault();
    
        $("#domoMessage").animate({width:'hide'},350);
		    
		var deleteForm = e.target.parentElement;
		
		console.log($(deleteForm));
		console.log($(deleteForm).attr("action"));
		
		sendAjax($(deleteForm).attr("action"), $(deleteForm).serialize());
        
        return false;
    });
});