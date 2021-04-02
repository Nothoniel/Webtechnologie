var loginSection = document.querySelector(".webpage-content__section");

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

function createLoginPage() {
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
    submitButton.type = "button";
    submitButton.value = "Log in";
    loginSubSection.appendChild(submitButton);

    loginSection.appendChild(loginSubSection);
}

function createRegisterPage()
{   
    var loginSubSection = document.createElement("section");
    loginSubSection.setAttribute("class", "webpage-content__section__subsection");

    var loginHeader = document.createElement("h1");
    loginHeader.appendChild(document.createTextNode("Register an account"));

    var usernameInput = document.createElement("input");
    loginSubSection.appendChild(usernameInput);

    var passwordInput = document.createElement("input");
    loginSubSection.appendChild(passwordInput);

    var confirmPassword = document.createElement("input");
    loginSubSection.appendChild(confirmPassword);

    var firstNameInput = document.createElement("input");
    loginSubSection.appendChild(firstNameInput);

    var lastNameInput = document.createElement("input");
    loginSubSection.appendChild(lastNameInput);

    var submitButton = document.createElement("input");
    submitButton.type = "button";
    submitButton.value = "submit";
    loginSubSection.appendChild(submitButton);

    loginSection.appendChild(loginSubSection);
}

createLoginPage();

