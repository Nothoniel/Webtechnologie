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

    var loginForm = document.createElement("form");

    var usernameInput = document.createElement("input");
    usernameInput.setAttribute("type", "text");
    usernameInput.setAttribute("name", "username");
    var usernameLabel = document.createElement("label");
    usernameLabel.appendChild(document.createTextNode("username:"));
    loginForm.appendChild(usernameLabel);
    loginForm.appendChild(document.createElement("br"));
    loginForm.appendChild(usernameInput);

    loginForm.appendChild(document.createElement("br"));

    var passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("name", "password");
    var passwordLabel = document.createElement("label");
    passwordLabel.appendChild(document.createTextNode("password:"));
    loginForm.appendChild(passwordLabel);
    loginForm.appendChild(document.createElement("br"));
    loginForm.appendChild(passwordInput);

    loginForm.appendChild(document.createElement("br"));
    loginForm.appendChild(document.createElement("br"));

    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Log in");
    loginForm.appendChild(submitButton);

    loginForm.appendChild(document.createElement("br"));
    loginForm.appendChild(document.createElement("br"));

    loginForm.setAttribute("method", "POST");
    loginForm.setAttribute("action", "/login");
    loginSubSection.appendChild(loginForm);


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

    var loginForm = document.createElement("form");

    var usernameLabel = document.createElement("label");
    usernameLabel.appendChild(document.createTextNode("username:"));
    loginForm.appendChild(usernameLabel);
    var usernameInput = document.createElement("input");
    usernameInput.setAttribute("name", "username");
    loginForm.appendChild(usernameInput);

    loginForm.appendChild(document.createElement("br"));
    loginForm.appendChild(document.createElement("br"));

    var passwordLabel = document.createElement("label");
    passwordLabel.appendChild(document.createTextNode("password:"));
    loginForm.appendChild(passwordLabel);
    var passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("name", "password")
    loginForm.appendChild(passwordInput);

    loginForm.appendChild(document.createElement("br"));

    var confirmPasswordLabel = document.createElement("label");
    loginForm.appendChild(confirmPasswordLabel);
    confirmPasswordLabel.appendChild(document.createTextNode("confirm password:"));
    var confirmPassword = document.createElement("input");
    confirmPassword.setAttribute("type", "password");
    confirmPassword.setAttribute("name", "confirm");
    loginForm.appendChild(confirmPassword);

    loginForm.appendChild(document.createElement("br"));
    loginForm.appendChild(document.createElement("br"));

    var firstNameLabel = document.createElement("label");
    firstNameLabel.appendChild(document.createTextNode("first name:"));
    loginForm.appendChild(firstNameLabel);
    var firstNameInput = document.createElement("input");
    firstNameInput.setAttribute("name", "firstName");
    loginForm.appendChild(firstNameInput);

    loginForm.appendChild(document.createElement("br"));
    loginForm.appendChild(document.createElement("br"));

    var lastNameLabel = document.createElement("label");
    lastNameLabel.appendChild(document.createTextNode("last name:"));
    loginForm.appendChild(lastNameLabel);
    var lastNameInput = document.createElement("input");
    lastNameInput.setAttribute("name", "lastName");
    loginForm.appendChild(lastNameInput);

    loginForm.appendChild(document.createElement("br"));
    loginForm.appendChild(document.createElement("br"));

    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "submit");

    loginForm.appendChild(submitButton);

    loginForm.setAttribute("method", "POST");
    loginForm.setAttribute("action", "/register");
    loginSubSection.appendChild(loginForm);

    loginSection.appendChild(loginSubSection);
}

createLoginPage();
