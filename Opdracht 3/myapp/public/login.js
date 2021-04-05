class user
{
    constructor(username, password, firstName, lastName)
    {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isOperator = false;
    }

    makeOperator = () => this.isOperator = true;

    removeOperator = () => this.isOperator = false;
}

class classRoom
{
    constructor(name, teachers, students, quizzes)
    {
        this.name = name;
        this.teachers = teachers;
        this.students = students;
        this.quizzes = quizzes;
    }

    addTeacher(teacher)
    {
        this.teachers.push(teacher);
    }

    addStudent(student)
    {
        this.students.push(students);
    }

    addQuiz(quiz)
    {
        this.quizzes.push(quiz);
    }
}

function clearPage()
{
    var loginSection = document.querySelector(".webpage-content__section");
    for (child of loginSection.childNodes) loginSection.removeChild(child);
}

function createLoginPage()
{
    clearPage();
    var loginSection = document.querySelector(".webpage-content__section");
    var loginSubSection = document.createElement("section");
    loginSubSection.setAttribute("class", "webpage-content__section__subsection");

    var loginHeader = document.createElement("h1");
    loginHeader.appendChild(document.createTextNode("Log in to your account"));
    loginSubSection.appendChild(loginHeader);

    var usernameInput = document.createElement("input");
    var usernameLabel = document.createElement("label");
    usernameLabel.appendChild(document.createTextNode("username:"));
    loginSubSection.appendChild(usernameLabel);
    loginSubSection.appendChild(document.createElement("br"));
    loginSubSection.appendChild(usernameInput);

    loginSubSection.appendChild(document.createElement("br"));

    var passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    var passwordLabel = document.createElement("label");
    passwordLabel.appendChild(document.createTextNode("password:"));
    loginSubSection.appendChild(passwordLabel);
    loginSubSection.appendChild(document.createElement("br"));
    loginSubSection.appendChild(passwordInput);

    loginSubSection.appendChild(document.createElement("br"));
    loginSubSection.appendChild(document.createElement("br"));

    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "button");
    submitButton.setAttribute("value", "Log in");
    loginSubSection.appendChild(submitButton);

    loginSubSection.appendChild(document.createElement("br"));
    loginSubSection.appendChild(document.createElement("br"));

    //dont have an account? - button
    loginSubSection.appendChild(document.createTextNode("Don't have an account?"));
    loginSubSection.appendChild(document.createElement("br"));

    var RegisterButton = document.createElement("input");
    RegisterButton.setAttribute("type", "button");
    RegisterButton.setAttribute("value", "Register an account");
    RegisterButton.addEventListener("click", function () { createRegisterPage() });
    loginSubSection.appendChild(RegisterButton);

    //add the login subsection to the screen
    loginSection.appendChild(loginSubSection);
}

function createRegisterPage()
{   
    clearPage();
    var loginSection = document.querySelector(".webpage-content__section");
    var loginSubSection = document.createElement("section");
    loginSubSection.setAttribute("class", "webpage-content__section__subsection");

    var loginHeader = document.createElement("h1");
    loginHeader.appendChild(document.createTextNode("Register an account"));
    loginSubSection.appendChild(loginHeader);

    var backButton = document.createElement("input");
    backButton.setAttribute("type", "button");
    backButton.setAttribute("value", "Back to Log in");
    backButton.addEventListener("click", function () { createLoginPage() });
    loginSubSection.appendChild(backButton);

    loginSubSection.appendChild(document.createElement("br"));
    loginSubSection.appendChild(document.createElement("br"));

    var usernameLabel = document.createElement("label");
    usernameLabel.appendChild(document.createTextNode("username:"));
    loginSubSection.appendChild(usernameLabel);
    var usernameInput = document.createElement("input");
    loginSubSection.appendChild(usernameInput);

    loginSubSection.appendChild(document.createElement("br"));
    loginSubSection.appendChild(document.createElement("br"));

    var passwordLabel = document.createElement("label");
    passwordLabel.appendChild(document.createTextNode("password:"));
    loginSubSection.appendChild(passwordLabel);
    var passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    loginSubSection.appendChild(passwordInput);

    loginSubSection.appendChild(document.createElement("br"));

    var confirmPasswordLabel = document.createElement("label");
    loginSubSection.appendChild(confirmPasswordLabel);
    confirmPasswordLabel.appendChild(document.createTextNode("confirm password:"));
    var confirmPassword = document.createElement("input");
    confirmPassword.setAttribute("type", "password");
    loginSubSection.appendChild(confirmPassword);

    loginSubSection.appendChild(document.createElement("br"));
    loginSubSection.appendChild(document.createElement("br"));

    var firstNameLabel = document.createElement("label");
    firstNameLabel.appendChild(document.createTextNode("first name:"));
    loginSubSection.appendChild(firstNameLabel);
    var firstNameInput = document.createElement("input");
    loginSubSection.appendChild(firstNameInput);

    loginSubSection.appendChild(document.createElement("br"));
    loginSubSection.appendChild(document.createElement("br"));

    var lastNameLabel = document.createElement("label");
    lastNameLabel.appendChild(document.createTextNode("last name:"));
    loginSubSection.appendChild(lastNameLabel);
    var lastNameInput = document.createElement("input");
    loginSubSection.appendChild(lastNameInput);

    loginSubSection.appendChild(document.createElement("br"));
    loginSubSection.appendChild(document.createElement("br"));

    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "button");
    submitButton.setAttribute("value", "submit");
    submitButton.addEventListener("click", function () {

        app.post('/loginpage_htmlFile', async (req, res) => {
            //user sql query
            let sql = `SELECT UserName username,
                           Password password  
                    FROM User`;
            //accesing database
            getData(sql).then(results => dataArray = results)

            //prints out the data
            setTimeout(function () {
                console.log(dataArray);
            }, 10);

            setTimeout(function () {
                console.log('Attempting to log in');
                try {
                    //compares the username of db with the inserted one and stores the found user in a variable
                    let foundUser = dataArray.find(data => req.body.username === data.username);
                    if (foundUser) {
                        let submittedPass = req.body.password;
                        let storedPass = foundUser.password;
                        //comparing password of inserted user with that of the found user
                        const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
                        if (passwordMatch) {
                            res.send(`matching password`);
                            console.log('successful log in');
                        } else {
                            res.send("not matching password");
                            console.log('unsuccessful log in');
                        }
                    }
                    else {
                        res.send("username does not exist");
                        console.log('unsuccessful log in');
                    }
                }
                catch{
                    res.send("Internal server error");
                    console.log('server error');
                }
            }, 15);
        });
    });

    loginSubSection.appendChild(submitButton);

    loginSection.appendChild(loginSubSection);
}

createLoginPage();
