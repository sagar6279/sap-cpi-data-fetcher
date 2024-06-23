async function fetchData(endpoint) {
    const response = await fetch(`https://cda3fd4dtrial.it-cpitrial03-rt.cfapps.ap21.hana.ondemand.com/http/test`, {
        method: 'GET', // or 'POST' depending on your SAP CPI endpoint
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('sb-e6fc57a1-c651-4c52-adfe-6b35172aa05a!b34166|it-rt-cda3fd4dtrial!b196:9f098be9-ba55-4986-83b8-f9f4ba098aea$J3MTK7ED6qCxUBxz0evCcIFBszrBUFhVNLtDpvH4Tbw=') // Replace with your credentials
        }
    });
    return response.json();
}

function displayData(containerId, data) {
    const container = document.getElementById(containerId);
    container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

async function loadMonitoringData() {
    try {
        const data = await fetchData('monitoring-endpoint'); // Replace with actual endpoint
        displayData('monitoring-data', data);
    } catch (error) {
        console.error('Error fetching monitoring data:', error);
        document.getElementById('monitoring-data').innerText = 'Failed to load data.';
    }
}

async function loadKeystoreData() {
    try {
        const data = await fetchData('keystore-endpoint'); // Replace with actual endpoint
        displayData('keystore-data', data);
    } catch (error) {
        console.error('Error fetching keystore data:', error);
        document.getElementById('keystore-data').innerText = 'Failed to load data.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadMonitoringData();
    loadKeystoreData();
});
