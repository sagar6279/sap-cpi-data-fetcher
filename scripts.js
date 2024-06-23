async function fetchData(fromDate, toDate) {
    const endpoint = 'https://cda3fd4dtrial.it-cpitrial03-rt.cfapps.ap21.hana.ondemand.com/http/test';
    const username = 'sb-e6fc57a1-c651-4c52-adfe-6b35172aa05a!b34166|it-rt-cda3fd4dtrial!b196';
    const password = '9f098be9-ba55-4986-83b8-f9f4ba098aea$J3MTK7ED6qCxUBxz0evCcIFBszrBUFhVNLtDpvH4Tbw=';

    console.log('Fetching data from:', endpoint);
    console.log('From Date:', fromDate, 'To Date:', toDate);
    
    try {
        const response = await fetch(`${endpoint}?fromDate=${fromDate}&toDate=${toDate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${username}:${password}`)
            }
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data);
        
        return data;
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
    const fromDate = document.getElementById('from-date').value;
    const toDate = document.getElementById('to-date').value;

    if (!fromDate || !toDate) {
        alert('Please enter both From Date and To Date.');
        return;
    }

    console.log('Loading data...');
    const monitoringData = await fetchData(fromDate, toDate);
    const keystoreData = await fetchData(fromDate, toDate);

    console.log('Monitoring Data:', monitoringData);
    console.log('Keystore Data:', keystoreData);

    displayData('monitoring-data', monitoringData);
    displayData('keystore-data', keystoreData);
}
