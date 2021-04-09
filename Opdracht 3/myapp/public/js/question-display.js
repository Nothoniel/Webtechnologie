var getData='';
// var teststring;
var car = {color : "yellow"};

function sendRequest(getData){
    var teststring;
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
                .then(data=> console.log(  teststring = data.getData) );   // Getdata : "Startpage" // auto.color  
                //data.Getdata 
    console.log(car);            
    console.log(car.color);
    // setTimeout(async function () {
    //     console.log(teststring);
    //     },3000);

    return teststring;               
}


//function 


function getStart() {
    getData ='Startpage';
    var teststring = sendRequest(getData);
    console.log(teststring);

}



//event on the submit button that determines that t
window.addEventListener("load", getStart);