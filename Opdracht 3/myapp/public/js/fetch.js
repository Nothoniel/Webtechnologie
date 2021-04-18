var getData = "";
var teststring, options;

//example 4: placing the fetch in the desired function
async function RespondFunction() { 
    //important is that the json request needs to be global! 
    //var options in this script
    //no return in the request function
    var response = await fetch("/start", options);
    var test1 = await response.json(); 
    var {page} = test1;
    console.log(page);
    function1(page);
} 

function1 = page => {console.log(page);}

async function sendRequest(getData) {
    var data = {getData};

    options = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify(data)
    };

    RespondFunction();
    // var response = await fetch("/start", options);   

    // return response.json();       
}

//example 1
//function that is going to use the data to perform something like display
// async function editData(response) { 
//     //as an example now it is only printed
//     response.then(data => console.log( data.page));
// }


async function getStart() {
    var teststring;
    getData = "Startpage";
    // var response = sendRequest(getData);

    //example 4
    sendRequest(getData);

     // example 1 : do something directly after return 
    // response.then(data => console.log(data.page));

    // example 2: callback
    // editData(response); 

    //example 3: with array of objects 
    //using index the object can be choosen
    //double .then for the value 
    //using a for-loop for creating a new array with the data.
    // response.then(data => console.log( data[1]));
}

//event on the submit button that determines that t
window.addEventListener("load", getStart());
