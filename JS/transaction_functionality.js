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
	 	if(regexInt.test(newQuantity) && newQuantity > 0){
	 		var row_id = $('#cell_id').val();
		 	var cell_id = document.getElementById(row_id).getElementsByTagName('td')[2];
		 	$(cell_id).html("<span>"+newQuantity +"</span>"+"<img src='../CSS/img_tbls/editShoppingList.png' class =edit_quantity_img alt = edit quanity title=edit quantity/>");
		 	var cost = parseFloat($(cell_id).prev('td').find('span').html());
		 	var subTotal = ($(cell_id).next().find('span').html());
            subTotal = parseFloat(subTotal.replace(/\,/g,""));
		 	var newsubTotal = (cost * parseInt(newQuantity)).toFixed(2);
            totalPayment = parseFloat(newsubTotal)+(totalPayment - subTotal);
            totalPayment = totalPayment.toFixed(2);
            newsubTotal = changeToMoneyFormat(newsubTotal.toString());
            var totalPayment2 = changeToMoneyFormat(totalPayment.toString());
		 	$(cell_id).next().find('span').html(newsubTotal);
			$('#shopping_list_total_tfoot td:last span').html(totalPayment2)
			$('#edited_quantity').removeClass('error');
            totalPayment = parseFloat(totalPayment);
	 	}else{
	 		$('#edited_quantity').css({"border-color":"red", "box-shadow":"0 0 1px 2px pink", "color":"#f00"});
	 	}

	 })
	 /*----------------------Deleting Item on the shopping-------------*/
	 $('#shopping_list_tbody').on('click','th img',function(){
	 	var row_id = $(this).context.parentNode.parentNode.parentNode.id;
        var selectedProductId = row_id.split("_");
        var productIDindex = $.inArray("tr_transact_search_"+selectedProductId[3], selectedProductIDs);
	 	$('#'+row_id).addClass('error');
	 	$('#dialog2_div').html('Remove From Product List');
	 	$('#dialog2_div').dialog({
			title:'Remove',
			modal:true,
			show:'blind',
			hide:'blind',
			buttons:{
				"Remove" : function(){
				 	var subTotal =  $('#'+row_id).find('td:last span').html();
                    subTotal = subTotal.replace(/\,/g,"");
                    subTotal =  parseFloat(subTotal);
                    subTotal = subTotal.toFixed(2);
				 	totalPayment = totalPayment - subTotal
                    totalPayment = totalPayment.toFixed(2);
				 	$('#shopping_list_total_tfoot').find('td:last span').html(changeToMoneyFormat(totalPayment));
				 	$('#'+row_id).remove();
				 	$('#'+row_id).removeClass('error');
<<<<<<< HEAD
<<<<<<< HEAD
                    selectedProductIDs.splice(productIDindex,1); // removing id from array of product IDs
=======
<<<<<<< HEAD
=======
                    selectedProductIDs.remove(row_id); // removing id from array of product IDs
>>>>>>> d80209ee098c8e5bf1254f8e71a5eb9616812aac
>>>>>>> 6a176d65a51e8deada7be80ae7477b3cbd9fa440
=======
                    selectedProductIDs.splice(productIDindex,1); // removing id from array of product IDs
>>>>>>> 0b7c69ccd9bcb8074ca49935530ca22a7a7ea1e3
				 	$('#tr_transact_search_'+row_id.substring(15)).css('text-decoration','none');
                    totalPayment = parseFloat(totalPayment); //to make totalPayment a floating point number
                    console.log("deleted => "+ totalPayment)
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
 var selectedProductIDs = new Array(); //Global array variable used to store all product id that has been already selected...

 /*-----------FUNCTION FOR SEARCHING PRODUCTS [note: i also use this function for displaying the list of products]----------*/
 function searchProductForTransaction(){
 	$('#search_item').css({'background':'url(../CSS/img_tbls/loading.gif)',
 					 'background-repeat':'no-repeat',
 					 'background-size':'100% 100%;',
 					 'background-position':'right'})
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
			var obj2 = JSON.parse(data);
			$('#products_to_transact_tbody').html(obj2.tbody);
			$('.pagination').html(obj2.pager);
			
			if(pageActive == 0){
				$('#pager_prev').attr('disabled','disabled');
			}if((pageActive+1) >= obj2.pagesToDisplay){
				$('#pager_next').attr('disabled','disabled');						
			}
            markSelectedProducts();
		},
		error:function(data){
			alert("Error on Searching products => "+ data);
		},
		complete:function(){
			$('#search_item').css({'background':'none'});

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
			    		var quantity = $('#product_quantity').val();
			    		if(regexInt.test(quantity) && quantity > 0){
			    			displayToShoppingList(prodId,prodName,prodCost,prodUnit,quantity);
			    			$('#quantity_div').removeClass('control-group error');
			    			$(tblRow).css({'text-decoration':'line-through'});
                            selectedProductIDs.push(prodId);
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
	var subTotal = (parseFloat(prodCost)*parseInt(productQuantity)).toFixed(2);
	totalPayment = totalPayment + parseFloat(subTotal); /*-global totalPayment variable to compute for the total payment-*/

    console.log(totalPayment);
    totalPayment = parseFloat(totalPayment);
    subTotal = changeToMoneyFormat(subTotal.toString());
    var totalPayment2 = changeToMoneyFormat((totalPayment.toFixed(2)).toString());

    var newId = "tr_to_transact_"+id;
	var tbody = "<tr  id='"+newId+"'>"+
				"<th><a href='Javascript:void(0)'><img src='../CSS/img_tbls/deleteShoppingList.png' class ='delete_list_img' alt = 'delete quanity' title='delete' /></a></th>"+
				"<td>"+prodName+"</td>"+
				"<td>&#8369; <span>"+prodCost+"</span> / "+prodUnit+"</td>"+
				"<td><span>"+productQuantity+"</span><img src='../CSS/img_tbls/editShoppingList.png' class =edit_quantity_img alt = edit quanity title=edit quantity/></td>"+
				"<td>&#8369; <span>"+subTotal+"</span></td>"+
				"</tr>";
	var tfoot = "<tr  class='totalpayment_tr'>"+
				"<td>Total</td>"+
				"<td colspan='4'><button id='payment_btn' class='btn btn-block btn-primary' title='Shift+b for a shortcut'>PAY</button></td>"+
				"<td>&#8369; <span>"+totalPayment2+"</span></td>"+
				"</tr>";
	
	$('#shopping_list_tbody').append(tbody);
	$('#shopping_list_total_tfoot').html(tfoot);
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
        	$('#shopping_list_table').hide('blind',500);
            $('#shopping_list_tbody tr').each(function( index ){
            	if(index != 0)
            	$(this).remove();
            });
            $('#products_to_transact_tbody tr').css({'text-decoration':'none'});
            totalPayment = 0;
            selectedProductIDs.splice(0,selectedProductIDs.length);
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
		}
	});
}

function markSelectedProducts(){

    for(var ctr=0;ctr<selectedProductIDs.length;ctr++){
        $('#'+selectedProductIDs[ctr]).css('text-decoration','line-through');
    }
}

function changeToMoneyFormat(toConvert){
    var toConvertLength = toConvert.indexOf('.');
    var floatingPoint = true;
    if(toConvertLength < 0){
        toConvertLength = toConvert.length;
        floatingPoint = false;
    }
    var floatingValue = toConvert.substring(toConvertLength+1);
    var substrBase = toConvertLength;
    var arrayNumbers = new Array();
    toConvertLength = toConvertLength/3;
    var newtoConvert = "";
    var lastNumber = "";
    if(substrBase % 1 != 0){
        substrBase = substrBase+1;
    }if(toConvertLength % 1 != 0){
        toConvertLength = toConvertLength+1;
    }
    toConvertLength = parseInt(toConvertLength);
    substrBase = parseInt(substrBase);

    for(var ctr=1;ctr<toConvertLength+1;ctr++){
        if(substrBase-(ctr*3) > 0){
            newtoConvert = toConvert.substr(substrBase-(ctr*3),3);
            lastNumber = toConvert.substr(0,substrBase-(ctr*3));
            arrayNumbers[toConvertLength-(ctr)] = newtoConvert;
        }else{
            if(lastNumber == ""){
                arrayNumbers[toConvertLength-(ctr)] = parseInt(toConvert);
            }else{
                arrayNumbers[toConvertLength-(ctr)] = lastNumber;
            }
        }
    }
    if(floatingPoint){
        toConvert = arrayNumbers.join(',')+"."+floatingValue;
    }else{
        if(arrayNumbers != null){
            toConvert = arrayNumbers.join(',');
        }
    }

    return toConvert;

}




