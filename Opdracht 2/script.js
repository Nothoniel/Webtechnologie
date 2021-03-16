//declarations
var options = ["body", "article", "header", "section", "aside", "footer"];
var type = ["type", "class", "name"];

//menu that changes the lay-out of a webpage and is present in the navbar
//adding a new button to the navbar that shows the menu
var navbar = document.querySelector(".navbar .navlist");
var dropdownlist = document.createElement("li");
var menuLink = document.createElement("a");
var dropdown = document.createElement("div");
var dropbuttonText = document.createTextNode("Menu");

dropdown.setAttribute("class", "dropdown");

menuLink.appendChild(dropbuttonText);
dropdown.appendChild(menuLink);
dropdownlist.appendChild(dropdown);
navbar.appendChild(dropdownlist);

//the content of the menu
var menuContent = document.createElement("div");

menuContent.setAttribute("class", "menucontent");

dropdown.appendChild(menuContent);

//creates select menu 
var selectMenu = document.createElement("div");
var selectLabel = document.createElement("label");
var selectTextLabel = document.createTextNode("Select element:");
var selection = document.createElement("select");

selectMenu.setAttribute("class", "selected");

addOption(selection, options,"selectedOption");

selectLabel.appendChild(selectTextLabel);
selectMenu.appendChild(selectLabel);
selectMenu.appendChild(selection);
menuContent.appendChild(selectMenu);
 
 //color change
var colorPicker = document.createElement("div");
var colorLabel = document.createElement("label");
var colorTextLabel = document.createTextNode("Select color scheme:");
var inputColor = document.createElement("input");

addInput(inputColor, type, "color");

colorLabel.appendChild(colorTextLabel);
colorPicker.appendChild(colorLabel);
colorPicker.appendChild(inputColor);
menuContent.appendChild(colorPicker);

//change font-size
var fontsizeChanger = document.createElement("div");
var fontsizeLabel = document.createElement("label");
var fontsizeTextLabel = document.createTextNode("Select fontsize:");
var inputNumber = document.createElement("input");

addInput(inputNumber, type, "number");
inputNumber.setAttribute("min", "1");
inputNumber.setAttribute("max", "45")

fontsizeLabel.appendChild(fontsizeTextLabel);
fontsizeChanger.appendChild(fontsizeLabel);
fontsizeChanger.appendChild(inputNumber);
menuContent.appendChild(fontsizeChanger);

//submit changes button
var applyButton = document.createElement("button");
var applyButtonText = document.createTextNode("Apply");

applyButton.setAttribute("type", "button");

applyButton.appendChild(applyButtonText);
menuContent.appendChild(applyButton).addEventListener("click",ApplyNewChanges);

 //functions
 function addOption(selection, options, classname) {
    var i;
    selection.setAttribute("class", classname);
    for (i=0; i<options.length; i++)
    {
        var option = document.createElement("option");
        option.setAttribute("value", options[i]);
        var textSelected = document.createTextNode(options[i]);
        option.appendChild(textSelected);
        selection.appendChild(option);
    }
 }

 function addInput(element, type, value) {
    for (i=0; i<type.length; i++)
    {
        element.setAttribute(type[i], value);
    }
 }

 function ApplyNewChanges() {
    var currentSelectedElement = document.querySelector(".selectedOption").value.toString().toUpperCase();
    var newColor = document.querySelector(".color").value.toString();
    var newFontsize = document.querySelector(".number").value.toString();
    var newFontsizepx = newFontsize+"px";

    //amount of elements
    var x = document.getElementsByTagName("SECTION").length;
    console.log(x);

    // console.log(currentSelectedElement);
    // console.log(newColor);
    // console.log(newFontsizepx);

    //Applying the new CSSrules
    // document.getElementsByTagName(currentSelectedElement).style.fontSize = newFontsizepx;
    // document.getElementsByTagName(currentSelectedElement).style.color = newColor;
 }

//make a stylesheet
var sheet = (function() {
	// create the <style> tag
	var style = document.createElement("style");

	// adds the style to the page
	document.head.appendChild(style);

	return style.sheet;
})();

//adding css-rules to the stylesheet
 sheet.insertRule('.menucontent { padding: 50px; display: none; position: absolute; background-color: #544E68; width:20%; z-index: 1; }', 0);
 sheet.insertRule('.dropdown:hover .menucontent { display: block; }', 1);
 sheet.insertRule('.selected { width: 300px; }', 2);
 




 





