$(function(){
	
	 searchProductForTransaction(); //To display the default products


	 /*---------PAGINATION---------*/
	 $('.pagination').on('click','li a', function(){
	 	var page = parseInt($(this).html());
		$('#currentPage').val(page-1);
		searchProductForTransaction()
	 })
	 $('.pagination').on('click','button', function(){
	 	var pager = $(this).html();
	 	var pageActive = parseInt($('#currentPage').val());
	 	if(pager === 'next'){
	 		$('#currentPage').val(pageActive + 1);
	 	}else{
	 		$('#currentPage').val(pageActive - 1);
	 	}
	 	searchProductForTransaction();
	 })

	 /*------------TRIGGER FOR SEARCHING PRODUCTS----------------*/
	 $('#search_item').keyup(function(){
	 	$('#currentPage').val(0);
	 	searchProductForTransaction();
	 })

	 /*----------Changing the color of an -tr- element in a -tbody- to identify the products that has been already selected---------*/
	 $('#products_to_transact_tbody').on('click','tr',function(){
	 	

	 	if($(this).attr('class') == "" || $(this).attr('class') == null){
			var prodId = this.id;
		 	var cell = document.getElementById(prodId).getElementsByTagName('td');
		 	var prodName = cell[0].innerHTML;
		 	var prodCost = cell[1].innerHTML;
		 	var prodUnit = cell[2].innerHTML;

			if(!checkIfExistAtShoppingList(prodName)){
				saveToShoppingList(prodId,prodName,prodCost,prodUnit,$(this));
			}else{
				$('#dialog2_div').html("It is already on your shopping list\nYou can change it's quantity by clicking edit icon");
				$('#dialog2_div').dialog({
					title:'Exist',
					modal:true
				});
			}		 	
		 	
	 	}	 	
	 })

	 /*--------------------Editing Quantity at the Shopping List--------------------*/


})
 var totalPayment = 0; //Global variable for the total payment of the products bought...

 /*-----------FUNCTION FOR SEARCHING PRODUCTS----------*/
 function searchProductForTransaction(){

 	var pageLimit = 5;
 	var toSearch = $('#search_item').val();
 	var pageActive = parseInt($('#currentPage').val());
 	var page = pageActive * pageLimit;
		
	var obj = {page:page,pageActive:pageActive, pageLimit:pageLimit, toSearch:toSearch};
	
	$.ajax({
		type:"POST",
		data: obj,
		url: "../PHP/OBJECTS/searchProductWithCost.php",
		success:function(data){
			var obj2 = JSON.parse(data);
			$('#products_to_transact_tbody').html(obj2.tbody);
			$('.pagination').html(obj2.pager);
			
			if(pageActive == 0){
				$('#pager_prev').attr('disabled','disabled');
			}if((pageActive+1) >= obj2.pagesToDisplay){
				$('#pager_next').attr('disabled','disabled');						
			}			
		},
		error:function(data){
			alert("Error on Searching products => "+ data);
		}

	})
	
}

/*-----------------Function for checking at the selected product if it is already at shopping list--------------*/
function checkIfExistAtShoppingList(prodName){
	var tbody = document.getElementById('shopping_list_tbody');
	var rows = tbody.getElementsByTagName('tr');
	var doesntExist = false;
	for(var ctr=1; ctr<rows.length;ctr++){
		var productName = rows[ctr].getElementsByTagName('td')[0].innerHTML;
		if(productName == prodName){
			doesntExist = true;
			break;
		}
		
	}
	return doesntExist;
}

/*------------------Function for saving products to shopping List--------------*/
function saveToShoppingList(prodId,prodName,prodCost,prodUnit,tblRow){
	$('#product_name_to_transact').val(prodName);
	$('#product_cost_to_transact').val(prodCost+"/"+prodUnit);
	$('.add-on').html(prodUnit);
	var regexInt = /^[0-9]+$/;
	if(prodId != "" || prodId != null){
		$('#dialog_div').dialog({
				resizable:false,
				show: 'blind',
				hide:'blind',
				modal:true,
				title: "Quantity",
			    buttons: {
			    	"Proceed": function(){
			    		if(regexInt.test($('#product_quantity').val())){
			    			displayToShoppingList(prodId,prodName,prodCost,prodUnit,$('#product_quantity').val());
			    			$('#quantity_div').removeClass('control-group error');
			    			$(tblRow).css({'text-decoration':'line-through'});
			    			$(this).dialog('close');
			    		}else{
			    			$('#quantity_div').addClass('control-group error');
			    		}	    		
						
			    	},
			    	"Cancel": function(){
			    		$(this).dialog('close');
			    	}

			    }
			     
			})
	}
}

function displayToShoppingList(prodId,prodName,prodCost,prodUnit,productQuantity){
	var id = prodId.substring(19);
	var subTotal = parseInt(prodCost)*parseInt(productQuantity);
	totalPayment += subTotal;
	var newId = "tr_to_transact_"+id;
	
	var tbody = "<tr  id='"+newId+"'>"+
				"<td>"+prodName+"</td>"+
				"<td>"+prodCost+"/"+prodUnit+"</td>"+
				"<td>"+productQuantity+"<img src='../CSS/img_tbls/editShoppingList.png' id =edit_quantity_img alt = edit quanity title=edit quantity/></td>"+
				"<td>&#8369; "+subTotal+".00</td>"+
				"</tr>";
	var tfoot = "<tr>"+
				"<td colspan='4'>Total</td>"+
				"<td>&#8369; "+totalPayment+".00</td>"+
				"</tr>";
	
	var tbody = $('#shopping_list_tbody').append(tbody);
	var tfoot = $('#shopping_list_total_tfoot').html(tfoot);
	$('#shopping_list_table').show('blind',1000);
}


