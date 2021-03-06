$(function(){
	displayTransactionRecords();
	displayPager();
    displayBarGraph();

    /*--------------FOR SEARCHING TRANSACTION RECORD------------*/
    $('#searchBy_ul li a').click(function(){
        $('#searchBy_btn').html($(this).html()+"<span class='caret'></span>");
        $('#searchBy_input').val($(this).find('input').val());
        var toSearch = $('#search_record').val();
        var searchBy = $(this).find('input').val();
        $('#searchBy_ul').hide();
        searchRecords(toSearch,searchBy);
        displayPager();

    })
    $(this).click(function(){
        $('#searchBy_ul').hide();
    })
    $('#searchBy_btn').click(function(){
        $('#searchBy_ul').toggle();
    });


	$('#pageLimit_form').submit(function(){
        var toSearch = $('#search_record').val();
        var searchBy = $('#searchBy_input').val();
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
        $('.page_number').html(1);
		return false;
	})

    /*---search---*/
    $('#search_record').keyup(function(){
        var toSearch = $('#search_record').val();
        var searchBy = $('#searchBy_input').val();
        searchRecords(toSearch,searchBy);
        displayPager();
    });

	/*----pagination-----*/
	$('.pagination').on('click','li a',function(){

		$('.pagination li').removeClass('active');
        var pageOnTracked = 0; //used in paganation
        var toSearch = $('#search_record').val();
        var searchBy = $('#searchBy_input').val();
        var maxPage = parseInt($('.max_page').html());
        var liParent = $(this.parentNode);
        var pageNum = liParent.index()+1;
        var limit=0;
        var current_page = $(this).html();
        $("#currentPage").val(current_page - 1);
        if(maxPage > 6){

            if((pageNum == 6 || pageNum == 7) && current_page < maxPage){
                limit = parseInt(current_page)+5;
                if(limit >= maxPage){
                    pageOnTracked = maxPage-6;
                }else{
                    pageOnTracked = parseInt(current_page) - 1;
                }
                displayListPager(pageOnTracked);
            }else if(pageNum == 1 || pageNum == 2){
                limit = parseInt(current_page)-5;
                if(limit > 0){
                    pageOnTracked = current_page - 5;
                }else{
                    pageOnTracked = 1;
                }
                displayListPager(pageOnTracked);
            }

            $('#page_'+current_page).toggleClass('active');
        }else{
            liParent.toggleClass("active");
        }
        if(toSearch == ""){
            displayTransactionRecords();
        }else{
            searchRecords(toSearch,searchBy);
        }

        $('.page_number').html(current_page);
	})

	$('.pagination').on('click','button',function(){
        var searchBy = $('#searchBy_input').val();
        var toSearch = $('#search_record').val();
		var pageBtn = $(this).text();
		var currentPage = parseInt($('#currentPage').val());
		var maxPage = parseInt($('.pagination li a:last').html())-1;
        var firstPageOnlist = parseInt($('.pagination li a:first').html());
		var pageActive = $('.pagination .active');
        var activeLi = 0;
		if(pageBtn == "next" && currentPage < maxPage ){
            activeLi = currentPage+2;
            if(pageActive.index() == 5 && activeLi+1 <= 9){
                displayListPager(firstPageOnlist+1);
            }
            $('#currentPage').val(currentPage+1);
            pageActive.removeClass('active');
            $('#page_'+activeLi).toggleClass('active');
            $('.page_number').html(currentPage+2);
		}else if(pageBtn == "prev" && currentPage > 0){
            if(pageActive.index() == 1 && currentPage > 1){
                displayListPager(firstPageOnlist-1);
            }
			$('#currentPage').val(currentPage-1);
            pageActive.removeClass('active');
            $('#page_'+currentPage).toggleClass('active');
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
        displayBarGraph();
	}).tooltip('hide');

});

function searchRecords(toSearch,searchBy){
    var pageLimit = parseInt($('#pageLimit').val());
    var currentPage = parseInt($('#currentPage').val());
    currentPage = currentPage*pageLimit;
    console.log(toSearch);
    var obj = {currentPage:currentPage,pageLimit:pageLimit, toSearch:toSearch, searchBy:searchBy};
        $.ajax({
            type:"POST",
            url:"../PHP/OBJECTS/TRANSACTION_RECORD/searchTransactionRecords.php",
            data:obj,
            beforeSend:function(){
                $('#loading_div').show();
            },  
            success:function(data){;
                $('#transaction_record_tbody').html(data);
            },
            error:function(data){
                alert("Error on searching transaction records => "+ data['status']+ " "+ data['statusText']);
            },
            complete:function(){
                $('#loading_div').hide();
            }
        })
}

function displayTransactionRecords(){
	var pageLimit = parseInt($('#pageLimit').val());
	var currentPage = parseInt($('#currentPage').val());
	currentPage = currentPage*pageLimit;
	var obj = {currentPage:currentPage,pageLimit:pageLimit};
		$.ajax({
			type:"POST",
			url:"../PHP/OBJECTS/TRANSACTION_RECORD/displayTransactionRecords.php",
			data:obj,
            beforeSend:function(){
                $('#loading_div').show();
            },  
			success:function(data){
				$('#transaction_record_tbody').html(data);
			},
			error:function(data){
				alert("Error on displaying transaction records => "+ data['status']+ " "+ data['statusText']);
			},
			complete:function(){
                $('#loading_div').hide();
			}
		})	
}

function displayPager(){
    var toSearch = $('#search_record').val();
    var searchBy = $('#searchBy_input').val();
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
            if(pagerContent.n_pages == 0){
                currentPage = 0;
            }
			$('.max_page').html(pagerContent.n_pages);
			
		},
		error:function(data){
			alert("Error on displaying pager => "+ data['status'] + " " + data['statusText']);
		}
	})
}

function displayListPager(pageOnTracked){
    var newPagerLi = "";
    var newPagerAll = "";
    for(var ctr=1; ctr<=7; ctr++){
        newPagerLi += "<li id=page_"+pageOnTracked+"><a href = 'Javascript:void(0)'>"+pageOnTracked+"</a></li>";
        pageOnTracked++;
    }
    newPagerAll += "<button class='btn-primary' id='pager_prev'>prev</button>";
    newPagerAll += "<ul>";
    newPagerAll +=    newPagerLi;
    newPagerAll += "</ul>";
    newPagerAll += "<button class='btn-primary' id='pager_next'>next</button>";

    $(".pagination").html(newPagerAll);
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
        $('#bargraph_title_p').html("<h2><img src='../CSS/images/monthlyIncomeTitle.png' alt='Monthly Income' /></h2><hr/><h4>YEAR: <select id='bargraph_Yr_option' onchange='displayBarGraph()'>"+ selectOptions +"</select></h4><hr/>");
    }
    $('#bargraph_Yr_option').val(yearSelected);

	var monthNames = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
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
                    monthlySalesContent.push(parseFloat(obj[ctr][1]).toFixed(2));
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
                    legends:["[1000+]","[500+]","[499 below]"]
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