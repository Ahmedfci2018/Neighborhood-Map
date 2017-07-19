//this main function contains all about map 
function myMap() {
    var lastMarker;
    var infoMarker;
    var contString;
    var myCenter=new google.maps.LatLng(locations[0].lat,locations[0].lng);
    //get map by id 
    var myCanvas = document.getElementById("googleMap");
    //options of map 
    var mapProp= {center:myCenter , zoom:15 };
    var map=new google.maps.Map(myCanvas,mapProp);
      // array of all markers 
    var markers=[];
    //loop for add all markers to the map 
    for (var i=0;i<locations.length;i++){
    markers[i]=new google.maps.Marker({position:new google.maps.LatLng(locations[i].lat,locations[i].lng), map:map,animation:google.maps.Animation.DROP,title:locations[i].title});
        
        //create info window to dispaly information of marker 
         infoMarker=new google.maps.InfoWindow({
        content:content(locations[i].title,locations[i].streetAddress,locations[i].city) 
    });
        //event of marker listener 
    google.maps.event.addListener(markers[i],'click',function(){
                                
                                for (var n=0;n<locations.length;n++){
                                      if(this.title==locations[n].title){
                                  infoMarker.setContent(content(locations[n].title,locations[n].streetAddress,locations[n].city));
                                 
                                   this.setAnimation(google.maps.Animation.BOUNCE);
                                          //window.setTimeout(function(){markers[n].setAnimation(null);},3000);
                                  infoMarker.open(map,this);
                                 
                                      }}
                                  });
    var marker;
    document.querySelector('input').oninput = function() {
        infoMarker.close();
        for (var j=0;j<locations.length;j++){
            if(this.value==locations[j].title){
       
               getContent = function() {
		
		var urlAPI = 'https://api.foursquare.com/v2/venues/4cdd6918d4ecb1f701298548/tips?sort=recent&limit=5&v=20150609&client_id=4EPS21I4V4MVCYXWDT4QNZZG1JETWZ2LIJMYQ34FNBWZ1RMV&client_secret=U3P1XLU204VMYO4BHGIWPDOY130Z1AFTT1OQTI2TY0HW0T43';
                  var topTips = [];

		$.getJSON(urlAPI).done(function(data) {
				$.each(data.response.tips.items, function(i, tips){
					topTips.push('<li>' + tips.text + '</li>');
				});

				infoMarker.setContent( '<h1>' + locations[j].title + '</h1>' + '<b>Street Adress : </b>' +locations[j].streetAddress+'<br> <b>City : </b>'+locations[j].city+'<br> <h2>More Descriptions about this location </h2> <b> <ol class="tips">' + topTips.join('') + '</ol>');
			}).fail(function(jqXHR, textStatus, errorThrown) {
				infoMarker.setContent( '<h1>' + locations[j].title + '</h1>' + '<b>Street Adress : </b>' +locations[j].streetAddress+'<br> <b>City : </b>'+locations[j].city+'<br> <h2>More Descriptions about this location </h2>');				
				console.log('getJSON request failed! ' + textStatus);
			});
		}();
                
        //infoMarker.setContent(contString);
       //infoMarker.setPosition(new google.maps.LatLng(locations[j].lat,locations[j].lng));
              //  map.panTO(markers[j].getPosition());
       markers[j].setAnimation(google.maps.Animation.BOUNCE);
        this.value=" ";
marker=markers[j];
                break;
            }
        }
                           infoMarker.open(map,marker);

    
        
    
};
    }
    
    function content(title,streetAdress,city){
    
    var contentString='<h1>'+title+'</h1>'+'<b>'+streetAdress+'<br>'+city;
        return contentString;
    
    }
    
    
  
    
    
    //locations 
}
    var locations=[
        
        {
            title:"Petrol station (Abu Arab)",
            lat:28.087889,
            lng:30.756697,
            streetAddress:"Qism Minya",
            city:"Menia Governorate"
        
        },
        {
            title:"EL Menia University Hospital",
            lat:28.089977,
            lng:30.764925,
            streetAddress:"Corniche El Nil",
            city:"Menia Governorate, Egypt"
        },
        {
            title:"Menia Armed Forces Club",
            lat:28.092861,
            lng:30.771192,
            streetAddress:"sharq el nil DOWNTOWN",
            city:"Menia Governorate, Egypt"
        },
        {
            title:"Union markets",
            lat:28.098332,
            lng:30.756633,
            streetAddress:"Qism Minya",
            city:"Menia Governorate"
        },
        {
            title:"Banque Misr",
            lat:28.095147,
            lng:30.757663,
            streetAddress:"El Saah Sq. DOWNTOWN",
            city:"Menia Governorate, Egypt"
        },
        {
            title:"Atlas housing",
            lat:28.092275,
            lng:30.748458,
            streetAddress:"Badeea Elzaman",
            city:"Menia Governorate, Egypt"
        },
        {
            title:"Telecom Egypt",
            lat:28.097689,
            lng:30.754058,
            streetAddress:"Saad Zaghloul st.",
            city:"Menia Governorate, Egypt"
        },
        {
            title:"Shamal Elsaaed Television",
            lat:28.096193,
            lng:30.771976,
            streetAddress:"Sawadah",
            city:"Menia Governorate, Egypt"
        },
        {
            title:"Minia Prison",
            lat:28.082885,
            lng:30.757020,
            streetAddress:"Qism Minya",
            city:"Menia Governorate, Egypt"
        },
        {
            title:"Doctors Syndicate Towers",
            lat:28.084778,
            lng:30.766783,
            streetAddress:"Qism Minya",
            city:"Menia Governorate, Egypt"
        },
        {
            title:"El-hady For cars Trading",
            lat:28.093316,
            lng:30.757127,
            streetAddress:"Al Ezaby Rd",
            city:"Menia Governorate, Egypt"
        }
    
    
    
    ];
    
