// Contents
// Section 1.0 Hotel Class. (Exported)
  // Section 1.1 toString method.
  // Section 1.2 toArray method.
// Section 2.0 SearchCriteria Class. (Exported)
  // Section 2.1 cleanSearchString method.
  // Section 2.2 getSearchTerms method.
  // Section 2.3 detectSearchTerms method.
  // Section 2.4 isAcceptableHotel method.
  // Section 2.5 calculateMatch method.
  // Section 2.6 getAcceptableHotels method.
  // Section 2.7.0 switchQuickSortHotels method.
    // Section 2.7.1 switchSortCriteria method.
  // Section 2.8 isValid method.


// Section 1.0
export class Hotel {
  constructor(name,star,distance,wifi,pool,price,imageUrl) {
    this.name = name;
    this.star = star;
    this.distance = distance;
    this.wifi = wifi;
    this.pool = pool;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  // Section 1.1
  // Mostly just for testing.
  toString(){
    return `${this.name} ${this.star} ${this.distance} ${this.wifi} ${this.pool} £${this.price}`;
  }

  // Section 1.2
  // Also just for testing.
  toArray(){
    return [this.name, this.star, this.distance, this.wifi, this.pool, this.price];
  }

}

// SearchCriteria objects contain:
// A string from a text search that will be broken down by a method into an array of search terms before use.
// A minimum star rating.
// A maximum distance from the city centre.
// A bool for wifi preference.
// A bool for pool preference.
// A minimum price per night.
// A maximum price per night.
// A minimum Match Percentage.
// A sort type.

// new SearchCriteria(string,int,int,bool,bool,int,int,int,int)

// Section 2.0
export class SearchCriteria {
  constructor(searchString, starMin, distanceMax, wifi, pool, priceMin, priceMax, minMatch, sortType) {
    this.searchString = searchString;
    this.starMin = starMin;
    this.distanceMax = distanceMax;
    this.wifi = wifi;
    this.pool = pool;
    this.priceMin = priceMin;
    this.priceMax = priceMax;
    this.minMatch = minMatch;
    this.sortType = sortType;
  }

  // Section 2.1
  // Returns the entered string after removing unacceptable characters and converting to lower case.
  static cleanSearchString(string){
    const acceptableCharacters = "abcdefghijklmnopqrstuvwxyz ";
    let charArray = (string.toLowerCase()).split("");
    charArray = charArray.filter(function(char){
      if (acceptableCharacters.indexOf(char) >= 0) {
        return true;
      }
      return false;
    })
    return charArray.join("");
  }

  // Section 2.2
  //Returns an array of all the words in the searchString after removing spaces and converting to lower case.
  getSearchTerms(){
    const termsString = SearchCriteria.cleanSearchString(this.searchString);
    let searchTerms = termsString.split(" ");
    searchTerms = searchTerms.filter(function(term){
      if (term === "") {
        return false;
      }
      return true;
    })
    return searchTerms;
  }

  // Section 2.3
  // Returns true if any of the search terms in the searchString appears in the hotel.name or if there are no search terms in the searchString, else returns false. (currently unused)
  detectSearchTerms(inputHotel){
    const searchTerms = this.getSearchTerms();
    if (searchTerms.length === 0) {
      return true;
    }
    for (let i = 0; i < searchTerms.length; i++) {
      if (((inputHotel.name).toLowerCase()).indexOf(searchTerms[i]) >= 0) {
        return true;
      }
    }
    return false;
  }

  // Section 2.4
  // Returns a bool indicating if the given hotel matches the minimum requirements of the search.
  isAcceptableHotel(inputHotel){
    return this.calculateMatch(inputHotel) >= this.minMatch;
  }

  // Section 2.5
  // Returns 0 to 100 depending on how closely the given hotel matches the search criteria.
  calculateMatch(inputHotel){
    let matchPercent = 0;
    this.getSearchTerms().forEach(function(term){
      if (((inputHotel.name).toLowerCase()).indexOf(term) >= 0) {
        matchPercent++;
      }
    })
    if (inputHotel.star >= this.starMin) {
      matchPercent++;
    }
    if (inputHotel.distance <= this.distanceMax || this.distanceMax > 5) {
      matchPercent++;
    }
    if (!(this.wifi && !inputHotel.wifi)) {
      matchPercent++;
    }
    if (!(this.pool && !inputHotel.pool)) {
      matchPercent++;
    }
    if (inputHotel.price <= this.priceMax && inputHotel.price >= this.priceMin) {
      matchPercent++;
    }
    return parseInt((matchPercent * 100) / (5 + (this.getSearchTerms()).length));
  }

  // Section 2.6
  // Filters an array of hotels, removing those that don't meet the minimum requirements of the search criteria.
  getAcceptableHotels(inputHotels){
    const inputSearch = this;
    const acceptablehotels = inputHotels.filter(function(hotel){
      return inputSearch.isAcceptableHotel(hotel);
    })
    return acceptablehotels;
  }

  // Section 2.7.0
  // switchQuickSortHotels a multipurpose hotel array sorting method.
  // Sort type: 0 = Name Ascending, 1 = Name Descending, 2 = Star Ascending, 3 = Star Descending, 4 = Distance Ascending, 5 = Distance Descending, 6 = WiFi Ascending, 7 = WiFi Descending, 8 = Pool Ascending, 9 = Pool Descending, 10 = Price Ascending, 11 = Price Descending, 12 = Match Percentage Ascending, 13 = Match Percentage Descending.
  switchQuickSortHotels(inputHotels){
    if (inputHotels.length <= 1) {
      return inputHotels;
    }else {
      let leftArray = [];
      let rightArray = [];
      let pivotHotel = inputHotels[(inputHotels.length -1)];
      for (let i = 0; i < (inputHotels.length -1); i++) {
        if (this.switchSortCriteria(inputHotels[i],pivotHotel)) {
          leftArray.push(inputHotels[i]);
        }else {
          rightArray.push(inputHotels[i]);
        }
      }
      return this.switchQuickSortHotels(leftArray).concat(pivotHotel, this.switchQuickSortHotels(rightArray));
    }
  }

  // Section 2.7.1
  // switchSortCriteria a sub method of switchQuickSortHotels, it selects the appropriate sort criteria based on sortType as described in 3.7.0
  switchSortCriteria(inputHotel,pivotHotel){
    switch (this.sortType) {
      case 0:
        return inputHotel.name <= pivotHotel.name;
        break;
      case 1:
        return inputHotel.name >= pivotHotel.name;
        break;
      case 2:
        return inputHotel.star <= pivotHotel.star;
        break;
      case 3:
        return inputHotel.star >= pivotHotel.star;
        break;
      case 4:
        return inputHotel.distance <= pivotHotel.distance;
        break;
      case 5:
        return inputHotel.distance >= pivotHotel.distance;
        break;
      case 6:
        return !inputHotel.wifi;
        break;
      case 7:
        return inputHotel.wifi;
        break;
      case 8:
        return !inputHotel.pool;
        break;
      case 9:
        return inputHotel.pool;
        break;
      case 10:
        return inputHotel.price <= pivotHotel.price;
        break;
      case 11:
        return inputHotel.price >= pivotHotel.price;
        break;
      case 12:
        return this.calculateMatch(inputHotel) <= this.calculateMatch(pivotHotel);
        break;
      case 13:
        return this.calculateMatch(inputHotel) >= this.calculateMatch(pivotHotel);
        break;
      default:
        console.log(`Invalid sort type: ${sortType}`);
        break;
    }
  }

  // Section 2.8
  // Checks if any of the search objects attributes are outside normal ranges.
  isValid(){
    if (this.priceMin > this.priceMax || this.priceMin < 0 || this.priceMax > 200 || this.priceMin === "" || this.priceMax === "") {
      return false;
    }
    return true;
  }

}
