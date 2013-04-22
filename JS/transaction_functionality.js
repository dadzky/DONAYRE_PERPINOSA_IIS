$(function(){

	 searchProductForTransaction();


})

 function searchProductForTransaction(){
 	var page = 0;
 	var pageLimit = $('#page_limit_select').val();
 	var toSearch = $('#search_item').val();

	$('.pagination ul li').each(function(){
		var cls = $(this).attr('class');		
		if(cls == "active"){
			page = $('li.'+cls+" a").html();
			return false;
		}
	})

	var obj = {page:page, pageLimit:pageLimit, toSearch:toSearch};

	$.ajax({
		type:"GET",
		data: obj,
		url: "../PHP/OBJECTS/searchProductWithCost.php",
		success:function(data){
			alert("data = " + data);
		},
		error:function(data){
			alert("Error on Searching products => "+ data);
		}

	})
	
}


