var basURL="http://localhost:3000/";
auth= function(){
    var xhttp = new XMLHttpRequest();
    data={name:document.getElementById("username").value,password:document.getElementById("password").value}
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState==4 && xhttp.status==200) {                       
            document.getElementById("headline").innerHTML="Movies";
            document.getElementById("movie").style.display="none";
            document.getElementById("display-movie").style.display="block";
            var response = JSON.parse(xhttp.responseText);
            document.getElementById("loading").innerHTML = response.message;
            document.getElementById("token-display").innerHTML = response.token;
        }
        if(xhttp.readyState==4 && xhttp.status==403){
            document.getElementById("headline").innerHTML=JSON.parse(xhttp.responseText).message;
        }
    };
    xhttp.open("POST", basURL+"login", true);
    xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
    xhttp.send(JSON.stringify(data));
}
getCheapest= function(){
    console.log("cheapest movie");
    var xhttp = new XMLHttpRequest();
    data={token:document.getElementById("token-display").innerHTML}
    console.log(data);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState==4 && xhttp.status==200) {
            document.getElementById("list").style.display="block";
            document.getElementById("list").innerHTML=xhttp.responseText;	
        }
        if(xhttp.readyState==4 && xhttp.status==403){
            document.getElementById("list").innerHTML=JSON.parse(xhttp.responseText).message;
        }
    };
    xhttp.open("POST", basURL+"movie", true);
    xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
    xhttp.send(JSON.stringify(data));
}
getById= function(id){
    console.log(" movie by id");
    var xhttp = new XMLHttpRequest();
    data={token:document.getElementById("token-display").innerHTML}
    console.log(data);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState==4 && xhttp.status==200) {
            document.getElementById("list").style.display="block";
            document.getElementById("list").innerHTML=xhttp.responseText;	
        }
        if(xhttp.readyState==4 && xhttp.status==403){
            document.getElementById("list").innerHTML=JSON.parse(xhttp.responseText).message;
        }
    };
    xhttp.open("POST", basURL+"movie/"+id, true);
    xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
    xhttp.send(JSON.stringify(data));
}
function loadJSON(moviesData,callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', moviesData, true); // moviesData is the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);  
}
function init(moviesData,tableId) {
    loadJSON(moviesData,function(response) {
        var actual_JSON = JSON.parse(response);
        CreateTableFromJSON(actual_JSON,tableId);
    });
}            
function CreateTableFromJSON(json,tableId) {        
    var col = [];
    for (var i = 0; i < 1; i++) {
        for (var key in json[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    var table = document.createElement("table");
    var tr = table.insertRow(-1);                   

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for (var i = 0; i < json.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json[i][col[j]];
        }
    }

    var divContainer = document.getElementById(tableId);
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

init('api/cinemaworld/movies.js','showCinema');
init('api/filmworld/movies.js','showFilm');