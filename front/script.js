function direBonjour() {
    fetch('https://backendfullstack-a5hhf8axd3cwcyf8.canadacentral-01.azurewebsites.net/api/hello')
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur HTTP " + response.status);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            alert("Erreur API : " + error.message);
            console.error(error);
        });
}
