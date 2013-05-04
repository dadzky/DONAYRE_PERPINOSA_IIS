$(function(){

	displayTransactionRecords();
	displayPager();
    displayBarGraph();

	$('#pageLimit_form').submit(function(){
        var toSearch = $('#search_record').val();
        var searchBy = $('#searchBy_select').val();
        if(searchBy=="employee" && searchBy != ""){
            searchBy = $('#searchByName_select').val();
        }
		var regextInt = /^[0-9]+$/;
		var pageLimit = parseInt($('#pageLimit').val());

		if(regextInt.test(pageLimit) && pageLimit > 0){
			$('#currentPage').val(0)
            if(toSearch == ""){
                displayTransactionRecords();
            }else{
                searchRecords(toSearch,searchBy)
            }
            displayPager();
			$(this).css('color','#000');
		}else{
			$(this).css('color', '#f00');		
		}
		
		return false;
	})

    /*---search---*/
    $('#search_record').keyup(function(){
        var toSearch = $('#search_record').val();
        var searchBy = $('#searchBy_select').val();
        if(searchBy=="employee"){
            searchBy = $('#searchByName_select').val();
        }
        searchRecords(toSearch,searchBy);
        displayPager();
    });

    $('#searchBy_select').change(function(){
        var toSearch = $('#search_record').val();
        var searchBy = $('#searchBy_select').val();
        if(searchBy=="employee" && searchBy != ""){
            searchBy = $('#searchByName_select').val();
        }
        if($(this).val() == 'employee'){
            $('#searchByName_select').show();
        }else {
            $('#searchByName_select').hide();
        }
        searchRecords(toSearch,searchBy);
    });

    $('#searchByName_select').change(function(){
        var toSearch = $('#search_record').val();
        var searchBy = $('#searchBy_select').val();
        if(searchBy=="employee" && searchBy != ""){
            searchBy = $('#searchByName_select').val();
        }
        searchRecords(toSearch,searchBy);
        displayPager();
    });

	/*----paganation-----*/
	$('.pagination').on('click','li a',function(){
        var searchBy = $('#searchBy_select').val();
        if(searchBy=="employee" && searchBy != ""){
            searchBy = $('#searchByName_select').val();
        }
		$('.pagination li').removeClass('active');
		var page = parseInt($(this).html());
		var parentLI=$(this).context.parentNode;
        var toSearch = $('#search_record').val();

		if(page!=0){
			$('#currentPage').val(page-1);
			$('.page_number').html(page);
			$(parentLI).addClass('active');

		}
        if(toSearch == ""){
		    displayTransactionRecords();
        }else{
            searchRecords(toSearch,searchBy);
        }
	})

	$('.pagination').on('click','button',function(){
        var searchBy = $('#searchBy_select').val();
        if(searchBy=="employee" && searchBy != ""){
            searchBy = $('#searchByName_select').val();
        }
        var toSearch = $('#search_record').val();
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

        if(toSearch == ""){
            displayTransactionRecords();
        }else{
            searchRecords(toSearch,searchBy);
        }
	});

	$('#graph-toggle-div').click(function(){
		$('#graph-sales-container-div').slideToggle(1000)
	});

    $('#bargraph_Yr_option').on('change',function(){
        displayBarGraph();
    })

});

function searchRecords(toSearch,searchBy){
    $('#loading_img').show();
    var pageLimit = parseInt($('#pageLimit').val());
    var currentPage = parseInt($('#currentPage').val());
    currentPage = currentPage*pageLimit;
    var obj = {currentPage:currentPage,pageLimit:pageLimit, toSearch:toSearch, searchBy:searchBy};
        $.ajax({
            type:"POST",
            url:"../PHP/OBJECTS/TRANSACTION_RECORD/searchTransactionRecords.php",
            data:obj,
            success:function(data){;
                $('#transaction_record_tbody').html(data);
            },
            error:function(data){
                alert("Error on searching transaction records => "+ data['status']+ " "+ data['statusText']);
            },
            complete:function(){
                $('#loading_img').hide();
            }
        })
}

function displayTransactionRecords(){
	$('#loading_img').show();
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
    var toSearch = $('#search_record').val();
    var searchBy = $('#searchBy_select').val();
    if(searchBy=="employee" && searchBy != ""){
        searchBy = $('#searchByName_select').val();
    }
	var pageLimit = parseInt($('#pageLimit').val());
	var currentPage = parseInt($('#currentPage').val())+1;
	var obj = {pageLimit:pageLimit, toSearch:toSearch, searchBy:searchBy};

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
    var currentDate = new Date();
    var yearSelected = $('#bargraph_Yr_option').val();
    var selectOptions = "";

    for(var ctr=currentDate.getFullYear();ctr>=2000;ctr--){
        selectOptions += "<option value="+ ctr +">"+ ctr +"</option>";
    }
    if(yearSelected==null){
        yearSelected = currentDate.getFullYear();
        $('#bargraph_title_p').html("<h2>MONTHLY INCOME</h2><br/><h4>YEAR: <select id='bargraph_Yr_option'>"+ selectOptions +"</select></h4>");
    }
    $('#bargraph_Yr_option').val(yearSelected);

	var monthNames = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
	var monthlySales = new Array();
    $.ajax({
    	type:'POST',
        data: {yearSelected:yearSelected},
    	url:'../PHP/OBJECTS/TRANSACTION_RECORD/getMonthlySales.php',
    	success:function(data){

            if(data){ //if it returns an array of values
                var obj = JSON.parse(data);
                var month = "";
                for(var ctr=0; ctr<obj.length; ctr++){
                    var monthlySalesContent = new Array();
                    month = monthNames[obj[ctr][0]-1];
                    monthlySalesContent.push(obj[ctr][1]);
                    monthlySalesContent.push(month);
                    if(obj[ctr][1] > 1000){
                        monthlySalesContent.push("#f00");
                    }else if(obj[ctr][1] > 500){
                        monthlySalesContent.push("#ff0");
                    }else{
                        monthlySalesContent.push("#006400");
                    }
                    monthlySales.push(monthlySalesContent);
                };

                $('#graph-sales-div').html("");
                $('#graph-sales-div').jqBarGraph({
                    data: monthlySales,
                    width: 	700,
                    height: 200,
                    colors: ["#f00","#ff0","#006400"],
                    barSpace:2,
                    prefix: "&#8369; ",
                    legend:true,
                    legends:["high","average","low"]
               });

            }else{
                $('#graph-sales-div').html("<h2>NO RECORDS</h2>");
            }
    		
    	},
    	error:function(data){
    		alert('Error on displaying bargraph => '+ data['status'] + " " + data['statusText']);
    	}
    })
}