var tax = 0;
var num_jobs = 1;

const state_tax = [
    {abbr: "AZ", name: "Arizona"},{abbr: "CO", name:"Colorado"}, {abbr: "GA", name:"Georgia"},{abbr: "ID", name: "Idaho"}, 
                {abbr: "IL", name: "Illinois"}, {abbr: "IN", name:"Indiana"},{abbr: "IA", name: "Iowa"}, {abbr: "KY", name: "Kentucky"}, 
                {abbr: "LA", name: "Louisiana"},{abbr: "MA", name: "Massachusetts"}, {abbr: "MI",name: "Michigan"}, {abbr:"MS", name: "Mississippi"},
                {abbr: "NC", name: "North Carolina"}, {abbr: "OH", name: "Ohio"}, {abbr: "PA", name: "Pennsylvania"}, {abbr: "UT", name:"Utah"}
];

function print_hours(){

    var hours= 0;
    hours = +document.getElementById("hours1").value;
    if (num_jobs > 1){
        for (let i =2; i<=num_jobs;i++){
            hours += +document.getElementById(`hours${num_jobs}`).value; 
        }
    } 
    var pay = document.getElementById("hourly").value;
    
    var tax_percent = document.getElementById("state").value;
    var selected_opt = document.getElementById("state");
    var state_abbr = selected_opt.options[selected_opt.selectedIndex].label;
    var state_name = findKeyValue(state_tax, "abbr", state_abbr);

    if (hours != "" & pay != "" & tax_percent != ""){
        var before_Tax = hours * pay;   

        var after_Tax = before_Tax - (before_Tax*tax);

        before_Tax = before_Tax.toFixed(2);
        after_Tax = after_Tax.toFixed(2);

        document.getElementById("before").textContent= " $" + before_Tax;
        document.getElementById("after").textContent = " $" + after_Tax;
    }

    const explain = document.getElementById("explain");
    explain.textContent = `As a student in ${state_name}, %${tax_percent} is taken from each paycheck. Generally, as a student worker,
    FICA (Social Security and Medicare) taxes do not apply to service performed by students employed by a school, college or university where the student is pursuing a course of study.`;

}

function redo(){
    num_jobs = 0;
    document.getElementById("before").textContent="";
    document.getElementById("after").textContent="";
    document.getElementById("explain").textContent="";
}

function getStateVal(){
    var tax_percent = document.getElementById("state").value;
    tax_percent = tax_percent /100;
    tax = tax_percent;
}

function addHourEl(){
    num_jobs += 1;
    const reduceButton = document.createElement("button");
    reduceButton.id = "reduce"+num_jobs;
    reduceButton.style.backgroundColor= "rgba(255, 255, 255, 0)";
    reduceButton.style.border = "none";
    reduceButton.addEventListener("click", ()=> reduceJobs(num_jobs));
    
    const minusIcon = document.createElement("i");
    minusIcon.className = "fa-solid fa-circle-minus";

    reduceButton.appendChild(minusIcon);

    const hoursInput = document.createElement("input");
    hoursInput.type = "text";
    hoursInput.placeholder = "Job "+num_jobs + " hours";
    hoursInput.className = "hour-input";
    hoursInput.id = "hours"+num_jobs;

    // 3. Append it to the body of the document
    const hourSect = document.querySelector(".more_hours");
   
    const breakBtw = document.createElement("br");
    breakBtw.id = "break"+num_jobs;
    hourSect.appendChild(hoursInput);
    hourSect.appendChild(reduceButton);
    hourSect.appendChild(breakBtw);
    
}

function reduceJobs(current_num){
    const hourSect = document.querySelector(".more_hours");
    const reduceRemove = document.getElementById("reduce"+current_num);
    const inputRemove = document.getElementById("hours"+current_num);
    const breakRemove = document.getElementById("break"+current_num);

    hourSect.removeChild(reduceRemove);
    hourSect.removeChild(inputRemove);
    hourSect.removeChild(breakRemove);
    num_jobs -=1;
}

function findKeyValue(arr, key, value) {
    let state_name = "";
     arr.forEach(item => {
       if (item[key] === value) {
         state_name = item.name;
       }
     });
     return state_name;
   }