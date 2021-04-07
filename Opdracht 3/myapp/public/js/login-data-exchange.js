
//the id of the form and the url for the posting
var url;
var id;

if(!(document.getElementById("registerUsername"))) {
    url = '/login';
    id = "loginform";
}
else {
    url = '/register';
    id = 'registerform';
}

//converts it to JSON and post the data
function convertToJSON({formData}) {
    //converts it to a plain object
    var data = Object.fromEntries(formData.entries());
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify(data),
    };
    var convertedData = fetch(url, options);

    //redirects the page
    convertedData.then(convertedData =>  { 
        if(convertedData.response){
            options["redirect"] = window.location.replace("https://www.google.nl/"); 
        } else{
            alert("Invalid Username or Password");
        }
    }) 
    return convertedData.json();
}   

//Login or Register data 
//Reads the values of the inputs inserted into the form
function readForm(e) {

    e.preventDefault();
    const form = e.currentTarget;

    //the elements of the form
    const formData = new FormData(form);
    convertToJSON({formData});
}

//event on the submit button that makes a new user
document.getElementById(id).addEventListener("submit", readForm);



