// function search(from, to){
//     var url = 'http://javascript-basic.appspot.com/locationDetail';
//     console.log(url);
    
//     $.getJSON(url, {
//         from: from,
//         to:to
//     },function(r){
//         var $list = $('#list-panel');
		
// 		for (var i=0; i<r.length; i++) {
// 			var data = r[i];
// 			var $item = createListItem(data);
// 			$list.append($item);
// 		}
// 		$('#list-bg').show();
        
//     });
// }

$(function() {
   var id = parseId(window.location.search);
   console.log('id',id);
   getDetail(id);
   showMap();
  
  });

function parseId(str) {
    var s = str.substring(1);
    var args = s.split('&');


    for(var i = 0; i < args.length; i++){
        var arg = args[i];
        var token = arg.split('=');

        if(token[0] === 'id'){
            return token[1];
        }

        
    }
    return null;
}

function getDetail(id){
	var url = 'https://javascript-basic.appspot.com/locationDetail';
    console.log(url);
    
    $.getJSON(url, {
        id: id
    },function(r){
        console.log(r);
        $('.detail-header-name').html(r.name);
		$('.detail-header-city-name').html(r.cityName);
		$('.detail-desc-text').html(r.desc);
		var $gallery = $('#detail-images');
        var images = r.subImageList;
		for (var i = 0; i<images.length; i++){
			var $image = $('<img src="'+ images[i]+'"/>');
			$gallery.append($image);
        }
        Galleria.loadTheme('libs/galleria/themes/classic/galleria.classic.min.js');
        Galleria.run('#detail-images');
        showMarker(r.position.x, r.position.y);

    });
}

function showMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom : 12,
		center : {
			lat : 33.3617,
			lng : 126.5292
		}
	});
}

function showMarker(lat, lng){
	var pos = {
			lat: lat,
			lng : lng
	};
	
	new google.maps.Marker({
		position:pos,
		map:map
	});
	map.panTo(pos);
}


