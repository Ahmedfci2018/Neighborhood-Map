//this main function contains all about map 
 var myMap=function() {
    var currrMarker;
    var infoMarker;
   // var contString;
    var myCenter=new google.maps.LatLng(locations[0].lat,locations[0].lng);
    //get map by id 
    var myCanvas = document.getElementById("googleMap");
    //options of map 
    var mapProp= {center:myCenter , zoom:8 };
    var map=new google.maps.Map(myCanvas,mapProp);
      // array of all markers 
    var markers=[];
    //loop for add all markers to the map 
    for (var i=0;i<locations.length;i++){
    markers[i]=new google.maps.Marker({position:new google.maps.LatLng(locations[i].lat,locations[i].lng),
                                    map:map,animation:google.maps.Animation.DROP,title:locations[i].title});
        
        //create info window to dispaly information of marker 
         infoMarker=new google.maps.InfoWindow({
    });
    
        //event of marker listener 
    google.maps.event.addListener(markers[i],'click',info);
    var marker;
        
        //handle drop down list if user select location 
    document.querySelector('input').oninput = info;
    
    }
    
    //this function used to get and format all information and show it in the infoWindow
    function info() {
        infoMarker.close();
        for (var j=0;j<locations.length;j++){
            if(this.value==locations[j].title || this.title==locations[j].title){
       
                // this function get info from foursquare API
               getContent = function() {
		
		var urlAPI = 'https://api.foursquare.com/v2/venues/'+locations[j].locID+'/tips?v=20131016&sort=recent&limit=10&client_id=FKB1CVH4USQGZG5JGCENOTGDQYJGH1BCYLDCMSSMDCGJDVYP&client_secret=B332K3I0EDXOAFFVGOSLW5PLDUYFEXUSFBHPWAE1ZDHJ05TS';
                  var topTips = [];

		$.getJSON(urlAPI).done(function(data) {
				$.each(data.response.tips.items, function(i, tips){
					topTips.push('<li>' + tips.text + '</li>');
				});

				infoMarker.setContent( '<h1>' + locations[j].title + '</h1>' + '<b>Street Adress : </b>' +locations[j].streetAddress+'<br> <b>City : </b>'+locations[j].city+'<br> <h2>The last visitor\'s comments </h2> <b> <ol class="tips">' + topTips.join('') + '</ol>');
			}).fail(function(jqXHR, textStatus, errorThrown) {
				infoMarker.setContent( '<h1>' + locations[j].title + '</h1>' + '<b>Street Adress : </b>' +locations[j].streetAddress+'<br> <b>City : </b>'+locations[j].city+'<br> <h2>The last visitor\'s comments </h2>');				
				console.log('getJSON request failed! ' + textStatus);
			});
		}();
                
        //infoMarker.setContent(contString);
       //infoMarker.setPosition(new google.maps.LatLng(locations[j].lat,locations[j].lng));
              //  map.panTO(markers[j].getPosition());
       markers[j].setAnimation(google.maps.Animation.BOUNCE);
        //this.value=" ";
marker=markers[j];
                break;
            }
        }
                                  
                           infoMarker.open(map,marker);   // show infoWindow on the marker

    
    }
    

    function content(title,streetAdress,city){
    
    var contentString='<h1>'+title+'</h1>'+'<b>'+streetAdress+'<br>'+city;
        return contentString;
    
    }
    
    
    //locations 
};
    var locations=[
        
        {
            title:"Mall of Arabia",
            lat:30.006299,
            lng:30.973481,
            streetAddress:"26th July Axis (Juhayna Sq)",
            city:"6th of October Giza",
            locID:"4d14faf2401db60cb6d6dca4"
        
        },
        {
            title:"Cairo Festival City Mall",
            lat:30.028950,
            lng:31.408608,
            streetAddress:"Ring Road | الطريق الدائري )90th Axis)",
            city:"New Cairo Muḩāfaz̧at al Qāhirah",
            locID:"5268f5d2498ee025c2cb6794"
        },
        {
            title:"Alexandria City Centre",
            lat:31.168703,
            lng:29.932259,
            streetAddress:"Alex-Cairo Desert Rd., Km 6",
            city:"Alexandria",
            locID:"4b4b88f8f964a520769f26e3"
        },
        {
            title:"Americana Plaza",
            lat:30.027503,
            lng:31.014010,
            streetAddress:"26th of July Axis (26th Of July Axis)",
            city:"Shiekh Zayed Giza",
            locID:"507d61dfe4b087a6ab444d33"
        },
        {
            title:"Pen & Paper",
            lat:31.045305,
            lng:31.361555,
            streetAddress:"El Gomhouria St",
            city:"Mansoura , Dakahlia",
            locID:"4e4039491495bf24a5fe27be"
        },
        {
            title:"Andrea",
            lat:30.8767987,
            lng:29.4290325,
            streetAddress:"North Costal Road (Tareeq Al-Sahel) (In front of Neece)",
            city:"Hammam City",
            locID:"4e220957d4c0d32590f5b18b"
        },
        {
            title:"South Park",
            lat:30.0848275,
            lng:31.6407962,
            streetAddress:"B6 st.",
            city:"Madinaty",
            locID:"54ad2016498e33b408bc63c1"
        },
        {
            title:"Tito",
            lat:30.5648799,
            lng:32.2818289,
            streetAddress:"Al Belagat Street",
            city:"Ismailia Governorate",
            locID:"4eea3d4429c220d20ec03286"
        },
        {
            title:"Brazilian Coffee Stores",
            lat:31.196044925066925,
            lng:29.897956252098083,
            streetAddress:"20 Salah Salem St. (in Front Of Alex Bank)",
            city:"Downtown ,Alexandria",
            locID:"4d0d11dceea9b60ce4495c3f"
        },
        {
            title:"Qahwa",
            lat:30.0425375,
            lng:31.4754518,
            streetAddress:"The Waterway Compund",
            city:"Az Eldin Zo Elfakar",
            locID:"56e7b9fe498e7c41a2fabf42"
        },
        {
            title:"North Coast",
            lat:30.816845,
            lng:29.056330,
            streetAddress:"Elsahel Rd",
            city:"Marina, Egypt",
            locID:"4e14d612aeb733245ec9f3b2"
        }
    
    
    
    ];
    
