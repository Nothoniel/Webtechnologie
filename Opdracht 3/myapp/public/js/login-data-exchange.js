//the id of the form and the url for the posting
var url, id;

if(document.getElementById("registerform")) {
    url = "/register";
    id = "#registerform";
} else if(document.getElementById("loginform")) {
    url = "/login";
    id = "#loginform";
} else {
    url = "/edit";
    id = "#settingsform";
}

//converts it to JSON and post the data
async function convertToJSON({formData}) {
    //converts it to a plain object
    var data = Object.fromEntries(formData.entries());
    var options = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify(data)
    };
    var rawResponse = await fetch(url, options);
    console.log(rawResponse.message);
    var response = await rawResponse.json();
    if(response.message == "succesful log in") {
        //redirect to index.html
        window.location.replace("index.html");
    } else {
        //wrong username/password
        window.alert(response.message);
    }
}

//Login or Register data
//Reads the values of the inputs inserted into the form
async function readForm (e) {
    e.preventDefault();
    const form = e.currentTarget;

    //the elements of the form
    const formData = new FormData(form);
    convertToJSON({formData});
}

//event on the submit button that makes a new user
console.log(id);
document.querySelector(id).addEventListener("submit", readForm);



