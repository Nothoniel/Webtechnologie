//declarations
var options = ["body", "article", "header", "section", "aside", "footer"];
var type = ["type", "class", "name"];
var cssVar = ["--dark-1-header-color", "--dark-1-color", "--dark-2-footer-color", "--dark-2-color", "--dark-3-color", "--dark-4-color", "--dark-5-color","--dark-7-color"]

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
menuContent.appendChild(applyButton).addEventListener("click",determineNewChanges);


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

 //hsl color
 function colorBrightness(hexStr, lum) {
	// hex string splitted up in rgb pairs, that are headecimal numbers
	hexStr = hexStr.replace(/[^0-9a-f]/gi, "");

   // converts hexadecimal number to decimal and change brightness
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hexStr.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}
	return rgb;
}

function colorTheElement(newColor, selected) {
   var p;
   for(p=0; p<cssVar.length; p++)
   {
      if(selected == "section"){
         if( cssVar[p] == "--dark-1-header-color") {
            continue;
         }
      } 

      if(cssVar[p] == "--dark-2-footer-color"){
         continue;
      }
      
      var saturatedColor;
      if(p<4){
         saturatedColor= colorBrightness(newColor,p/2);
      }
      else{
         saturatedColor= colorBrightness(newColor,-p/11);
      }
      document.querySelector(":root").style.setProperty(cssVar[p], saturatedColor);
   }
}

function colorHyperlink(className) {
   var k;
   var link = document.getElementsByClassName(className);
   for (k=0; k<link.length; k++){
   link[k].style.color = colorBrightness(newColor, -0.1);
   }
}

//applying the new CSSrules
function applyNewChanges(selected, collection, newColor, newFontsizepx) {
   if (selected == "article" || selected == "section") {
      colorTheElement(newColor, selected);
   }
   else{    
      var i;
      for (i=0; i<collection.length; i++)
      {
         switch(selected) {
            case "body":
               collection[i].style.backgroundColor = newColor;   
               break;
            case "footer":
               colorHyperlink("footer-mail");
               break;
            case "aside":
               colorHyperlink("figure-link");
               break;
            default:
               collection[i].style.fontSize = newFontsizepx;
               collection[i].style.color = newColor;
         }
      }
   }
}

//determine the inputted values of the user
function determineNewChanges() {
   var currentSelectedElement = document.querySelector(".selectedOption").value;
   var collectionSelectedElement = document.querySelectorAll(currentSelectedElement); //collection that contains all the selected elements
   var newColor = document.querySelector(".color").value;
   var newFontsize = document.querySelector(".number").value;
   var newFontsizepx = newFontsize +"px"; //adding the unit of the fontsize

   applyNewChanges(currentSelectedElement, collectionSelectedElement, newColor, newFontsizepx);
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
 sheet.insertRule('.menucontent { padding: 50px; display: none; position: absolute; background-color: #544E68; color: #FFD4A3; width:20%; z-index: 1; }', 0); //Make inherit when coloring body
 sheet.insertRule('.dropdown:hover .menucontent { display: block; }', 1);
 sheet.insertRule('.selected { width: 300px; }', 2);