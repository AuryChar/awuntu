// Váriaveis básicas
const userName = document.querySelector('#name');
const userPsswrd = document.querySelector('#password'); 
const inputs = [userName, userPsswrd]
let savedName;
let savedPsswrd;

// Verifica se já existe um usuário, caso exista, já redireciona
let existingName = localStorage.getItem('userName');
let existingPsswrd = localStorage.getItem('userPsswrd');

if (existingName && existingPsswrd) {
    window.location.href = 'lockScreen.html';
}

// Caso não exista, segue o processo padrão de criação de user
inputs.forEach(input => {
    input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            if (userName.value.trim() === '' || userPsswrd.value === '') {
                document.body.innerHTML += `can't be empty, please refresh the page`;
                return;
            }
            savedName = userName.value.trim();  
            savedPsswrd = userPsswrd.value;
            localStorage.setItem('userName', savedName);
            localStorage.setItem('userPsswrd', savedPsswrd);
            window.location.href = 'lockScreen.html';
        }
    });
});

