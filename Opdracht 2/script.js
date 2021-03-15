//Menu that changes the lay-out of a webpage and is present in the navbar
//adding a new button to the navbar that shows the menu
var navbar = document.querySelector("nav");
var dropdown = navbar.createElement("li");
var dropbuttonText = document.createTextNode("Menu");

navbar.appendChild(dropbuttonText);

//showing the menu when hovering it
var menu = navbar.querySelector("li") [5].addEventListener("mouseover", showMenu);

//Event handling for navbar
function showMenu() {
    var menuContent = menu.createElement('div');
    menuContent.style.display =  none;
    menuContent.style.position = absolute;
    menuContent.style.backgroundColor = this.#f9f9f9;
    menuContent.style.width = 100 + '%';
    menuContent.style.left = 0;
    menuContent.style.zIndex = 1;
    return;
}