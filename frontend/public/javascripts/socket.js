socket.on('data_push', function data_update(temp) {
    //console.log(temp);
    //temp humid light
    var temparray = temp[0]
    var humidarray = temp[1]
    var lightarray = temp[2]
    
    temp = []
    humid = []
    lightarray = []
    x = []


    for(var i = 0; i < temparray.length(); i++) {
      temp.push(temparray[i]['val'])
      humid.push(humidarray[i]['val'])
      light.push(lightarray[i]['var'])
      x.push(temparray[i]['time'])
    }

    var light_data = [
      {
        x: x,
        y: light,
        type: 'scatter',
        mode: 'lines'
      }
    ];

    var layout = {
      xaxis: {
        title: 'Time',
        titlefont: {
        size: 16,
        color: '#7f7f7f'
        }
      },
      yaxis: {
        title: 'Percentage of Brightness',
        titlefont: {
        size: 16,
        color: '#7f7f7f'
        }
      }
    };

    Plotly.newPlot('LGraph', light_data, layout);

    var humid_data = [
      {
        x: x,
        y: humid,
        type: 'scatter',
        mode: 'lines'
      }
    ];

    var layout = {
      xaxis: {
        title: 'Time',
        titlefont: {
        size: 16,
        color: '#7f7f7f'
        }
      },
      yaxis: {
        title: 'Percentage of Humidty',
        titlefont: {
        size: 16,
        color: '#7f7f7f'
        }
      }
    };

    Plotly.newPlot('HGraph', humid_data, layout);

    var temp_data = [
      {
        x: x,
        y: temp,
        type: 'scatter',
        mode: 'lines'
      }
    ];

    var layout = {
      xaxis: {
        title: 'Time',
        titlefont: {
        size: 16,
        color: '#7f7f7f'
        }
      },
      yaxis: {
        title: 'Fahrenheit',
        titlefont: {
        size: 16,
        color: '#7f7f7f'
        }
      }
    };

    Plotly.newPlot('TGraph', temp_data, layout);





});