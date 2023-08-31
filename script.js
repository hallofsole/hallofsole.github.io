const API_URL = "https://8ag1p2bz7e.execute-api.eu-north-1.amazonaws.com/default/send_stock/a";

let jsonData =  ""

let gridOptions = {}

async function getapi(url) {
  const response = await fetch(url);

  jsonData = await response.json();

  const gridContainer = document.querySelector('#grid-container');
  const searchInput = document.querySelector('#search-input');

  const columnDefs = [
    { headerName: "Brand", field: 'brand', sort:'asc', sortable: true, filter: 'agTextColumnFilter', floatingFilter:true},
    { headerName: 'Item', field: 'name', sort:'asc', sortable: true, filter: 'agTextColumnFilter', minWidth:350},
    { headerName: 'Size', field: 'size', sortable: true, filter: 'agTextColumnFilter', floatingFilter:true},
    { headerName: 'Availbale Quantity', field: 'count'}
  ];

  gridOptions = {
    columnDefs: columnDefs,
    rowData: jsonData,
    onFirstDataRendered: onFirstDataRendered,
  };

  hideloader();

  // Create the AG Grid instance
  new agGrid.Grid(gridContainer, gridOptions);
  searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    gridOptions.api.setQuickFilter(searchText);
  });
  window.addEventListener('resize', function() {
    gridOptions.api.sizeColumnsToFit();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  getapi(API_URL);
});

// Function to hide the loader
function hideloader() {
	document.getElementById('loading').style.display = 'none';
}

function onFirstDataRendered(params) {
  params.api.sizeColumnsToFit();

}

function copyAll(){
  var text = gridOptions.api.getDataAsCsv({columnSeparator: "\t"})
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}
