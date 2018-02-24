const LanguageList = function(countries){
  this.countries = countries;
  this.languages = [];

};


LanguageList.prototype.populate = function() {

  this.countries.forEach(function(country){
    const languages = country.languages;
    const languageName = languages.map(function (language) {
      return language.name;
    });
    this.languages.push(languageName);
  });

  console.log("languages", this.languages);
}
