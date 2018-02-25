const app = function(){
  const url = "https://restcountries.eu/rest/v2/all"
  // const countriesList = [];
  make_request(url);
  // console.log("after request", countriesList);
  // const languageList = new LanguageList(countriesList);

}

const make_request = function(url){
  const request = new XMLHttpRequest();
  const countriesToReturn = [];
  request.open("GET", url);
  request.addEventListener('load', convertJSONToCountries);
  request.send();

}

const convertJSONToCountries = function(){
  if(this.status !== 200) return;

  const countries = JSON.parse(this.responseText);
  populateLanguages(countries);
};


const populateLanguages = function(countries){

  const languagesList = {};
  countries.forEach(function(country, index){
    const languages = country.languages;
    const countryLanguagesName = languages.map(function (language) {
      return language.name;
    });
    // console.log("countryLanguagesName", countryLanguagesName);

    const countryIndex = index;
    // console.log("country index", countryIndex);
    countryLanguagesName.forEach(function(language){

      const countryLanguages = languages;
      // console.log("language", language);

      if(language in languagesList){
        languagesList[language].push(countryIndex)
      } else {
        languagesList[language] = [countryIndex]
      }

    });


  }.bind(this));

  // Create word cloud
  // create data array to pass to word cloud

  let languagesDataArray = [];
  const keys = Object.keys(languagesList);

  for (key of keys) {

    const language = key;
    const countryCount = languagesList[key].length
    languageHash = {
      name: language,
      weight: countryCount
    }

    languagesDataArray.push(languageHash);
  }

  console.log("languagesDataArray", languagesDataArray);

  const wordCloudContainer    = document.querySelector("#word-cloud");

  const wordCloudDetails    = new WordCloudDetails(languagesDataArray, wordCloudContainer);

  new WordCloud(wordCloudDetails.wordCloud);

  populateLanguagesDropdown(keys, languagesList, countries);
};

const populateLanguagesDropdown = function (keys, languagesList, countries) {

  const dropdown = document.querySelector("#languages");
  const languages = keys.sort();

  languages.forEach(function (language, index) {
    const option = document.createElement("option");
    option.value = index;
    option.innerText = language;
    dropdown.appendChild(option);
  });

  const handleLanguageSelectChanged = function () {

    document.getElementById('countries').innerText = null
    document.getElementById('country-info').innerText = null
    
    const selectedLanguage = languages[this.value];

    const countryIndices = languagesList[selectedLanguage];
    console.log("countryIndices",countryIndices );
    console.log("countries", countries);

    populateLanguageCountriesDropDown(countryIndices, countries);

  }
  dropdown.addEventListener('change', handleLanguageSelectChanged);
};

const populateLanguageCountriesDropDown = function(countryIndices, countries){
  const dropdown = document.querySelector("#countries");

  const languageCountries = [];

  countries.forEach(function(country, index){
    if(countryIndices.includes(index)){
      languageCountries.push(country);
    }
  });

  languageCountries.forEach(function (country, index) {
    const option = document.createElement("option");
    option.value = index;
    option.innerText = country.name;
    dropdown.appendChild(option);
  });

  const handleCountrySelectChanged = function () {

    const selectedCountry = languageCountries[this.value];

    const ul = document.getElementById("country-info");
    ul.innerHTML = "";
    const name = document.createElement('li');
    name.innerText = `Country name: ${selectedCountry.name}`
    const population = document.createElement('li');
    population.innerText = `Population: ${selectedCountry.population}`;
    const capital = document.createElement('li');
    capital.innerText = `Capital City: ${selectedCountry.capital}`;

    ul.appendChild(name);
    ul.appendChild(population);
    ul.appendChild(capital);

  }

  dropdown.addEventListener('change', handleCountrySelectChanged);
};

document.addEventListener('DOMContentLoaded', app);
