function chargerMessage() {
    fetch('https://backendfullstack-a5hhf8axd3cwcyf8.canadacentral-01.azurewebsites.net/api/hello')
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur HTTP " + response.status);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("message").innerText = data.message;
        })
        .catch(error => {
            document.getElementById("message").innerText = "Erreur API : " + error.message;
            console.error(error);
        });
}

// Appel automatique au chargement
window.onload = chargerMessage;
