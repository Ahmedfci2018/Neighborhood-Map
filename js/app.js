//=====Glopal variables======
//array of markers 
var markers=[];
//map variable
var map;
//create info window
var infoMarker;

//this main function contains all about map 
function myMap() {
    
   //set Default Center of map 
    var myCenter=new google.maps.LatLng(locations[0].lat,locations[0].lng);
    //get map by id 
    var myCanvas = document.getElementById("googleMap");
    //options of map 
    var mapProp= {center:myCenter , zoom:8 };
    
    map=new google.maps.Map(myCanvas,mapProp);
    
    
    //loop for add all markers to the map 
    for (var i=0;i<locations.length;i++){
        //initialization of markers
        markers[i]=new google.maps.Marker(
            {
                position:new google.maps.LatLng(locations[i].lat,locations[i].lng),
                map:map,
                animation:google.maps.Animation.DROP,
                title:locations[i].title
            });
        
        //inisialize info window to dispaly information of marker 
        infoMarker=new google.maps.InfoWindow();
    
        //event of marker listener
        markers[i].addListener('click',open);
    } // end of loop
}//end of main function

//this function used when list element clicked
function whatClicked(evt) {
    
    open(evt.target.id);//get id of current list clicked
}

//this function for select current location clicked and send it to info function
function open(value){
    
    for (var j=0;j<locations.length;j++){
        
        if(value==locations[j].title || this.title==locations[j].title){
            
            info(locations[j].title,
                 locations[j].streetAddress,
                 locations[j].city,
                 locations[j].locID,
                 markers[j]
                );
            break;
        } //end if
    }//end loop
} //end open function 

//this used to get and format all information and show it in the infoWindow
function info(title,streetAdress,city,locId,marker) {
        
    // this used to get info from foursquare API
    var urlAPI = 'https://api.foursquare.com/v2/venues/'+locId+'/tips?v=20131016&sort=recent&limit=10&client_id=FKB1CVH4USQGZG5JGCENOTGDQYJGH1BCYLDCMSSMDCGJDVYP&client_secret=B332K3I0EDXOAFFVGOSLW5PLDUYFEXUSFBHPWAE1ZDHJ05TS';
    var topTips = [];
    $.getJSON(urlAPI).done(function(data) {
        $.each(data.response.tips.items, function(i, tips){
           topTips.push('<li>' + tips.text + '</li>');
        });
        infoMarker.setContent( '<h1>' + title + '</h1>' + '<b>Street Adress : </b>' + streetAdress + '<br> <b>City : </b>' + city + '<br> <h2>The last visitor\'s comments </h2> <b> <ol class="tips">' + topTips.join('') + '</ol>');
        
    //if process is failed
    }).fail(function() {
        infoMarker.setContent( '<h1>' + title + '</h1>' + '<b>Street Adress : </b>' + streetAdress + '<br> <b>City : </b>' + city + '<br> <h2>The last visitor\'s comments </h2>');
        alert('some error occure with API');
    });
    
    //set animation for marker  
    marker.setAnimation(google.maps.Animation.BOUNCE);
    
    infoMarker.open(map,marker);   // show infoWindow on the marker
    
    window.setTimeout(function(){marker.setAnimation(null);},700);
} // end of info function
    
function error() {
    // Error handling
    alert("an Error is occured with load map pls check your internet connection");  
}

//this function for show or hide markers
function setMapOnAll(map) {
    
    for (var i = 0; i < markers.length; i++) 
    {
        
        markers[i].setMap(map);
        
    }
}

//Proper Use of Knockout seperate all element
$(function() 
  {

    var viewModel = {
        
        locations: ko.observableArray(locations),
        query: ko.observable(''),
        search: function(value) {
        
            viewModel.locations.removeAll();
            setMapOnAll(null);
            
            for(var x in locations) {
                if(locations[x].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                    viewModel.locations.push(locations[x]);
                    markers[x].setMap(map); //show filtered markers
                }//end if
            }//end for loop
        }//end function 
    };//end object
    
    viewModel.query.subscribe(viewModel.search);

    ko.applyBindings(viewModel);
});

//array of all Locations
var locations=[
    {
        title:"Mall of Arabia",
        lat:30.006299,
        lng:30.973481,
        streetAddress:"26th July Axis",
        city:"6th of October Giza",
        locID:"4d14faf2401db60cb6d6dca4"
    },
    {
        title:"Cairo Festival City Mall",
        lat:30.028950,
        lng:31.408608,
        streetAddress:"Ring Road",
        city:"New Cairo",
        locID:"5268f5d2498ee025c2cb6794"
    },
    {
        title:"Alexandria City Centre",
        lat:31.168703,
        lng:29.932259,
        streetAddress:"Alex-Cairo Desert Rd.",
        city:"Alexandria",
        locID:"4b4b88f8f964a520769f26e3"
    },
    {
        title:"Americana Plaza",
        lat:30.027503,
        lng:31.014010,
        streetAddress:"26th of July Axis",
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
        streetAddress:"North Costal Road",
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
        lat:31.19604492,
        lng:29.89795625,
        streetAddress:"20 Salah Salem St.",
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
