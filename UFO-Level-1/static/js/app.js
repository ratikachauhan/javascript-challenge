// from data.js
var tableData = data;

//Select the table body
var tbody = d3.select("tbody");
//Initialize the button instance
var button = d3.select("#filter-btn");
//Select the user input for Date Field
var dateSelect = d3.select("#datetime");
//var citySelect = d3.select("#city");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

// Adding data into the HTML
var addData = (dataInput) => {
    dataInput.forEach(ufoSightings => {
        var row = tbody.append("tr");
        columns.forEach(column => row.append("td").text(ufoSightings[column])
        )
    });
}

addData(tableData);

// Setting the Filter Button for Date 
button.on("click", () => {
    d3.event.preventDefault();
    var inputDate = dateSelect.property("value").trim();
    var filterDate = tableData.filter(tableData => tableData.datetime === inputDate);
    tbody.html("");
    let response = {
        filterDate
    }

    if(response.filterDate.length !== 0) {
        addData(filterDate);
    }
        else {
            tbody.append("tr").append("td").text("Please select a Different Date. No Sightings for the selected Date");
        }
})