//the id of the form and the url for the posting
var url, id;

if(document.getElementById("registerform")) {
    url = "/register";
    id = "#registerform";
} else if (document.getElementById("loginform")) {
    url = "/login";
    id = "#loginform";
} else {
    url = "/edit";
    id = "#settingsform";
}

//converts it to JSON and post the data
convertToJSON = ({formData}) => {
    //converts it to a plain object
    var data = Object.fromEntries(formData.entries());
    var options = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify(data)
    };
    var response = fetch(url, options);

    //redirects the webiquiz page
    //naming of the arrow function does not matter, it always references to the result before dot
    //response.then( window.location.href  = 'assessment.html')
    //response.then(response => reponse.json())  
                // .then(data=>console.log(data));

    // convertedData.json();
}   

//Login or Register data 
//Reads the values of the inputs inserted into the form
readForm = e => {
    e.preventDefault();
    const form = e.currentTarget;

    //the elements of the form
    const formData = new FormData(form);
    convertToJSON({formData});
}

//event on the submit button that makes a new user
console.log(id);
document.querySelector(id).addEventListener("submit", readForm);



