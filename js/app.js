function myMap() {
    var lastMarker;
    var infoMarker;
    var myCenter=new google.maps.LatLng(locations[0].lat,locations[0].lng);
    var myCanvas = document.getElementById("googleMap");
    var mapProp= {center:myCenter , zoom:15 };
    var map=new google.maps.Map(myCanvas,mapProp);
      
    var markers=[];
    for (var i=0;i<locations.length;i++){
    markers[i]=new google.maps.Marker({position:new google.maps.LatLng(locations[i].lat,locations[i].lng), map:map,animation:google.maps.Animation.DROP,title:locations[i].title});
        
        
         infoMarker=new google.maps.InfoWindow({
        content:locations[i].title+"<br>"+"Ahmed Ali" 
    });
    google.maps.event.addListener(markers[i],'click',function(){
                                for (var n=0;n<locations.length;n++){
                                      if(this.title==locations[n].title){
                                  infoMarker.setContent(content(locations[n].title,locations[n].streetAddress,locations[n].city));
                                 
                                   this.setAnimation(google.maps.Animation.BOUNCE);
        
      
                                  infoMarker.open(map,this);
                                      }}
                                  });
    document.querySelector('input').oninput = function() {
        infoMarker.close();
        for (var j=0;j<locations.length;j++){
            if(this.value==locations[j].title){
        infoMarker.setContent(content(this.value,locations[j].streetAddress,locations[j].city));
       infoMarker.setPosition(new google.maps.LatLng(locations[j].lat,locations[j].lng));
       
        this.value=" ";
            }
        }
    
        
   infoMarker.open(map);
    
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
            lat:28.092861,
            lng:30.771192,
            streetAddress:"El Saah Sq. DOWNTOWN",
            city:"Menia Governorate, Egypt"
        },
        {
            title:"Menia Armed Forces Club",
            lat:28.092861,
            lng:30.771192,
            streetAddress:"sharq el nil DOWNTOWN",
            city:"Menia Governorate, Egypt"
        }
    
    
    
    ];
    
