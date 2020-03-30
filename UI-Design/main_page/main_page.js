/**
 * This document is work in progress
 * Subjected to change in future
 *      'TODO' -> tasks that need to be done
 * 
 */
let guest = document.getElementById("guest"); //get navBar for guest
let user = document.getElementById("user"); //get navBar for user

var timer;
var map;

//initialization of map for webpage
function init(){

    //TODO: make apropriate page parametar function/handler
    let parameters = location.search.substring(1);
    let tmp = parameters.split("="),
        fun = unescape(tmp[0]),
        val = unescape(tmp[1]);
              
    if (val == "guest" || parameters == ""){
        singOut();
    }else if (val == "user"){
        singIn();
    }


    map = createMap();
    setCurrentPosition(map);


    //console.log(document.getElementById('map').children[0]);
    document.getElementById('map').children[0].addEventListener("mousedown", handleMouseDown, false);//mouse long press handler; listener to start timer
    document.getElementById('map').children[0].addEventListener("mouseup", handleMouseUp, false); //listener to reset timer if released befor end of timeout
    document.getElementById('map').children[0].addEventListener("mousemove", handleMouseUp, false); //listener to reset timer if map moved with cursor 


}  

//starts timer after dilay
function handleMouseDown(event){
    if (event.which != 1) return;   //simple event filter
    //console.log(event);

    timer = window.setTimeout(function(){
        //insert code you want to execute here
        //TODO: markes selected location on map and possiblly something more
        console.log("Hello world");


    }, 700); //change delay of labmbda function execution (in ms) 
}

//reset timer
function handleMouseUp(event){
    if (event.which != 1 || (event.type == "mousemove" && event.which != 1)) return;   //simple event filter
    //console.log(event);

    clearTimeout(timer);
}


//probably need to change this solution
//TODO: make better solution
function singOut(){
    guest.style.visibility = "visible";
    user.style.visibility = "hidden";
}

function singIn(){
    guest.style.visibility = "hidden";
    user.style.visibility = "visible";
}

function singUp(){
   singIn();
}


//need help with this things
//TODO: implementation of functions
function search(){
    dontWork();
}

function toggleOutposts(){
    dontWork();
}

function toggleOffice(){
    dontWork();
}

function toggleLandfills(){
    dontWork();
}

function toggleMarkedLocations(){
    dontWork();
}

function dontWork(){
    alert("Sorry, not implemented yet");
}



//TODO: better 'constructor' function needed
function createMap(){
    map = new OpenLayers.Map("map");
    map.addLayer(new OpenLayers.Layer.OSM());
    

    map.addControls([
        new OpenLayers.Control.MousePosition(),
        new OpenLayers.Control.ScaleLine(),
        new OpenLayers.Control.LayerSwitcher(),
        new OpenLayers.Control.Navigation(),
        new OpenLayers.Control.Permalink({ anchor: true })
    ]);

    
    let markers = [
        [44.864166, 20.651177, 'Main office'],
        [44.871163, 20.638895, 'Main office'],
        [44.811615, 20.488727, 'Main office'],
        [44.778830, 20.497828, 'Plant'],
        [44.791046, 20.472462, 'Plant'],
        [44.796462, 20.505937, 'Plant'],
        [44.848452, 20.375347, 'Plant'],
        [44.827720, 20.388044, 'Plant'],
        [44.817660, 20.488679, 'Plant'],
        [44.747485, 20.447991, 'Plant'],
        [44.882502, 20.456271, 'Plant'],
        [44.828683, 20.458060, 'Plant'],
        [44.766906, 20.409335, 'Plant'],
        [44.886812, 20.627040, 'Landfill'],
        [44.887581, 20.782556, 'Landfill']
    ];

    epsg4326 = new OpenLayers.Projection("EPSG:4326");
    projectTo = map.getProjectionObject(); //The map projection (Spherical Mercator)
    let lonLat = new OpenLayers.LonLat(8.0, 50.3).transform(epsg4326, projectTo);
    let zoom = 7;
    if (!map.getCenter()) {
        map.setCenter(lonLat, zoom);
    }
  
    // Put your point-definitions here
    let radius = 4;
    let look = ["red", "blue", "yellow"];
    let layerName = [markers[0][2]];
    let styleArray = [new OpenLayers.StyleMap({ pointRadius: radius, fillColor: look[0], fillOpacity: 0.5 })];
    let vectorLayer = [new OpenLayers.Layer.Vector(layerName[0], { styleMap: styleArray[0] })];		// First element defines first Layer
  
    let j = 0;
    for (let i = 1; i < markers.length; i++) {
        if (!layerName.includes(markers[i][2])) {
            j++;
            layerName.push(markers[i][2]);															// If new layer name found it is created
            styleArray.push(new OpenLayers.StyleMap({ pointRadius: radius, fillColor: look[j % look.length], fillOpacity: 0.5 }));
            vectorLayer.push(new OpenLayers.Layer.Vector(layerName[j], { styleMap: styleArray[j] }));
        }
    }
  
      //Loop through the markers array
    for (let i = 0; i < markers.length; i++) {
        let lon = markers[i][1];
        let lat = markers[i][0];
        let feature = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point(lon, lat).transform(epsg4326, projectTo),
            { description: "marker number " + i }
            //see http://dev.openlayers.org/docs/files/OpenLayers/Feature/Vector-js.html#OpenLayers.Feature.Vector.Constants for more options
        );
        vectorLayer[layerName.indexOf(markers[i][2])].addFeatures(feature);
    }
  
    for (let i = 0; i < layerName.length; i++) {
        map.addLayer(vectorLayer[i]);
    }



    return map;
}

//at this moment doesn't need changing
function setCurrentPosition(content){

    navigator.geolocation.getCurrentPosition(function success(pos){
        let position = new OpenLayers.LonLat(pos.coords.longitude, pos.coords.latitude).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913")),
            zoom = 10;
        content.setCenter(position, zoom);
    },function error(err){
        throw Error("Error with finding current position");
    },{
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0
    });
}