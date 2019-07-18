$(function() {
  $(window).scroll(function() {
    var top = $(window).scrollTop();
    console.log(top);

    if (top > 0) {
      $("#header").addClass("inverted");
    } else {
      $("#header").removeClass("inverted");
    }
  });

  $(window).trigger("scroll");
  var dFrom = $("#from").datepicker({
      minDate: 0,
      onSelect:function(){
        dTo.datepicker('option','minDate', dFrom.datepicker('getDate'));
    }
  });
  dFrom.datepicker('setDate',new Date());


  var dTo = $("#to").datepicker({
      minDate: 0,

  });
  dTo.datepicker('setDate',4);


  $('#form-search').submit(function(e){
      e.preventDefault();

      var from = $('#from').val();
      var to = $('#to').val();


      search(from,to);
  });

});


function search(from, to){
    var url = 'http://javascript-basic.appspot.com/searchLocation';
    console.log(url);
    
    $.getJSON(url, {
        from: from,
        to:to
    },function(r){
        var $list = $('#list-panel');
		
		for (var i=0; i<r.length; i++) {
			var data = r[i];
			var $item = createListItem(data);
			$list.append($item);
		}
		$('#list-bg').show();
        
    });
}

function createListItem(data) {
	var $tmpl = $('#list-item-template').clone().removeAttr('id');
	
	$tmpl.find('.list-item-image').attr('src', data.titleImageUrl);
	$tmpl.find('.list-item-name').html(data.name);
	$tmpl.find('.list-item-city-name').html(data.cityName);
	
	$tmpl.click(function(e){
		var url = 'detail.html?id=' + data.id;
		
		window.location = url;
	});
	
	return $tmpl;
}