$(function(){

	displayTransactionRecords();
	displayPager();
	displayBarGraph();

	$('#pageLimit_form').submit(function(){
		var regextInt = /^[0-9]+$/;
		var pageLimit = parseInt($('#pageLimit').val());

		if(regextInt.test(pageLimit) && pageLimit > 0){
			$('#currentPage').val(0)
			displayTransactionRecords();
			displayPager();
			$(this).css('color','#000');
		}else{
			$(this).css('color', '#f00');		
		}
		
		return false;
	})

	/*----paganation-----*/
	$('.pagination').on('click','li a',function(){
		$('.pagination li').removeClass('active');
		var page = parseInt($(this).html());
		var parentLI=$(this).context.parentNode;

		if(page!=0){
			$('#currentPage').val(page-1);
			$('.page_number').html(page);
			$(parentLI).addClass('active');

		}

		displayTransactionRecords();
	})

	$('.pagination').on('click','button',function(){
		var pageBtn = $(this).text();
		var currentPage = parseInt($('#currentPage').val());
		var maxPage = parseInt($('.pagination li a:last').html())-1;
		var pageActive = $('.pagination .active');
		if(pageBtn == "next" && currentPage < maxPage ){
			$('#currentPage').val(currentPage+1);
			pageActive.next().addClass('active');
			pageActive.removeClass('active');
			$('.page_number').html(currentPage+2);
		}else if(pageBtn == "prev" && currentPage > 0){
			$('#currentPage').val(currentPage-1);
			pageActive.prev('li').addClass('active');
			pageActive.removeClass('active');	
			$('.page_number').html(currentPage);	
		}

		displayTransactionRecords();
	});
	$('#graph-toggle-div').click(function(){		
		$('#graph-sales-container-div').slideToggle(1000)		
	});

});

function displayTransactionRecords(){
	$('#loading_img').show();
	console.log('pasok')
	var pageLimit = parseInt($('#pageLimit').val());
	var currentPage = parseInt($('#currentPage').val());
	currentPage = currentPage*pageLimit;
	var obj = {currentPage:currentPage,pageLimit:pageLimit};
		$.ajax({
			type:"POST",
			url:"../PHP/OBJECTS/TRANSACTION_RECORD/displayTransactionRecords.php",
			data:obj,
			success:function(data){
				$('#transaction_record_tbody').html(data);
			},
			error:function(data){
				alert("Error on displaying transaction records => "+ data['status']+ " "+ data['statusText']);
			},
			complete:function(){
				$('#loading_img').hide();
			}
		})	
}

function displayPager(){
	var pageLimit = parseInt($('#pageLimit').val());
	var toSearch = $('#search_record').val();
	var currentPage = parseInt($('#currentPage').val())+1;
	var obj = {pageLimit:pageLimit,toSearch:toSearch};

	$.ajax({
		type: 'POST',
		url: '../PHP/OBJECTS/TRANSACTION_RECORD/displayPager.php',
		data: obj,
		success:function(data){
			var pagerContent = JSON.parse(data);
			$('.pagination').html(pagerContent.pager);
			$('.max_page').html(pagerContent.n_pages);
			$('.page_number').html(currentPage);
			
		},
		error:function(data){
			alert("Error on displaying pager => "+ data['status'] + " " + data['statusText']);
		}
	})
}

function displayBarGraph(){
	var monthNames = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
	var monthlySales = new Array();

    $.ajax({
    	type:'POST',
    	url:'../PHP/OBJECTS/TRANSACTION_RECORD/getMonthlySales.php',
    	success:function(data){
    		var obj = JSON.parse(data);
    		var month = "";
    		for(var ctr=0; ctr<obj.length; ctr++){
    			var monthlySalesContent = new Array();
    			month = monthNames[obj[ctr][0]-1];
    			monthlySalesContent.push(obj[ctr][1]);
    			monthlySalesContent.push(month);
    			if(obj[ctr][1] > 100000){
    				monthlySalesContent.push("#0044cc");
    			}else if(obj[ctr][1] > 50000){
    				monthlySalesContent.push("#0088cc");
    			}else{
    				monthlySalesContent.push("#c4e3f3");
    			}
    			monthlySales.push(monthlySalesContent);
    		}
    		$('#graph-sales-div').jqBarGraph({
		        data: monthlySales,
		        width: 	700,
		        height: 200,
		        colors: ["#0044cc","#0088cc","#c4e3f3"],
		        barSpace:2,
		        title: "<h3>Monthly Income</h3>",
		        prefix: "&#8369; ",
		        legend:true,
		        legends:["high","average","low"]
		    });
    		
    	},
    	error:function(data){
    		alert('Error on displaying bargraph => '+ data['status'] + " " + data['statusText']);
    	}
    })
}