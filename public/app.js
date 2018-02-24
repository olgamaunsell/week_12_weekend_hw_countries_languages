const app = function(){
  const url = "https://restcountries.eu/rest/v2/all"
  // const countriesList = [];
  make_request(url);
  // console.log("after request", countriesList);
  // const languageList = new LanguageList(countriesList);

}

make_request = function(url){
  const request = new XMLHttpRequest();
  const countriesToReturn = [];
  request.open("GET", url);
  request.addEventListener('load', convertJSONToCountries);
  request.send();

}

convertJSONToCountries = function(){
  if(this.status !== 200) return;

  const countries = JSON.parse(this.responseText);
  populateLanguages(countries);
};


populateLanguages = function(countries){
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

  console.log("languages", languagesList);
}


document.addEventListener('DOMContentLoaded', app);
