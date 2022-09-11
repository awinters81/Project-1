//Variables

// For Day Selection
var sun = document.getElementById("sunday");
var mon = document.getElementById("monday")

var alex1 = document.getElementById("sunday").value;
var alex2 = document.getElementById("monday").value;

function chooseGroomer() {

    if (sun.checked == true) {
    //document.getElementById("sun").value = alex1;
        console.log(alex1); 
    }
    
    else if (mon.checked == true){
    //document.getElementById('mon').value = alex2;
        return alex2
    }

    }

var groomer = document.getElementById("submit");

function showGroomer() {

var groomerName = chooseGroomer();
var groomerText = document.querySelector('#choose');
groomerText.value = groomerName;

}

//Event Listener

    groomer.addEventListener("click" , showGroomer);
