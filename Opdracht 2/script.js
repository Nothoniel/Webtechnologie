//declarations
var options = ["body", "article", "header", "section", "aside", "footer"];
var type = ["type", "class", "name"];
var cssVar = ["--dark-1-header-color", "--dark-1-color", "--dark-2-footer-color", "--dark-2-color", "--dark-3-color", "--dark-4-color", "--dark-5-color","--dark-7-color"];

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
var colorTextLabel = document.createTextNode("Select color:");
var inputColor = document.createElement("input");

addInput(inputColor, type, "color");
inputColor.setAttribute("value", "#203C56");

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
// inputNumber.setAttribute("id", "fontinput")
inputNumber.setAttribute("min", "1");
inputNumber.setAttribute("value", "16");
inputNumber.setAttribute("max", "45")

fontsizeLabel.appendChild(fontsizeTextLabel);
fontsizeChanger.appendChild(fontsizeLabel);
fontsizeChanger.appendChild(inputNumber);
menuContent.appendChild(fontsizeChanger);

//submit button, when clicked pass the input to the functions
var applyButton = document.createElement("button");
var applyButtonText = document.createTextNode("Apply");

applyButton.setAttribute("type", "button");

applyButton.appendChild(applyButtonText);
menuContent.appendChild(applyButton).addEventListener("click",determineNewChanges);

var x= document.querySelector(".selectedOption").value;
console.log(x);

//disabling of button, because body should only modify the color             <<<<<<<<
// if(document.querySelector(".selectedOption").value == "body" ) {
// document.getElementById("fontinput").disabled = true;
// }

//  removingStyles();

 //functions
  //when resizing removing, the font-size, so that media queries work again
  //Setting them empty does not work
// function removingStyles() {
//    if(window.onresize)
//     {
//       document.querySelector(":root").removeAttribute("--fontsize1"); 
//       document.querySelector(":root").removeAttribute("--fontsize2");  
//       document.querySelector(":root").removeAttribute("--fontsize3");   
//     }
// }

function addOption(selection, options, classname) {
   var i;
   selection.setAttribute("class", classname);
   for (i=0; i<options.length; i++)
   {
      //the if-statement checks if the element exists before adding it to the select
      if(document.querySelector(options[i])) {
         var option = document.createElement("option");
         option.setAttribute("value", options[i]);
         var textSelected = document.createTextNode(options[i]);
         option.appendChild(textSelected);
         selection.appendChild(option);
      }
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
	var rgb = "#", x, i;
	for (i = 0; i < 3; i++) {
		x = parseInt(hexStr.substr(i*2,2), 16);
		x = Math.round(Math.min(Math.max(0, x + (x * lum)), 255)).toString(16);
		rgb += ("00"+x).substr(x.length);
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
         //coloring of the aside, since it has a high priorty, changing the external css would not work.
         colorClasses("figure-text", newColor, p/2);
         colorClasses("figure-link", newColor,-p/2);
      }

      if (p==5){
         saturatedColor= colorBrightness(newColor,-p/3);
      }

      if (p>5){
         saturatedColor= colorBrightness(newColor,-p/8);
      }
      document.querySelector(":root").style.setProperty(cssVar[p], saturatedColor);
   }
}

function colorClasses(className, newColor, lum) {
   var k;
   var classText = document.getElementsByClassName(className);
   for (k=0; k<classText.length; k++){
      classText[k].style.color = colorBrightness(newColor, lum);
   }

}

function fontSizeClasses(className, newFontsize){
   var k;
   var classText = document.getElementsByClassName(className);
   for (k=0; k<classText.length; k++){
      classText[k].style.fontSize = newFontsize;
   }
}

function executeNewColor(selected, collection, newColor) {
   if (selected == "article" || selected == "section") {
      colorTheElement(newColor, selected);
   }
   else{    
      var i;
      for (i=0; i<collection.length; i++)
      {
         function assignColor(newColor) {collection[i].style.color = newColor; }
         switch(selected) {
            case "body":
               collection[i].style.backgroundColor = newColor;   
               break;
            case "footer":
               assignColor(newColor);
               colorClasses("footer-mail", newColor, -0.1);
               break;
            case "aside":
               assignColor(newColor);
               colorClasses("figure-text", newColor, 0.1);
               colorClasses("figure-link", newColor,-0.1);
               break;
            default:
               assignColor(newColor);
         }
      }
   }
}

function executeNewFont(selected, collection,newFontsize){
   if(selected !== "body"){
      var newFontsizepx = newFontsize +"px"; //adding the unit of the fontsize
      var t;
      for(t=0; t<collection.length; t++) {
         collection[t].style.fontSize = newFontsizepx;
         if(selected == "aside"){
            fontSizeClasses("figure-text", newFontsizepx);
         }
      }
   }

   if(selected == "article" || selected == "section") {
      var header2FontSize = (newFontsize*1.5) + "px";
      var header3FontSize = (newFontsize*1.2) + "px";
      document.querySelector(":root").style.setProperty("--fontsize2", header2FontSize);
      document.querySelector(":root").style.setProperty("--fontsize3", header3FontSize); 
   }

   if(selected == "article"){
      var header1FontSize = (newFontsize*1.6) + "px";
      document.querySelector(":root").style.setProperty("--fontsize1", header1FontSize);
   }
}

//applying the new CSSrules
function applyNewChanges(selected, collection, newColor, newFontsize) {
   //executes fontsize
   executeNewFont(selected, collection,newFontsize);
   
   //execute color
   executeNewColor(selected, collection, newColor);
}

//determine the inputted values of the user
function determineNewChanges() {
   var currentSelectedElement = document.querySelector(".selectedOption").value;
   var collectionSelectedElement = document.querySelectorAll(currentSelectedElement); //collection that contains all the selected elements
   var newColor = document.querySelector(".color").value;
   var newFontsize = document.querySelector(".number").value;

   applyNewChanges(currentSelectedElement, collectionSelectedElement, newColor, newFontsize);
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
 sheet.insertRule('.menucontent { display: none; position: absolute; background-color: #544E68; color: #FFD4A3; width: 200px; z-index: 1; }', 0); //Make inherit when coloring body
 sheet.insertRule('.dropdown:hover .menucontent { display: block; }', 1);
 sheet.insertRule('.selected { width: 300px; }', 2);
//  sheet.insertRule(' @media only screen and (max-width: 712px) { .menucontent { width: 45%; } }', 3);