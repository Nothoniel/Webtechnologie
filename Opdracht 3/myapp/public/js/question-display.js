var getData='';
var teststring;
var car = {color : "yellow"};

function sendRequest(getData){
    var data = {getData};
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    };
    var response = fetch("/start", options);
        response.then(res => res.json())  
                .then(data=> console.log(data.getData) );   // Getdata : "Startpage" // auto.color  
                //data.Getdata 
    console.log(car);            
    console.log(car.color);                    
}


//function 
// setTimeout(async function test (teststring){
//   console.log(test);
// } ,3000);

function getStart() {
    getData ='Startpage';
    sendRequest(getData);
}



//event on the submit button that determines that t
window.addEventListener("load", getStart);