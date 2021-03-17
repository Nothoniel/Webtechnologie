/*
    ///// Section: global variables /////
*/ 

 //options for the select menu
var options = ["body", "article", "header", "section", "aside", "footer"];

//strings that can be used for SetAttribute
var type = ["type", "class", "name"]; 

//the css variables of the .css file
var cssVar = ["--dark-1-header-color", "--dark-1-navbar-color",
 "--dark-1-color", "--dark-2-footer-color", "--dark-2-color", "--dark-3-color", "--dark-3-mail-color", "--dark-3-fig-color",
  "--dark-4-color", "--dark-5-color", "--dark-5-navbar-color", "--dark-7-color", "--dark-7-navbar-color"]

/*
    ///// Section: DOM of the menu /////
*/ 

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
navbar.insertBefore(dropdownlist, navbar.childNodes[0]);

//the content of the menu
var menuContent = document.createElement("div");

menuContent.setAttribute("class", "menucontent");

dropdown.appendChild(menuContent);

//creates select menu 
//user can choose an element of the webpage
var selectMenu = document.createElement("div");
var selectLabel = document.createElement("label");
var selectTextLabel = document.createTextNode("Select element:");
var selection = document.createElement("select");

selectMenu.setAttribute("class", "selected");
selectLabel.setAttribute("class", "text-label");

addOption(selection, options,"selectedOption");

selectLabel.appendChild(selectTextLabel);
selectMenu.appendChild(selectLabel);
selectMenu.appendChild(selection);
menuContent.appendChild(selectMenu);
 
 //the menu to change
 //it is a one color input, the output would be an applied color scheme on the selected elements
 //not every possible color is going to result into an optimal scheme
var colorPicker = document.createElement("div");
var colorLabel = document.createElement("label");
var colorTextLabel = document.createTextNode("Select color:");
var inputColor = document.createElement("input");

addInput(inputColor, type, "color");
inputColor.setAttribute("value", "#203C56");
colorLabel.setAttribute("class", "text-label");

colorLabel.appendChild(colorTextLabel);
colorPicker.appendChild(colorLabel);
colorPicker.appendChild(inputColor);
menuContent.appendChild(colorPicker);

//the menu to change font-size
//the input is a number and the unit is px
//the bounds can be exceeded, when typing the input
var fontsizeChanger = document.createElement("div");
var fontsizeLabel = document.createElement("label");
var fontsizeTextLabel = document.createTextNode("Select fontsize:");
var inputNumber = document.createElement("input");

fontsizeLabel.setAttribute("class", "text-label");

addInput(inputNumber, type, "number");

inputNumber.setAttribute("min", "1");
inputNumber.setAttribute("value", "16");
inputNumber.setAttribute("max", "45")

fontsizeLabel.appendChild(fontsizeTextLabel);
fontsizeChanger.appendChild(fontsizeLabel);
fontsizeChanger.appendChild(inputNumber);
menuContent.appendChild(fontsizeChanger);

//submit button, when clicked passes the inputs that the user has selected to the functions
var applyButton = document.createElement("button");
var applyButtonText = document.createTextNode("Apply");

applyButton.setAttribute("type", "button");

applyButton.appendChild(applyButtonText);
menuContent.appendChild(applyButton).addEventListener("click",determineNewChanges);

/*
    ///// Section: functions /////
*/ 

/*
    ///// Subsection: functions for creation of the menu/////
*/ 

//adding options to the select menu
function addOption(selection, options, classname) {
   var i;
   selection.setAttribute("class", classname);
   for (i=0; i<options.length; i++)
   {
      //the if-statement checks if the element exists on the webpage before adding it to the select
      //transversing the DOM-hierarchy
      if(document.querySelector(options[i])) {
         var option = document.createElement("option");
         option.setAttribute("value", options[i]);
         var textSelected = document.createTextNode(options[i]);
         option.appendChild(textSelected);
         selection.appendChild(option);
      }
   }
 }

 //a function that makes it possible to use setAttribute a bit more efficcient
function addInput(element, type, value) {
   for (i=0; i<type.length; i++)
   {
      element.setAttribute(type[i], value);
   }
 }

/*
    ///// Subsection: functions to apply the new appearance of the elements /////
*/ 

//determine the inputted values of the user
function determineNewChanges() {
   var currentSelectedElement = document.querySelector(".selectedOption").value;
   var collectionSelectedElement = document.querySelectorAll(currentSelectedElement); //collection that contains all the selected elements
   var newColor = document.querySelector(".color").value;
   var newFontsize = document.querySelector(".number").value;

   applyNewChanges(currentSelectedElement, collectionSelectedElement, newColor, newFontsize);
}

//Passes the values for the new appearance to functions that are going to apply them
function applyNewChanges(selected, collection, newColor, newFontsize) {
   executeNewFont(selected, collection, newFontsize);
   executeNewColor(selected, collection, newColor);
}

/*
    ///// Subsubsection: functions to apply the new fontsize /////
*/ 

//applies the new fontsize
//the font-size of the webpage is changed by altering CSS variables  
//also some elements have a higher fontsize then the inserted value, so that the font of the webpage increases/decreases properly
function executeNewFont(selected, collection, newFontsize) {
   //adding the unit of the fontsize
   var newFontsizepx = newFontsize +"px"; 
   var t;
   for(t = 0; t < collection.length; t++) {
      collection[t].style.fontSize = newFontsizepx;
      if(selected == "aside") {
         fontSizeClasses("figure-text", newFontsizepx);
      }
   }

   if(selected == "article" || selected == "section"  || selected == "body") {
      var header2FontSize = (newFontsize*1.5) + "px";
      var header3FontSize = (newFontsize*1.2) + "px";

      if(document.querySelector(".figure-text"))
      {
         document.querySelector(".figure-text").style.removeProperty("font-size");
         fontSizeClasses("figure-text", newFontsizepx);
      }
      
      document.querySelector(":root").style.setProperty("--fontsize2", header2FontSize);
      document.querySelector(":root").style.setProperty("--fontsize3", header3FontSize); 
   }

   if(selected == "article" || selected == "body"){
      var header1FontSize = (newFontsize * 1.6) + "px";
      document.querySelector(":root").style.setProperty("--fontsize1", header1FontSize);
   }

   //to have the menu a bit of relative size to the fontsize
   if(selected == "body") {
      var footerFontSize = (newFontsize*0.6) + "px";
      document.querySelector("footer").style.removeProperty("font-size");
      document.querySelector(":root").style.setProperty("--fontsize4", footerFontSize);
      var multiplier;
      if(newFontsize < 25)
         multiplier = 15;
      else 
         multiplier = 9;
      document.querySelector(".menucontent").style.width = (parseInt(newFontsize) * multiplier).toString() + "px";      
   }
}

//applying the new font size over some specific classes, since otherwise they are unchanged
function fontSizeClasses(className, newFontsize){
   var k;
   var classText = document.getElementsByClassName(className);
   for (k=0; k<classText.length; k++){
      classText[k].style.fontSize = newFontsize;
   }
}

/*
    ///// Subsubsection: functions to apply the new colorscheme /////
*/ 

//applies the new color
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
               removeColors();
               collection[i].style.backgroundColor = newColor;  
               colorTheElement(colorBrightness(newColor, 0.5), selected);
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

//coloring the selected element
//using the css-variables it can be determined exactly which parts of an element needs to be colored and what not
//making use of an array a color scheme can be created
function colorTheElement(newColor, selected) {
   var p;
   for(p=0; p<cssVar.length; p++)
   {
      if(selected == "section"){
         if( cssVar[p] == "--dark-1-header-color" || cssVar[p] == "--dark-1-navbar-color" 
         || cssVar[p] == "--dark-5-navbar-color" || cssVar[p] == "--dark-7-navbar-color" 
         || cssVar[p] == "--dark-3-mail-color") 
            continue;
      } 

      if(selected =="article") {
         if(cssVar[p] == "--dark-1-navbar-color" || cssVar[p] == "--dark-5-navbar-color" 
         || cssVar[p] == "--dark-7-navbar-color" || cssVar[p] == "--dark-3-mail-color") 
             continue;
      }

      if(selected !== "body"){
         if(cssVar[p] == "--dark-2-footer-color")
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
         saturatedColor = colorBrightness(newColor,-p/3);
      }

      if (p>5){
         saturatedColor = colorBrightness(newColor,-p/13);
      }
      document.querySelector(":root").style.setProperty(cssVar[p], saturatedColor);

      if(selected == "body"){
         if(p == 3){
            var menuLabel = document.querySelectorAll(".text-label");
            var i;
            for(i=0; i<menuLabel.length; i++){
               menuLabel[i].style.color = saturatedColor;
            }
         }
         if(p == 10){        
            document.querySelector(".menucontent").style.backgroundColor = saturatedColor;
         }  
      }    
   }
}

 //changing the inserted color by the user
 //the color is made darker/lighter depending on the lum-value and picked color
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

//removal of some colors, making it possible to apply new colors over already changed colors  
//they can not be changed, when they are already changed 
function removeColors() {
   var mail = document.querySelector(".footer-mail");
   if(mail)
      mail.style.removeProperty("color");

   var footerText = document.querySelector("footer");
   if(footerText)
      footerText.style.removeProperty("color"); 
   
   var headerText = document.querySelector("header");
   if(headerText)
      headerText.style.removeProperty("color"); 
}

//similar to the fontsize, some specific classes need to be changed otherwise their color are unchanged 
function colorClasses(className, newColor, lum) {
   var k;
   var classText = document.getElementsByClassName(className);
   for (k=0; k<classText.length; k++){
      classText[k].style.color = colorBrightness(newColor, lum);
   }
}

/*
    ///// Section: Removing styles when resizing /////
*/ 

// removal of some styles when resizing
window.onresize = removingStyles;

  //when resizing removing, the font-size, so that media queries work again
function removingStyles() {
   //removes the added width when resizing of the menu.
   document.querySelector(".menucontent").style.removeProperty(width);

   var selected = document.querySelector(".selectedOption").value;
   if(selected !== "section"){
      document.querySelector(selected).style.removeProperty("font-size");
   }  
   else{
      var t = 0;
      var p = document.querySelectorAll(selected);
      do{
         p[t].style.removeProperty("font-size");
         t++;
      }
      while(t<p.length)  
   }
   
   if(selected == "section" || selected == "article" || selected == "body") {
      document.querySelector(":root").style.removeProperty("--fontsize2");
      document.querySelector(":root").style.removeProperty("--fontsize3");  
   }

   if (selected == "article" || selected == "body") {
      document.querySelector(":root").style.removeProperty("--fontsize1"); 
   }

   if (selected == "body") {
      document.querySelector(":root").style.removeProperty("--fontsize4"); 
   }

   if (selected !== "footer" || selected !== "header"){ 
      var i = 0;
      var x = document.querySelectorAll(".figure-text");
      do{
         x[i].style.removeProperty("font-size");
         i++;
      }
      while(i<x.length)
   }
}

/*
    ///// Section: Extra-stylesheet /////
*/ 

//make a stylesheet
//this stylesheet is meant for the menu that was created
var sheet = (function() {
	// create the <style> tag
	var style = document.createElement("style");

	// adds the style to the page
	document.head.appendChild(style);

	return style.sheet;
})();

//adding css-rules to the stylesheet
 sheet.insertRule('.menucontent { display: none; position: absolute; background-color: #544E68; width: 200px; z-index: 1; }', 0); 
 sheet.insertRule('.dropdown:hover .menucontent { display: block; }', 1);
 sheet.insertRule('.text-label { color: #FFD4A3; }', 2);