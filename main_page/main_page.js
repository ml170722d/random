let guest= document.getElementById("guest");
let user = document.getElementById("user");

let content;

function init(){
    let parameters = location.search.substring(1);
    let tmp = parameters.split("="),
        fun = unescape(tmp[0]),
        val = unescape(tmp[1]);
    
    content = new Map();
    setCurrentPosition(content);
                
    if (val == "guest" || parameters == ""){
        singOut();
    }else if (val == "user"){
        singIn();
    }
}  

function singOut(){
    guest.style.visibility = "visible";
    user.style.visibility = "hidden";
}

function singIn(){
    guest.style.visibility = "hidden";
    user.style.visibility = "visible";
}

function singUp(){
    guest.style.visibility = "hidden";
    user.style.visibility = "visible";
}

function Map(){
    this.map = new OpenLayers.Map("map");
    this.map.addLayer(new OpenLayers.Layer.OSM());
}

function setCurrentPosition(content){

    navigator.geolocation.getCurrentPosition(function success(pos){
        let position = new OpenLayers.LonLat(pos.coords.longitude, pos.coords.latitude).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913")),
            zoom = 17;
        content.map.setCenter(position, zoom);

    },function error(err){
        throw Error("greska");

    },{
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0

    });
}