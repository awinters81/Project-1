//--------------- create elements here first --------------
var body = document.body;
var hdrSection = document.createElement('header');

var fetchLogo = document.createElement ('a') 
fetchLogo.setAttribute('href', './index.html');
fetchLogo.setAttribute('class', 'fetch-logo');

var hdr1 = document.createElement('h1');
hdr1.textContent = 'Fetch Groomer';

hdrSection.appendChild(fetchLogo);
hdrSection.appendChild(hdr1);
body.appendChild(hdrSection);

var formSection = document.createElement('section');
var formContainer = document.createElement('div');
var hdrForm = document.createElement('h2');
hdrForm.textContent='Please Fill out to below to set your appointment!';

var allResultSumm = document.createElement('div');
allResultSumm.setAttribute('class','all-result');

var addServInclude = document.createElement('div');
addServInclude.setAttribute('class','req-serv');
var addServUL = document.createElement('ul');
addServUL.setAttribute('id','req-add-service');
addServUL.setAttribute('class','req-add-serv');
var resultsSummary = document.createElement('div');
resultsSummary.setAttribute('class','results-summary');

addServInclude.appendChild(addServUL);
allResultSumm.appendChild(addServInclude);
allResultSumm.appendChild(resultsSummary);

var weekDayButtons = document.createElement("div");
weekDayButtons.setAttribute('id','wk-day-select');
weekDayButtons.setAttribute('class','wk-day-buttons');

var resultsHdrTxtBut = document.createElement('div');
resultsHdrTxtBut.setAttribute('class','resultHdrTxtBtn');

var clientForms = document.createElement('form');
clientForms.setAttribute('class','client-dog-info');

var formAddBox = document.createElement('div'); 
formAddBox.setAttribute('id','tell-us');
var hdrAddCare = document.createElement('h3');  
hdrAddCare.textContent = 'Tell us any additional services you want for your dog';
formAddBox.appendChild(hdrAddCare);

var formMake = document.createElement('form');  
formMake.setAttribute('id','pet-add-form');
var formAddText = document.createElement('input');
var formAddButton = document.createElement('div');
formAddText.setAttribute('type','text');
formAddText.setAttribute('class','form-control');
formAddText.setAttribute('id','pet-needs');
formAddButton.setAttribute('id','new-serv-button');
formAddButton.setAttribute('onclick','serviceToList()');

formAddButton.textContent='Add Service';
formMake.appendChild(formAddText);  
formMake.appendChild(formAddButton);
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
submitBtn.textContent ='So Fetch!';

resultsSummary.appendChild(weekDayButtons);
resultsSummary.appendChild(resultsHdrTxtBut);
resultsHdrTxtBut.appendChild(hdrResults);
resultsHdrTxtBut.appendChild(resultsBox);
resultsHdrTxtBut.appendChild(submitBtn);

//--------------  Autocomplete widget
// $(function() {
//     var extraNeeds = [
//         'Bath','Nail Trim','Brushing',
//         'Eye & Ear Cleaning','Hair Triming',
//         'De-Shedding Treatments','Teeth Brushing',
//         'De-Matting Treatment','Styling','Health Check',
//         'Flea-Tick Treatment'];
// $('#pet-needs').autocomplete({source: extraNeeds})});
  
//----------1) create header & append to body ------------------------
//---------2) create a client form to schedule appointment --------------
createClientFormBox();  // run the function when you page loads

formSection.appendChild(allResultSumm);
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
// formSection.appendChild(weekDayButtons);

//------------------------  create client forms from Hash loop -----------------------------
function createClientFormBox(){
    var entryDict = {
        'First Name' : {'type':'text','id':'first-name'},
        'Last Name'  : {'type':'text','id':'last-name'},
        'Email'      : {'type':'email','id':'email'},
        'Dog Name'   : {'type':'text','id':'dog-name'},
        'Dog Breed'  : {'type':'text','id':'breed'}
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
// formSection.appendChild(resultsSummary);
//------------- by clicking day button created, returns name of staff ----------

function updateClick(d,t){
    var grmLstner = shiftDayTime[d][t];
    // console.log(d,t,grmLstner);
    resultsBox.textContent = grmLstner;
}

var weekContainer = document.querySelector('.drop-menu-sched');
weekContainer.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches("a")) {
        // var apptTme = element.textContent; // gets text value of the <a>..</a>
        var wrkid = element.getAttribute("id");
        var apptDay = wrkid.split('_');
        // console.log('-----',element,'----',linkid);
        // apptDay is now an array from the id of <a id="sunday_moring" to [sunday,morning]
        updateClick(apptDay[0],apptDay[1])
        // console.log(apptDay,apptTme);
    }
});



// tester  addServUL
var addTxtValInput = '';
var maxRequest = 0;


var additReq = document.querySelector('.form-control');
additReq.addEventListener('input',function(event) {
    var element = event.target;
    addTxtValInput = element.value;
    // console.log(addTxtValInput);
});

function serviceToList(){
    if ( maxRequest <= 12 && addTxtValInput !== ''){
    maxRequest =  maxRequest + 1;
    // console.log(addTxtValInput); 
    var add_li = document.createElement('li');
    add_li.setAttribute('class','additional-req-serv');
    add_li.textContent = addTxtValInput;
    addServUL.appendChild(add_li);
    additReq.value = '';
    } else {
        return null;
    }
}


var toProfile = {
    'pho'    : './pho-profile.html',   // <-- bc in {} means value from using the key is another Hash
    'alex'   : './alex-profile.html',
    'charley': './charley-profile.html',
    'victor' : './victor-profile.html'
}

function soFetch(){
      if(resultsBox.textContent === '' ){
        return null
    }else{
    var grmInBox = document.getElementById('results-groomer');
    var webProf = toProfile[grmInBox.textContent];
    // console.log(webProf);
    open(webProf);
}}


