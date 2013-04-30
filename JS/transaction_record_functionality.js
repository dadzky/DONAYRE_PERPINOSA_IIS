$(function(){

	displayTransactionRecords();
	displayPager();

	$('#pageLimit_form').submit(function(){
		var regextInt = /^[0-9]+$/;
		var pageLimit = parseInt($('#pageLimit').val());

		if(regextInt.test(pageLimit)){
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
displayBarGraph()
});

function displayTransactionRecords(){

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
	var sampleGraph = new Array([100,'jan','#88cc00'],[100,'feb','#88cc00'],[100,'mar','#88cc00']);
   	$('#div-graph-sales').jqBarGraph({

                       data: sampleGraph,
                        //colors:["red", "yellow", "green"],
                        width: 200,
                        height: 200,
                        barSpace:2,
                        title: "<h3>Sales</h3>",
                        prefix: "&#8369;",

    });
    /*------------------QUERY FOR MONTHLY SALES------------
			SELECT month( t.transaction_date ) , SUM( p.product_price * ti.number_of_items ) AS total
		FROM products AS p, transactions AS t, transactions_info AS ti
		WHERE p.product_id = t.product_id
		AND t.transaction_id = ti.transaction_id
		GROUP BY month( t.transaction_date )
		----------------------------------------------------*/
}