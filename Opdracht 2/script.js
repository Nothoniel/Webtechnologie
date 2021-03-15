//Menu that changes the lay-out of a webpage and is present in the navbar
//adding a new button to the navbar that shows the menu
var navbar = document.querySelector("nav");
var dropdown = navbar.createElement("li");
var dropbuttonText = document.createTextNode("Menu");

navbar.appendChild(dropbuttonText);

//Style of the menu
var menuContent = menu.createElement('div')
menuContent.style.display =  none;
menuContent.style.position = absolute;
menuContent.style.backgroundColor = this.#f9f9f9;
menuContent.style.zIndex = 1;

//showing the menu when hovering it
var menu = navbar.querySelector("li") [5].addEventListener("mouseover", showMenu(menuContent));

//Event handling for navbar
function showMenu(menuContent) {
    var showMenu;
    if(showMenu = menuContent) {
        if(showMenu.style) {
            showMenu.style.display = block;
            return 1;
        }
    }
return 0;
}