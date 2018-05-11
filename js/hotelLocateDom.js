// Contents
// Section 1.0 Module imports.
// Section 2.0 Shared functions.
  // Section 2.1.0 cleanUpPage function. (Exported)
    // Section 2.1.1 emptyElement function.
  // Section 2.2 updatePageLayout function. (Exported)
// Section 3.0 Form related functions.
  // Section 3.1.0 getSearchCriteria function. (Exported)
    // Section 3.1.1 getSearchString function.
    // Section 3.1.2 getStarMin function.
    // Section 3.1.3 getDistanceMax function.
    // Section 3.1.4 getWifi function.
    // Section 3.1.5 getPool function.
    // Section 3.1.6 getPriceMin function.
    // Section 3.1.7 getPriceMax function.
    // Section 3.1.8 getMinMatch function.
    // Section 3.1.9 getSortType function.
  // Section 3.2 displayErrorMessages function. (Exported)
  // Section 3.3.0 setUpFormVisuals function. (Exported)
    // Section 3.3.1 focusElement function.
    // Section 3.3.2 unFocusElement function.
    // Section 3.3.3 updateStarMinDisplay function.
    // Section 3.3.4 updateDistanceMaxDisplay function.
    // Section 3.3.5 updateMinMatchDisplay function.
// Section 4.0 Hotel display functions.
  // Section 4.1.0 displaySearchResults function. (Exported)
  // Section 4.1.1.0 createHotelElements function.
    // Section 4.1.1.1 createDetailsList function.
  // Section 4.1.2 createNoHotelsMessage function.


// Section 1.0
// Module imports.
import {Hotel , SearchCriteria } from '../js/hotelSearch.js';


// Section 2.0
// Shared functions.

// Section 2.1.0
// Clears error messages and search results from the page.
export function cleanUpPage(){
  let modifiedElements = ["hotelOutput", "formErrorDiv", "priceMinErrorDiv", "priceMaxErrorDiv"];
  modifiedElements.forEach(function(elementId){
    emptyElement(elementId);
  })
}

// Section 2.1.1
// Removes all elements inside the specified element.
function emptyElement(elementId){
  const targetElement = document.getElementById(elementId);
  while (targetElement.firstChild) {
    targetElement.removeChild(targetElement.firstChild);
  }
}

// Section 2.2
// Changes the page layout and unhides appropriate elements after the user first searches.
export function updatePageLayout(){
  document.getElementById("hotelSearchForm").classList = "mainGridAfter";
  document.getElementById("logo").classList.remove("flexCenter");
  document.getElementById("logo").classList.add("flexStart");

  const hiddenElements = ["minMatchLabel", "minMatchDiv", "sortTypeLabel", "sortType"]
  hiddenElements.forEach(function(element){
    document.getElementById(element).classList.remove("startHidden");
  })
}

// Section 3.0
// Form related functions.

// Section 3.1.0
// Outputs a new search based on the criteria entered in the html form.
export function getSearchCriteria(){
  let outputSearch = new SearchCriteria;
  outputSearch.searchString = getSearchString();
  outputSearch.starMin = getStarMin();
  outputSearch.distanceMax = getDistanceMax();
  outputSearch.wifi = getWifi();
  outputSearch.pool = getPool();
  outputSearch.priceMin = getPriceMin();
  outputSearch.priceMax = getPriceMax();
  outputSearch.minMatch = getMinMatch();
  outputSearch.sortType = getSortType();
  return outputSearch;
}

// Section 3.1.1
function getSearchString(){
  return document.getElementById("textSearch").value;
}

// Section 3.1.2
function getStarMin(){
  return parseFloat(document.getElementById("starMin").value);
}

// Section 3.1.3
function getDistanceMax(){
  return parseFloat(document.getElementById("distanceMax").value);
}

// Section 3.1.4
function getWifi(){
  return document.getElementById("wifiRequire").checked;
}

// Section 3.1.5
function getPool(){
  return document.getElementById("poolRequire").checked;
}

// Section 3.1.6
function getPriceMin(){
  return parseFloat(document.getElementById("priceMin").value);
}

// Section 3.1.7
function getPriceMax(){
  return parseFloat(document.getElementById("priceMax").value);
}

// Section 3.1.8
function getMinMatch(){
  return parseInt(document.getElementById("minMatch").value);
}

// Section 3.1.9
function getSortType(){
  return parseInt(document.getElementById("sortType").value);
}

// Section 3.2
// Displays a message in the page if unsuitable form input was given.
export function displayErrorMessages(inputSearch){
  if (inputSearch.priceMin > inputSearch.priceMax) {
    let tempErrorMessage = document.createElement("p");
    tempErrorMessage.textContent = "Minimum price must be less than or equal to maximum price.";
    document.getElementById("formErrorDiv").appendChild(tempErrorMessage);
  }
  if (inputSearch.priceMin < 0 || inputSearch.priceMin === "") {
    let tempErrorMessage = document.createElement("p");
    if (inputSearch.priceMin === "") {
      tempErrorMessage.textContent = "Please enter a minimum price.";
    }else {
      tempErrorMessage.textContent = "Minimum price must be at least £0.";
    }
    document.getElementById("priceMinErrorDiv").appendChild(tempErrorMessage);
  }
  if (inputSearch.priceMax > 200 || inputSearch.priceMax === "") {
    let tempErrorMessage = document.createElement("p");
    if (inputSearch.priceMax === "") {
      tempErrorMessage.textContent = "Please enter a maximum price.";
    }else {
      tempErrorMessage.textContent = "Maximum price must no greater than £200.";
    }
    document.getElementById("priceMaxErrorDiv").appendChild(tempErrorMessage);
  }
}

// Section 3.3.0
// Adds visual effects to update the range input value labels, and mouseover/focus effects to the number inputs.
export function setUpFormVisuals(){
  document.getElementById("starMin").addEventListener("change", updateStarMinDisplay);
  document.getElementById("distanceMax").addEventListener("change", updateDistanceMaxDisplay);
  document.getElementById("minMatch").addEventListener("change", updateMinMatchDisplay);

  const wrappers = [document.getElementById("priceMinWrapper"), document.getElementById("priceMaxWrapper")];

  wrappers.forEach(function(wrapper){
    wrapper.addEventListener("mouseover",function(){
      focusElement(wrapper);
    })
  })

  wrappers.forEach(function(wrapper){
    wrapper.addEventListener("focusin",function(){
      focusElement(wrapper);
    })
  })

  wrappers[0].addEventListener("mouseout",function(){
    if (document.activeElement !== document.getElementById("priceMin")) {
      unFocusElement(wrappers[0]);
    }
  })

  wrappers[1].addEventListener("mouseout",function(){
    if (document.activeElement !== document.getElementById("priceMax")) {
      unFocusElement(wrappers[1]);
    }
  })

  wrappers.forEach(function(wrapper){
    wrapper.addEventListener("focusout",function(){
      unFocusElement(wrapper);
    })
  })
}

// Section 3.3.1
// Changes an elements classes to focused.
function focusElement(element){
  element.classList.remove("unFocusOutline");
  element.classList.add("focusOutline");
}

// Section 3.3.2
// Changes an elements classes to unfocused.
function unFocusElement(element){
  element.classList.remove("focusOutline");
  element.classList.add("unFocusOutline");
}

// Section 3.3.3
// Updates the minimum star label to show the slider's value.
function updateStarMinDisplay(){
  document.getElementById("starMinDisplay").textContent = `${getStarMin()}★`;
}

// Section 3.3.4
// Updates the maximum distance label to show the slider's value.
function updateDistanceMaxDisplay(){
  if (getDistanceMax() > 5) {
    document.getElementById("distanceMaxDisplay").textContent = "5+ mi.";
  }else {
    document.getElementById("distanceMaxDisplay").textContent = `${getDistanceMax()} mi.`;
  }
}

// Section 3.3.5
// Updates the minimum match percentage label to show the slider's value.
function updateMinMatchDisplay(){
  document.getElementById("minMatchDisplay").textContent = `${getMinMatch()}%`;
}

// Section 4.0
// Hotel display functions.

// Section 4.1.0
// Populates the hotelOutput <div> in the page with the appropriate search results.
export function displaySearchResults(inputSearch, inputHotels){
  if (inputHotels.length === 0) {
    const noHotelsMessage = createNoHotelsMessage()
    document.getElementById("hotelOutput").appendChild(noHotelsMessage);
  }else {
    let outputWrapperDiv = document.createElement("div");
    outputWrapperDiv.id = "outputWrapper";
    inputHotels.forEach(function(hotel){
      const tempHotelElements = createHotelElements(inputSearch, hotel);
      tempHotelElements.forEach(function(element){
        outputWrapperDiv.appendChild(element);
      })
    })
    document.getElementById("hotelOutput").appendChild(outputWrapperDiv);
  }
}

// Section 4.1.1
// Returns html elements based on search criteria and a given hotel.
function createHotelElements(inputSearch, inputHotel){
  let tempHotelElements = [];

  let hotelImage = document.createElement("img");
  hotelImage.classList = "hotelImage";
  hotelImage.src = inputHotel.imageUrl;
  hotelImage.alt = inputHotel.name;
  tempHotelElements.push(hotelImage);

  let tempHotelDiv = document.createElement("div");
  tempHotelDiv.classList = "hotelDetails";

  let hotelName = document.createElement("h2");
  hotelName.textContent = inputHotel.name;
  tempHotelDiv.appendChild(hotelName);

  let detailsList = createDetailsList(inputSearch, inputHotel);
  tempHotelDiv.appendChild(detailsList);
  tempHotelElements.push(tempHotelDiv);

  return tempHotelElements;
}

// Section 4.1.1.1
// Returns a <ul> listing a hotel's information.
function createDetailsList(inputSearch, inputHotel){
  let detailsList = document.createElement("ul");
  detailsList.classList = "hotelDetailsList";

  let hotelRelevance = document.createElement("li");
  hotelRelevance.textContent = `Relevance: ${inputSearch.calculateMatch(inputHotel)}%`;
  detailsList.appendChild(hotelRelevance);

  let starRating = document.createElement("li");
  let starString = "";
  for (let i = 0; i < inputHotel.star; i++) {
    starString += "★"
  }
  starRating.textContent = starString;
  detailsList.appendChild(starRating);

  let townDistance = document.createElement("li");
  townDistance.textContent = `${inputHotel.distance} mi. from the town centre.`;
  detailsList.appendChild(townDistance);

  let wifiDetails = document.createElement("li");
  wifiDetails.textContent = "WiFi: ";
  let tempWifiSpan = document.createElement("span");
  if (inputHotel.wifi) {
    tempWifiSpan.classList = "checkMark";
    tempWifiSpan.textContent = "✓";
  }else {
    tempWifiSpan.classList = "crossMark";
    tempWifiSpan.textContent = "✗";
  }
  wifiDetails.appendChild(tempWifiSpan);
  detailsList.appendChild(wifiDetails);

  let poolDetails = document.createElement("li");
  poolDetails.textContent = "Pool: ";
  let tempPoolSpan = document.createElement("span");
  if (inputHotel.pool) {
    tempPoolSpan.classList = "checkMark";
    tempPoolSpan.textContent = "✓";
  }else {
    tempPoolSpan.classList = "crossMark";
    tempPoolSpan.textContent = "✗";
  }
  poolDetails.appendChild(tempPoolSpan);
  detailsList.appendChild(poolDetails);

  let hotelPrice = document.createElement("li");
  hotelPrice.textContent = `£${inputHotel.price} per night`;
  detailsList.appendChild(hotelPrice);

  return detailsList;
}

// Section 4.1.2
// Returns a <div> containing a error message for when no hotels match the user's search.
function createNoHotelsMessage(){
  let failureWrapper = document.createElement("div");
  failureWrapper.classList = "noHotels";
  let failureMessage = document.createElement("p");
  failureMessage.textContent = "No hotels match your search.";
  failureWrapper.appendChild(failureMessage);
  return failureWrapper;
}
