async function fetchData() {
    const parameter = document.getElementById('parameter').value;
    const responseDiv = document.getElementById('response');

    responseDiv.innerHTML = 'Fetching data...';

    try {
        const response = await fetch('https://cda3fd4dtrial.it-cpitrial03-rt.cfapps.ap21.hana.ondemand.com/http/test', {
            method: 'GET', // or 'POST' depending on your SAP CPI endpoint
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('sb-e6fc57a1-c651-4c52-adfe-6b35172aa05a!b34166|it-rt-cda3fd4dtrial!b196:9f098be9-ba55-4986-83b8-f9f4ba098aea$J3MTK7ED6qCxUBxz0evCcIFBszrBUFhVNLtDpvH4Tbw=') // Basic Auth for simplicity
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        responseDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        console.error("Error occurred:", error);
        responseDiv.innerHTML = 'Error fetching data. Please try again.';
    }
}
