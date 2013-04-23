$(function(){

	 searchProductForTransaction();

	 $('.pagination').on('click','li a', function(){
	 	var page = parseInt($(this).html());
		$('#currentPage').val(page-1);
		searchProductForTransaction()
	 })
	 $('.pagination').on('click','li img', function(){
	 	var page = parseInt($(this).html());
		$('#currentPage').val(page-1);
		alert('wew')
	 })

})

 function searchProductForTransaction(){

 	var pageLimit = 5;
 	var toSearch = $('#search_item').val();
 	var pageActive = $('#currentPage').val();
 	var page = parseInt(pageActive) * parseInt(pageLimit);
		
	var obj = {page:page,pageActive:pageActive, pageLimit:pageLimit, toSearch:toSearch};
	
	$.ajax({
		type:"POST",
		data: obj,
		url: "../PHP/OBJECTS/searchProductWithCost.php",
		success:function(data){
			//alert(data);
			var obj2 = JSON.parse(data);
			$('#products_to_transact_tbody').html(obj2.tbody);
			$('.pagination').html(obj2.pager);

		},
		error:function(data){
			alert("Error on Searching products => "+ data);
		}

	})
	
}


