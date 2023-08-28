// Dummy API URL; replace with your actual API URL
const API_URL = "https://8ag1p2bz7e.execute-api.eu-north-1.amazonaws.com/default/send_stock/a";

async function getapi(url) {
    const response = await fetch(url);

  const jsonData = await response.json();

  // Get a reference to the grid container element
  const gridContainer = document.querySelector('#grid-container');
  const searchInput = document.querySelector('#search-input');

  const columnDefs = [
    { headerName: "Brand", field: 'brand', sort:'asc', rowGroup: true, hide:true},
    { headerName: 'Item', field: 'name', sortable: true, filter: 'agTextColumnFilter', rowGroup:true},
    { headerName: 'Size', field: 'size', sortable: true, filter: 'agTextColumnFilter', floatingFilter:true},
    { headerName: 'Availbale Quantity', field: 'count', aggFunc: 'sum'},
    { headerName: 'Status', field: 'status'}
  ];

  const gridOptions = {
    columnDefs: columnDefs,
    rowData: jsonData,
    onFirstDataRendered: onFirstDataRendered,
    isGroupOpenByDefault: params => {
        return (params.field == 'name')
    },
  };

  hideloader();

  // Create the AG Grid instance
  new agGrid.Grid(gridContainer, gridOptions);
  searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    gridOptions.api.setQuickFilter(searchText);
  });
}
// Calling that async function
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
