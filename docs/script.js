///////////////////
// CONFIGURATION //
///////////////////


// Path of the page directory
const pagesDirectory = "page/";

// Default html page (home page)
const defaultPage = "home";


//////////////////
// INCLUDE HTML //
//////////////////


/**
 * Function that injects a html file into a tag having the property include-html="path.html".
 * Source: https://www.w3schools.com/howto/howto_html_include.asp
 */
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    // Loop through a collection of all HTML elements:
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        // Search for elements with a certain atrribute:
        file = elmnt.getAttribute("include-html");
        if (file === "$page") {
            const urlParams = new URLSearchParams(window.location.search);
            let page = urlParams.get("page");
            if (!page) {
                page = defaultPage; 
            }
            file = pagesDirectory + page + ".html";
        }
        if (file) {
            // Make an HTTP request using the attribute value as the file name
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

/**
 * Function that is called when the page has finished loading.
 */
document.addEventListener("DOMContentLoaded", function (event) {
    includeHTML();
});


///////////////////
// OTHER SCRIPTS //
///////////////////

function randomColor() {
    var color = '#' + Math.random().toString(16).substr(2, 6);
    document.getElementById("basicButton").style.backgroundColor = color;
  
    document.getElementById("basicButton").innerHTML = color;
    console.log(color);
}


function openDetail(detailsElement) {
    var detailsArray = ["basicDetails", "advancedDetails", "proDetails", "elonMuskDetails"];
    if (document.getElementById(detailsElement).open) {
        document.getElementById(detailsElement).open = false;
    }
    else{
        detailsArray.forEach(id => {
            document.getElementById(id).open = false;
        });
        document.getElementById(detailsElement).open = true;
    }
}
function clearInput() {
    document.getElementById("name").value = "";
    document.getElementById("Postadresse").value = "";
    document.getElementById("anliegen").value = "Danke für Ihre Einsendung";
}