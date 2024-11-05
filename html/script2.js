document.addEventListener("DOMContentLoaded", () => {
    const HOST = 'http://localhost';
    const PUERTO = '3000';
    const URL_BANK = 'banks';

    fetch(HOST+':'+PUERTO+'/'+URL_BANK)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error('Error:', error));
});