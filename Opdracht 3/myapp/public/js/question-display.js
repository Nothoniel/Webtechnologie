var getData='';
var teststring;
//example 4, global variable
var options;

//example 4: placing the fetch in the desired function
async function RespondFunction() { 
    //fetching the data of the server
    var response = await fetch("/start", options);
    var test1 = await response.json(); 
    console.log(test1[0].topictitle);
    function1(page);
} 

async function function1(page) {
    console.log(page);
}

async function sendRequest() {
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    RespondFunction();   
}

async function getStart() {
    // getData ='Startpage';
    sendRequest();
}



//event on the submit button that determines that t
window.addEventListener("load", getStart);
