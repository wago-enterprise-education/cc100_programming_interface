

/************** declare every digital-out Switch by Element-ID ********************/
var elem_DO1 = document.getElementById("DO1");
var elem_DO2 = document.getElementById("DO2");
var elem_DO3 = document.getElementById("DO3");
var elem_DO4 = document.getElementById("DO4");
/**********************************************************************************/

/************** declare element for reloading overview-page ***********************/
//var elem_DO_Reload = document.getElementById("DO_Reload");
/**********************************************************************************/

/************** declare every digital-in circle by Element-ID *********************/
var elem_DI1 = document.getElementById("DI1");
var elem_DI2 = document.getElementById("DI2");
var elem_DI3 = document.getElementById("DI3");
var elem_DI4 = document.getElementById("DI4");
var elem_DI5 = document.getElementById("DI5");
var elem_DI6 = document.getElementById("DI6");
var elem_DI7 = document.getElementById("DI7");
var elem_DI8 = document.getElementById("DI8");
/**********************************************************************************/

var elem_AI1 = document.getElementById("AI1_value");
var elem_AI2 = document.getElementById("AI2_value");

// declare the elements for setting the PT100
var elem_PT1 = document.getElementById("PT1_value");
var elem_PT2 = document.getElementById("PT2_value");

/************** declare elements for reading and writing the analog-out ***********/
var elem_AO1_value = document.getElementById("AO1_Value");
var elem_AO1_write = document.getElementById("AO1_Write");
var elem_AO2_value = document.getElementById("AO2_Value");
var elem_AO2_write = document.getElementById("AO2_Write");
var AO1_form = document.getElementById("AO1_Form")
var AO2_form = document.getElementById("AO2_Form")

var firstLoad = true;

window.onload = alert;
function alert(){
    fetch('/api/v1/do/value')
        .then(response => response.json())
        .then(data => {
        let DO_Value = data.value;
        DO_Value = DO_Value.trim().trim();
        let DO_Value_bin = convertToBinary(DO_Value);
        let DO_Value_Array = DO_Value_bin.split("");
        let DO_Value_List = DO_Value_Array.reverse();
    
        //DO1
        if (DO_Value_List[0] == 1){
            console.log("klicked")
            elem_DO1.click();
        }
        //DO2
        if (DO_Value_List[1] == 1){
            elem_DO2.click();
        }
        //DO3
        if (DO_Value_List[2] == 1){
            elem_DO3.click();
        }
        //DO4
        if (DO_Value_List[3] == 1){
            elem_DO4.click();
        }
        
        add_ClickListener();
    })
    .catch(error => {
        console.error('Fehler beim Abrufen der Daten:', error);
    });
}

/**********************************************************************************/

/************** eventlistener "click" for reacting on pressed digital-out switch **/
function add_ClickListener(){
    elem_DO1.addEventListener("click", DO1);
    elem_DO2.addEventListener("click", DO2);
    elem_DO3.addEventListener("click", DO3);
    elem_DO4.addEventListener("click", DO4);
}
/**********************************************************************************/

/************** eventlistener "click" for return to overview-page *****************/
//elem_DO_Reload.addEventListener("click", DO_Reload);
/**********************************************************************************/

/************** eventlistener "click" for writing the given analog-out value ******/
AO1_form.addEventListener("submit", AO1)
AO2_form.addEventListener("submit", AO2)

/**********************************************************************************/
DI_value();
AI_value();
PT_value();



/************** Reading the current value of the digital outputs and based on that, changing the color ******************/
async function DI_value(){
    //getting the current digital-input value and create an readabel 8-digit-binary array of it
    fetch('/api/v1/di/value')
    .then(response => response.json())
    .then(data => {
        let DI_Value = JSON.stringify(data.value);
        DI_Value = data.value.toString(2);
        let DI_Value_bin = convertToBinary(DI_Value);
        let DI_Value_Array = DI_Value_bin.split("");
        let DI_Value_List = DI_Value_Array.reverse();
    
    //DI1
        if (DI_Value_List[0] == 1){
            elem_DI1.style.backgroundColor = "#6EC800";
        } else{
            elem_DI1.style.backgroundColor = "#DEDFE1";
        }
        //DI2
        if (DI_Value_List[1] == 1){
            elem_DI2.style.backgroundColor = "#6EC800";
        } else{
            elem_DI2.style.backgroundColor = "#DEDFE1";
        }
        //DI3
        if (DI_Value_List[2] == 1){
            elem_DI3.style.backgroundColor = "#6EC800";
        } else{
            elem_DI3.style.backgroundColor = "#DEDFE1";
        }
        //DI4
        if (DI_Value_List[3] == 1){
            elem_DI4.style.backgroundColor = "#6EC800";
        } else{
            elem_DI4.style.backgroundColor = "#DEDFE1";
        }
        //DI5
        if (DI_Value_List[4] == 1){
            elem_DI5.style.backgroundColor = "#6EC800";
        } else{
            elem_DI5.style.backgroundColor = "#DEDFE1";
        }
        //DI6
        if (DI_Value_List[5] == 1){
            elem_DI6.style.backgroundColor = "#6EC800";
        } else{
            elem_DI6.style.backgroundColor = "#DEDFE1";
        }
        //DI7
        if (DI_Value_List[6] == 1){
            elem_DI7.style.backgroundColor = "#6EC800";
        } else{
            elem_DI7.style.backgroundColor = "#DEDFE1";
        }
        //DI8
        if (DI_Value_List[7] == 1){
            elem_DI8.style.backgroundColor = "#6EC800";
        } else{
            elem_DI8.style.backgroundColor = "#DEDFE1";
        }
    })
    .catch(error => {
        console.error('Fehler beim Abrufen der Daten:', error);
    });
    setTimeout(DI_value, 500);
}

function convertToBinary (number) {
    let num = number;
    let binary = (num % 2).toString();
    for (; num > 1; ) {
        num = parseInt(num / 2);
        binary =  (num % 2) + (binary);
    }
    return binary;
}

//running the DI_Value() -Function to return the current state of the digital inputs

async function AI_value(){
    fetch('/api/v1/ai/1')
    .then(response => response.json())
    .then(data => {
    // Hier kannst du mit den Daten weiterarbeiten, z.B. sie in den DOM einfügen
    let ai1_value = data.voltage;
    let ai1_value_floor = Math.floor(ai1_value / 1000);
    let ai1_value_modulo = ai1_value % 1000;
    elem_AI1.innerHTML = ai1_value_floor + "," + ai1_value_modulo + " V";
    })
    .catch(error => {
    console.error('Fehler beim Abrufen der Daten:', error);
    });

    fetch('/api/v1/ai/2')
    .then(response => response.json())
    .then(data => {
    // Hier kannst du mit den Daten weiterarbeiten, z.B. sie in den DOM einfügen
    let ai2_value = data.voltage;
    let ai2_value_floor = Math.floor(ai2_value / 1000);
    let ai2_value_modulo = ai2_value % 1000;
    elem_AI2.innerHTML = ai2_value_floor + "," + ai2_value_modulo + " V";
    })
    .catch(error => {
    console.error('Fehler beim Abrufen der Daten:', error);
    });


    setTimeout(AI_value, 1000);
}

async function PT_value(){
    fetch('/api/v1/PT/1')
    .then(response => response.json())
    .then(data => {
    // Hier kannst du mit den Daten weiterarbeiten, z.B. sie in den DOM einfügen
    let PT1_value = data.temperature.toString();
    PT1_value = PT1_value.replace(".", ",");
    PT1_value = PT1_value.slice(0, 6);
    if (PT1_value > 850){
        elem_PT1.innerHTML = "No value";
    }
    else {
        elem_PT1.innerHTML = PT1_value  + " °C";
    }
    })
    .catch(error => {
    console.error('Fehler beim Abrufen der Daten:', error);
    });

    fetch('/api/v1/PT/2')
    .then(response => response.json())
    .then(data => {
    // Hier kannst du mit den Daten weiterarbeiten, z.B. sie in den DOM einfügen
    let PT2_value = data.temperature.toString();
    PT2_value = PT2_value.replace(".", ",");
    PT2_value = PT2_value.slice(0, 6);
    if (PT2_value > 850){
        elem_PT2.innerHTML = "No value";
    }
    else {  
        elem_PT2.innerHTML = PT2_value  + " °C";
    }
    })
    .catch(error => {
    console.error('Fehler beim Abrufen der Daten:', error);
    });


    setTimeout(PT_value, 1000);
}





/************************************************************************************************/

/************** Switch the digital outputs to true / false **************************************/
function DO1(){
    fetch('/api/v1/do/1', {
        mode : "no-cors",
        method : 'post'
    })
}
function DO2(){
    fetch('/api/v1/do/2', {
        mode : "no-cors",
        method : 'post'
    })
}
function DO3(){
    fetch('/api/v1/do/3', {
        mode : "no-cors",
        method : 'post'
    })
}

function DO4(){
    fetch('/api/v1/do/4', {
        mode : "no-cors",
        method : 'post'
    })
}
/********************************************************************************************************/

/****** When reloading the overview-page, DO-Switches are being reset. Therefore turn DO-Data to 0 ******/
function DO_Reload(){
    fetch('/api/v1/do/reload', {
        mode : "no-cors",
        method : 'post'
    })
}
/********************************************************************************************************/

/********** Writing AO1 Value to data (currently not working) *******************************************/
function AO1(event){
    
    event.preventDefault();
    // Default options are marked with *
    const response = fetch('/api/v1/ao/1', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({value : elem_AO1_value.value}), // body data type must match "Content-Type" header
    });
    
}
    


function AO2(event){
    event.preventDefault();
    const response = fetch('/api/v1/ao/2', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({value : elem_AO2_value.value}), // body data type must match "Content-Type" header
    });

}