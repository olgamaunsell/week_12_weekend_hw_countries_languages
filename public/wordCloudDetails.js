const WordCloudDetails = function(data, wordCloudContainer) {

  this.wordCloudContainer     = wordCloudContainer

  this.wordCloud = {  chart: {
                    type: 'wordcloud',
                    renderTo: this.wordCloudContainer
                    },
            title: {
                    text: "Occurences of Languages spoken in world wide countries"
                    },
            series: [{
                      name: "Occurences",
                      data: data
                  }]
                }

};
