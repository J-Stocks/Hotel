// Contents
// Section 1.0 Module imports.
// Section 2.0 Event listeners and page behaviour.
  // Section 2.1 page load event listener.
  // Section 2.2 firstSearch function.
  // Section 2.3 addFormChangeEvents function.
  // Section 2.4 processForm function.

// Section 1.0
// Module imports.
import { Hotel , SearchCriteria } from '../js/hotelSearch.js';
import { generateHotels } from '../js/hotelData.js';
import {
  cleanUpPage,
  displayErrorMessages,
  displaySearchResults,
  getSearchCriteria,
  setUpFormVisuals,
  updatePageLayout
} from '../js/hotelLocateDom.js';

// Section 2.0
// Event listeners and page behaviour.

// Section 2.1
// Page load event listener. Adds cosmetic behaviour to the form and allows inital searching from the searchButton.
window.addEventListener("load", function(){
	document.getElementById("searchButton").addEventListener("click",firstSearch);
  setUpFormVisuals();
});

// Section 2.2
// Removes the inital event listener from the search button and sets up the normal form behaviour upon valid search, otherwise displays error messages.
function firstSearch(){
  if (getSearchCriteria().isValid()) {
    document.getElementById("searchButton").removeEventListener("click", firstSearch);
    document.getElementById("searchButton").addEventListener("click",processForm);
    updatePageLayout();
    addFormChangeEvents();
  }
  processForm();
}

// Section 2.3
// Adds change event listeners to all the main form controls.
function addFormChangeEvents(){
  const formElementIds = ["textSearch", "starMin", "distanceMax", "wifiRequire", "poolRequire", "priceMin", "priceMax", "minMatch", "sortType"];
  formElementIds.forEach(function(elementId){
    document.getElementById(elementId).addEventListener("change",processForm);
  })
}

// Section 2.4
// Normal form behaviour.
function processForm(){
  cleanUpPage();
  const userSearch = getSearchCriteria();
  if (userSearch.isValid()) {
    let hotels = generateHotels();
    hotels = userSearch.getAcceptableHotels(hotels);
    hotels = userSearch.switchQuickSortHotels(hotels)
    displaySearchResults(userSearch, hotels);
  }else {
    displayErrorMessages(userSearch);
  }
}
