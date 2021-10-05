// from data.js
var tableData = data;

//Select the table body
var tbody = d3.select("tbody");
//Initialize the button instance
var button = d3.select("#filter-btn");
//Select the user input for Date Field
var dateSelect = d3.select("#datetime");
var citySelect = d3.select("#city");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]


// Inputing the data into the HTML
var addData = (dataInput) => {
    dataInput.forEach(ufoSightings => {
        var row = tbody.append("tr");
        columns.forEach(column => row.append("td").text(ufoSightings[column])
        )
    });
}
addData(tableData);

// Setting up the Filter Button for Date and City
button.on("click", () => {
    d3.event.preventDefault();
    var inputDate = dateSelect.property("value").trim();
    var inputCity = citySelect.property("value").toLowerCase().trim();
    var filterDate = tableData.filter(tableData => tableData.datetime === inputDate);
    var filterCity = tableData.filter(tableData => tableData.city === inputCity);
    var filterCombinedData = tableData.filter(tableData => tableData.datetime === inputDate && tableData.city === inputCity);
    tbody.html("");

    let response = {
        filterDate, filterCity, filterCombinedData
    }
    if(response.filterCombinedData.length !== 0) {
        addData(filterCombinedData);
    }
    else if(response.filterCombinedData.length === 0 && ((response.filterDate.length !== 0 || response.filterCity.length !== 0))) {
        addData(filterDate) || addData(filterCity);
    }
    else {
        tbody.append("tr").append("td").text("No Sightings for the selected value.");
    }
})