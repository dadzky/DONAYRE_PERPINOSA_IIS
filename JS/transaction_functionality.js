$(function(){
	
	 searchProductForTransaction(); //To display the default products

	 /*---------PAGINATION---------*/
	 $('.pagination').on('click','li a', function(){
	 	var page = parseInt($(this).html());
		$('#currentPage').val(page-1);
		//alert(page);
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
				$('#dialog2_div').html("It is already on your shopping list\nYou can change its quantity by clicking edit icon");
				$('#dialog2_div').dialog({
					title:'Exist',
					modal:true,
					buttons: false
				});
			}		 	
		 	
	 	}	 	
	 })

	 /*--------------------Editing Quantity at the Shopping List--------------------*/
	 $('#shopping_list_tbody').on('click','td img',function(){

	 	var row_id = $(this).context.parentNode.parentNode.id;
	 	var cell_id = document.getElementById(row_id).getElementsByTagName('td')[2];
	 	var quantity =cell_id.getElementsByTagName('span')[0].innerHTML;
	 	$(cell_id).html("<input type='text' id='edited_quantity' class='input-small' value='"+quantity+"'/><input type='hidden' id='cell_id' value='"+row_id+"'>");
	 	$('#edited_quantity').focus();
	 })

	 $('#shopping_list_tbody').on('blur','input',function(){
	 	var regexInt = /^[0-9]+$/;

	 	var newQuantity = $(this).val();
	 	if(regexInt.test(newQuantity)){
	 		var row_id = $('#cell_id').val();
		 	var cell_id = document.getElementById(row_id).getElementsByTagName('td')[2];
		 	$(cell_id).html("<span>"+newQuantity +"</span>"+"<img src='../CSS/img_tbls/editShoppingList.png' class =edit_quantity_img alt = edit quanity title=edit quantity/>");
		 	var cost = parseFloat($(cell_id).prev('td').find('span').html());
		 	var subTotal = parseFloat($(cell_id).next().find('span').html());
		 	var newSubtotal = cost * parseInt(newQuantity);
		 	$(cell_id).next().find('span').html(newSubtotal);
			totalPayment = (totalPayment - subTotal)+newSubtotal;
			$('#shopping_list_total_tfoot td:last span').html(totalPayment)
			$('#edited_quantity').removeClass('error');
	 	}else{
	 		$('#edited_quantity').css({"border-color":"red", "box-shadow":"0 0 1px 2px pink", "color":"#f00"});
	 	}

		
	 })
	 /*----------------------Deleting Item on the shopping-------------*/
	 $('#shopping_list_tbody').on('click','th img',function(){
	 	var row_id = $(this).context.parentNode.parentNode.parentNode.id;
	 	$('#'+row_id).addClass('error');
	 	$('#dialog2_div').html('Delete From Shopping List');
	 	$('#dialog2_div').dialog({
			title:'Delete',
			modal:true,
			show:'blind',
			hide:'blind',
			buttons:{
				"Delete" : function(){
				 	var subTotal =  $('#'+row_id).find('td:last span').html();
				 	var newTotal = totalPayment - parseFloat(subTotal);
				 	$('#shopping_list_total_tfoot').find('td:last span').html(newTotal);
				 	$('#'+row_id).remove();
				 	$('#'+row_id).removeClass('error');
				 	$(this).dialog('close');
				},
				"Cancel" : function(){
					$(this).dialog('close');
					$('#'+row_id).removeClass('error');
				}
			},
            close: function (){
                $('#'+row_id).removeClass('error');
            }
		});



	 });

	 /*---------------------TRANSACTION OF ITEMS [saving to database]-------------------*/
	 $('#shopping_list_total_tfoot').on('click','button',function(){
		confirmationDialogForTransaction()
	 })
	 $(document).keypress(function(e){
	 	var rows = $('#shopping_list_tbody tr').length;

	 	if(e.charCode == 66 && rows > 1){
            confirmationDialogForTransaction();
	 	}
	 })

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
		url: "../PHP/OBJECTS/transaction/searchProductWithCost.php",
		success:function(data){
            //console.log(data);
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
	var subTotal = parseFloat(prodCost)*parseInt(productQuantity);
	totalPayment += subTotal; /*-global ini na totalPayment variable-*/

	var newId = "tr_to_transact_"+id;
	
	var tbody = "<tr  id='"+newId+"'>"+
				"<th><a href='#'><img src='../CSS/img_tbls/deleteShoppingList.png' class ='delete_list_img' alt = 'delete quanity' title='delete' /></a></th>"+
				"<td>"+prodName+"</td>"+
				"<td>&#8369; <span>"+prodCost+"</span> / "+prodUnit+"</td>"+
				"<td><span>"+productQuantity+"</span><img src='../CSS/img_tbls/editShoppingList.png' class =edit_quantity_img alt = edit quanity title=edit quantity/></td>"+
				"<td>&#8369; <span>"+subTotal+"</span></td>"+
				"</tr>";
	var tfoot = "<tr  class='totalpayment_tr'>"+
				"<td>Total</td>"+
				"<td colspan='4'><button id='payment_btn' class='btn btn-block btn-primary' title='Shift+b for a shortcut'>PAY</button></td>"+
				"<td>&#8369; <span>"+totalPayment+"</span></td>"+
				"</tr>";
	
	var tbody = $('#shopping_list_tbody').append(tbody);
	var tfoot = $('#shopping_list_total_tfoot').html(tfoot);
	$('#shopping_list_table').show('blind',1000);
}

function saveTransaction(){
    var productIDs = new Array();
    var productQuantities = new Array();
    var row = $('#shopping_list_tbody tr');

    for(var ctr=1; ctr<row.length;ctr++){
        var row_id = row[ctr].id;
        var quantity = $('#'+row_id+ " td span");
        row_id = row_id.substring(15);
        quantity = quantity[1].innerHTML;
        productIDs.push(row_id);
        productQuantities.push(quantity);
    }
    var obj = {'productIDs': productIDs, 'quantities': productQuantities};
    $.ajax({
        type:"POST",
        url: "../PHP/OBJECTS/transaction/saveTransaction.php",
        data: obj,
        success:function(data){
        	alert(data);
        	$('#shopping_list_table').hide('blind',500);
            $('#shopping_list_tbody tr').each(function( index ){
            	if(index != 0)
            	$(this).remove();
            });

            $('#products_to_transact_tbody tr').css({'text-decoration':'none'});
        },
        error:function(data){
            alert("Error on saving transaction => "+ data);
        }
    })
}

 function confirmationDialogForTransaction(){
	$('#dialog2_div').html("Everything will be recorded <br/>Do you want to continue?");
 	$('#dialog2_div').dialog({
		title:'Confirmation',
		modal:true,
		show:'blind',
		hide:'blind',
		buttons:{
			"Continue" : function(){
			 	saveTransaction();
			 	$(this).dialog('close');
			},
			"Cancel" : function(){
				$(this).dialog('close');
			}
		},
	});
 }


