// Final Sprint - Project 3 - JavaScript - js file
// Submitted by : Wayne Norman
// Date : Aug 12th, 2024



// Fetch and display data from JSON file using Fetch
fetch('./Project3-FinalSprint-JSON.json')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the data to inspect it
        displayData(data);
        displayDataInHTML(data);
        displayExtraFunctions(data); // Call the function to display extra functions in the console
    })
    .catch(error => console.error('Error fetching data:', error));


// Display data in console
function displayData(data) {
    data.forEach(record => console.log(`Name: ${record.name}, Nerve Control: ${record["nerve control"]}`));
}


// Display data in HTML in an "eye" catching way - pun intended
function displayDataInHTML(data) {
    const container = document.getElementById('data-container');
    data.forEach(record => {
        const recordDiv = document.createElement('div');
        recordDiv.className = 'record';
        recordDiv.innerHTML = `
            <p><strong>ID:</strong> ${record.id}</p>
            <p><strong>Name:</strong> ${record.name}</p>
            <p><strong>Structure:</strong> ${record.structure}</p>
            <p><strong>Function:</strong> ${record.function}</p>
            <p><strong>Location:</strong> ${record.location}</p>
            <p><strong>Nerve Control:</strong> ${record["nerve control"]}</p>
        `;
        container.appendChild(recordDiv);
    });
}




// Extra functions:

// Display extra functions in the console
function displayExtraFunctions(data) {
    console.log(`Names: ${getNames(data)}`);
    console.log(`Structures: ${getStructures(data)}`);
    console.log(`Functions: ${getFunctions(data)}`);
    console.log(`Keys: ${listKeys(data)}`);
    console.log(`Types: ${describeTypes(data)}`);
    console.log(`Item counts: ${countItems(data)}`);
    console.log(`Number summaries: ${summarizeNumbers(data)}`);
}


// Function to get names from data
const getNames = data => data.map(record => record.name).join(', ');

// Function to get structures from data
const getStructures = data => data.map(record => record.structure).join(', ');

// Function to get functions from data
const getFunctions = data => data.map(record => record.function).join(', ');

// Function to list all the keys in JSON file
const listKeys = data => Object.keys(data[0]).join(', ');

// Function to describe the type of each value in the JSON file
const describeTypes = data => Object.keys(data[0]).map(key => `${key}: ${typeof data[0][key]}`).join('; ');

// Function to count the number of items in each key
const countItems = data => Object.keys(data[0]).map(key => `${key}: ${data.length} items`).join('; ');

// Function to summarize numbers in the JSON file
const summarizeNumbers = data => Object.keys(data[0]).map(key => {
    if (Array.isArray(data[0][key]) && data[0][key].every(item => typeof item === 'number')) {
        const values = data.map(record => record[key]);
        return `${key}: sum=${values.reduce((a, b) => a + b, 0)}, min=${Math.min(...values)}, max=${Math.max(...values)}`;
    }
    return null;
}).filter(summary => summary !== null).join('; ');
