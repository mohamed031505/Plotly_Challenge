//Plots
function loadCharts(id) {

  // console.log(id) 
  d3.json("samples.json").then((data) => {

    console.log(data);

    var selectedData = data.samples.filter(obj => obj.id == id)
    // console.log(selectedData); 

    var otuids_slice = selectedData[0].otu_ids.slice(0,10).map(x => `OTU ${x}`).reverse();
    var samplevalues_slice = selectedData[0].sample_values.slice(0,10).reverse();
    var otulabels_slice = selectedData[0].otu_labels.slice(0,10).reverse();

    // console.log(otuids_slice);
    // console.log(samplevalues_slice);
    // console.log(otulabels_slice);

    var otuids = selectedData[0].otu_ids;
    var samplevalues = selectedData[0].sample_values;
    var otulabels = selectedData[0].otu_labels;

    // console.log(otuids);
    // console.log(samplevalues);
    // console.log(otulabels);

    // Create your trace.
    var traceBar = {
      x: samplevalues_slice,
      y: otuids_slice,
      type: "bar",
      orientation: 'h',
      text: otulabels_slice
    };

    // Create the data array for our plot
    var data = [traceBar];

    // Define the plot layout
    var layout = {
      title: "Microbial Species",
      xaxis: { title: "Amount" },
      yaxis: { title: "Type" }
    };

    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar", data, layout);

    //BUILD BUBBLE CHART INSIDE FUNCTION 
    var traceBubble = {
      x: otuids,
      y: samplevalues,
      mode: 'markers',
      marker: {
        color: otuids,
        size: samplevalues,
        text: otulabels
      }
    };

    var data = [traceBubble];

    var layout = {
      showlegend: false,
      margin: {
        t: 30,
        l: 150
      },
      xaxis: {title:'OTU ID'}
    };

    Plotly.newPlot('bubble', data, layout);

  });

}

function buildTable(id) {
  d3.json("samples.json").then((data) => {  
  var selectedMetaData = data.metadata.filter(obj => obj.id == id)[0]
  var panelData = d3.select("#sample-metadata")
  panelData.html("")
  Object.entries(selectedMetaData).forEach (([key,value]) => {
    panelData.append("h6").text(`${key}: ${value}`);
  });
  
    })
}

//DROPDOWN
d3.json("samples.json").then((data) => {
  // console.log(data);

  // console.log(data.names); 

  var dropDown = d3.select("#selDataset");

  data.names.forEach((dataobj) => { 
    dropDown.append("option").text(dataobj).property("value", dataobj);
  }) 
  var id = data.names[0];  

  loadCharts(id)
  buildTable(id)
});

function optionChanged(selectedID) {

  loadCharts(selectedID)
  buildTable(selectedID)

}

