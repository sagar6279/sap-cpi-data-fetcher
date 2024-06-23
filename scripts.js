async function fetchData(endpoint) {
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('sb-e6fc57a1-c651-4c52-adfe-6b35172aa05a!b34166|it-rt-cda3fd4dtrial!b196:9f098be9-ba55-4986-83b8-f9f4ba098aea$J3MTK7ED6qCxUBxz0evCcIFBszrBUFhVNLtDpvH4Tbw=') // Replace with your credentials
            }
        });
        return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

function displayData(containerId, data) {
    const container = document.getElementById(containerId);
    if (data) {
        container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } else {
        container.innerHTML = 'Failed to load data.';
    }
}

async function loadData() {
    const endpoint = document.getElementById('cpi-endpoint').value;
    if (!endpoint) {
        alert('Please enter a valid SAP CPI endpoint.');
        return;
    }

    const monitoringData = await fetchData(`${endpoint}/monitoring-endpoint`); // Replace with actual endpoint
    const keystoreData = await fetchData(`${endpoint}/keystore-endpoint`); // Replace with actual endpoint

    displayData('monitoring-data', monitoringData);
    displayData('keystore-data', keystoreData);
}
