const WordCloudDetails = function(data, wordCloudContainer) {

  this.wordCloudContainer     = wordCloudContainer

  this.wordCloud = {  chart: {
                    type: 'wordcloud',
                    renderTo: this.wordCloudContainer
                    },
            title: {
                    text: "Languages Word Cloud"
                    },
            series: [{
                      name: "Occurences",
                      data: data
                  }]
                }

};
