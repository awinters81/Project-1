//--------------- create elements here first --------------
var body = document.body;
var hdrSection = document.createElement('header');
var hdr1 = document.createElement('h1'); 

var formSection = document.createElement('section');
var formContainer = document.createElement('div');
var hdrForm = document.createElement('h2');
hdrForm.textContent='Please Fill out to below to set your appointment!';

var resultsSummary = document.createElement('div');

var weekDayButtons = document.createElement("div");
weekDayButtons.setAttribute('id','wk-day-select');
weekDayButtons.setAttribute('class','wk-day-buttons');
var availabilityDays = document.createElement('div');

var availabilityTime = document.createElement('div');

var clientForms = document.createElement('form');
clientForms.setAttribute('class','client-dog-info');

var formAddBox = document.createElement('div'); formAddBox.setAttribute('id','tell-us');
var hdrAddCare = document.createElement('h3');  hdrAddCare.textContent = 'Tell us any additional services you want for your dog';
formAddBox.appendChild(hdrAddCare);

var formMake = document.createElement('form');  formMake.setAttribute('id','pet-add-form');
var formAddText = document.createElement('input');
formAddText.setAttribute('type','text');
formAddText.setAttribute('class','form-control');
formAddText.setAttribute('id','pet-needs');
formMake.appendChild(formAddText);    
formAddBox.appendChild(formMake);

var hdrResults = document.createElement('h2');
hdrResults.setAttribute('id','hdr-result');
hdrResults.textContent='Find out who will be caring for your dog once you submit!';

var resultsBox = document.createElement('textarea'); 
resultsBox.setAttribute('readonly','');
resultsBox.setAttribute('id','results-groomer');

var submitBtn = document.createElement('button');
submitBtn.setAttribute('type','submit');
submitBtn.setAttribute('id','so-fetch');
submitBtn.setAttribute('onclick','soFetch()');
submitBtn.textContent='So Fetch!';

resultsSummary.appendChild(resultsBox);
resultsSummary.appendChild(hdrResults);
resultsSummary.appendChild(submitBtn);
// var dayLstner = '';
// var tmeLstner = '';
// var grmLstner = '';

//--------------  Autocomplete widget
$(function() {
    var extraNeeds = [
    'Bath','Nail Trim','Brushing',
    'Eye & Ear Cleaning','Hair Triming',
    'De-Shedding Treatments','Teeth Brushing',
    'De-Matting Treatment','Styling','Health Check',
    'Flea-Tick Treatment'];
$('#pet-needs').autocomplete({source: extraNeeds})
});
  
//----------1) create header & append to body ------------------------

hdr1.textContent = 'Fetch Groomer';
hdrSection.appendChild(hdr1);
body.appendChild(hdrSection);
// hdrSection.appendChild(hdr2);
// var hdr2 = document.createElement('h2'); hdr2.textContent = '';

//---------2) create a client form to schedule appointment --------------

createClientFormBox();  // run the function when you page loads


//---------------------  creates Days Avail buttons to click ---------------------
//-------------------- create staff schedule ----------------------------
//   This is how this works, shiftDayTime is a    Dictionary (aka..  hash)
//   1) Multi-Hash:   shiftDayTime[key] = value
//             shiftDayTime[sunday] = another hash to the key 'sunday'
//   2) {'morning':'alex','afternoon':'alex','evening':'victor'}
//      {   key   : value,     key   : value,   key   : value }   there are 3 pairs of keys/values 

var shiftDayTime = {
    sunday:    {'morning':'alex','afternoon':'alex','evening':'victor'},   // <-- bc in {} means value from using the key is another Hash
    monday:    {'morning':'alex','afternoon':'charley','evening':'victor'},
    tuesday:   {'morning':'pho','afternoon':'charley','evening':'charley'},
    wednesday: {'morning':'victor','afternoon':'victor','evening':'pho'},
    thursday:  {'morning':'pho','afternoon':'alex','evening':'charley'},
    friday:    {'morning':'alex','afternoon':'alex','evening':'victor'},
    saturday:  {'morning':'pho','afternoon':'charley','evening':'pho'}
}

// console.log('--------------------------------------');
//   2) {'morning':'alex','afternoon':'alex','evening':'victor'}
//        {   key   : value,     key   : value,   key   : value }   there are 3 pairs of keys/values 

// var MornAftEve = ['morning','afternoon','evening'];
var dropMenuList = document.createElement('ul'); dropMenuList.setAttribute('class','drop-menu-sched');
for(const [ k,v] of Object.entries(shiftDayTime)){
    var day_li = document.createElement('li'); day_li.textContent = k;
    // day_li.setAttribute('onclick','clickOnWeekDay()');
    day_li.setAttribute('class','work-day-fetch');
    var dropSubMenuTime = document.createElement('div');dropSubMenuTime.setAttribute('class','mae');
    var day_time = eval(v);
    for(const k_tme of Object.keys(day_time)){
        var wrk_shft = document.createElement('a'); 
        // var personWorking = day_time[k_tme];  // <-- one of many ways to get the worker name (value)
        var wrkDayID = k + '_' + k_tme;
        wrk_shft.setAttribute('id',wrkDayID);
        wrk_shft.setAttribute('href','#');
        wrk_shft.textContent = k_tme;
        dropSubMenuTime.appendChild(wrk_shft);  // <-- append link to sub-menu of day_li list
    }
    day_li.appendChild(dropSubMenuTime);
    dropMenuList.appendChild(day_li);
}
weekDayButtons.appendChild(dropMenuList);
//---------------------  creates Days Avail buttons to click ---------------------
// var wkDay = {
//     sunday: 'alex',
//     monday: 'charley',
//     tuesday: 'pho',
//     wednesday: 'victor',
//     thursday: 'pho',
//     friday: 'alex',
//     saturday: 'pho'
// }
// var listDaysChoice = document.createElement("ul");
// listDaysChoice.setAttribute('class','staffSchedule');
// var listOfDays =  ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
// for (var days_elem of listOfDays) {
//     var li_day = document.createElement("li");
//     li_day.textContent = days_elem;
//     // li_day.setAttribute('staff-on-duty',value);
//     listDaysChoice.appendChild(li_day);
//     // console.log(days_elem);
//   }
// //   weekDayButtons.appendChild(listDaysChoice);
formSection.appendChild(weekDayButtons);

//------------------------  create client forms from Hash loop -----------------------------
function createClientFormBox(){
    var entryDict = {
        'First Name' : {'type':'text','id':'first-name'},
        'Last Name' : {'type':'text','id':'last-name'},
        'Email' : {'type':'email','id':'email'},
        'Dog Name' : {'type':'text','id':'dog-name'},
        'Dog Breed' : {'type':'text','id':'breed'}
    }
    for(var [k1,v1] of Object.entries(entryDict)){
        var dictVal = eval(v1);
        var makeInputBox = document.createElement('input');
        var makeInputLbl = document.createElement('label');
        makeInputLbl.textContent = k1;
        for(var [k2,v2] of Object.entries(dictVal)){
            makeInputBox.setAttribute(k2,v2); 
        }
        makeInputBox.setAttribute('placeholder',k1);
        makeInputLbl.setAttribute('for',dictVal['id']);
        clientForms.appendChild(makeInputLbl);
        clientForms.appendChild(makeInputBox);
    }
    formContainer.appendChild(hdrForm);
    formContainer.setAttribute('class','client-input-boxes');
    formContainer.appendChild(clientForms);
    formContainer.appendChild(formAddBox);
    formSection.appendChild(formContainer);
    body.appendChild(formSection);
}
// ----------- last part of form section is show results after clicking submit
formSection.appendChild(resultsSummary);
//------------- by clicking day button created, returns name of staff ----------

function updateClick(d,t){
    var dayLstner = d;
    var tmeLstner = t;
    var grmLstner = shiftDayTime[d][t];
    console.log(dayLstner,tmeLstner,grmLstner);
    resultsBox.textContent = grmLstner;
}

var weekContainer = document.querySelector('.drop-menu-sched');
weekContainer.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches("a")) {
        // console.log(element);
        var apptTme = element.textContent;
        var wrkid = element.getAttribute("id");
        var apptDay = wrkid.split('_');
        apptDay = apptDay[0];
        updateClick (apptDay,apptTme);
        // console.log(dayLstner,tmeLstner);
    }
});


// function showWorkerOnWeekDay(){
// subMitBtn.on('click', function () {
    // var grmr = nameoffunction to get groomer after submit
        // .text(); places text in resultsbox
// });
// }

