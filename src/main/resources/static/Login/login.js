document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previeni il comportamento di submit del form

    // Ottieni i valori degli input
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Qui puoi aggiungere la logica per inviare i dati al server, per esempio usando fetch
    console.log('Username:', username);
    console.log('Password:', password);

    // Per ora, semplicemente mostra un alert
    alert('Login attempted');
});
