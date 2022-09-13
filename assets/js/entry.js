var weekContainer = document.querySelector('.week-day-buttons');

var dayAvail = document.getElementById("dayOfTheWeek");
// var groomerTextbox = document.getElementById("groomer");
var listDaysChoice = document.createElement("ul");
listDaysChoice.setAttribute('class','staffSchedule');
var wkDay = {
    sunday: 'alex',
    monday: 'charley',
    tuesday: 'pho',
    wednesday: 'victor',
    thursday: 'pho',
    friday: 'alex',
    saturday: 'pho'
}
// div id="dayOfTheWeek" class="week-day-buttons">
// console.log(Object.keys(wkDay));
// var listKeys = [Object.keys(wkDay)];
// listKeys.forEach(val=>{console.log(val)});

// console.log(Object.entries(wkDay));

for (const [key, value] of Object.entries(wkDay)) {
    var li_day = document.createElement("li");
    li_day.textContent = key;
    li_day.setAttribute('schedOfPerson',value);
    listDaysChoice.appendChild(li_day);
  }
dayAvail.appendChild(listDaysChoice);
  


weekContainer.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches("li")) {
        // console.log(element);
        var dayOfwk = element.textContent;
        var staffOnDuty = wkDay[dayOfwk];
        console.log('on ',dayOfwk,' ',staffOnDuty,' is working');
    }
});



// dayAvailability.addEventListener("click", function(event) {var element = event.target; if (element.matches("wkDay")) {var boxChoice = element.textContent; console.log(boxChoice) }});
    
    
        
        
   


// function getWeekDay(){
   
   
// }


// wkDay.forEach(val=>{console.log(val)});
// const hasKey = ky in scoreDict;
//   if (hasKey === false){
//     scoreDict[ky]=1;


// function chooseGroomer() {

//     if (sun.checked == true) {
//     //document.getElementById("sun").value = alex1;
//         console.log(alex1); 
//     }
    
//     else if (mon.checked == true){
//     //document.getElementById('mon').value = alex2;
//         return alex2
//     }

//     }

// var groomer = document.getElementById("submit");

// function showGroomer() {

// var groomerName = chooseGroomer();
// var groomerText = document.querySelector('#choose');
// groomerText.value = groomerName;

// }

//Event Listener

    // groomer.addEventListener("click" , showGroomer);
