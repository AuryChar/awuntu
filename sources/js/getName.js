// Variáveis básicas
const userName = document.querySelector('#name');
const userPsswrd = document.querySelector('#password');
const userPsswrdConfirm = document.querySelector('#password2');
const inputs = [userName, userPsswrd, userPsswrdConfirm];
const passwords = [userPsswrd, userPsswrdConfirm];

let savedName;
let savedPsswrd;

// Verifica se já existe um usuário, caso exista, já redireciona
let existingName = localStorage.getItem('userName');
let existingPsswrd = localStorage.getItem('userPsswrd');

if (existingName && existingPsswrd) {
    window.location.href = 'lockScreen.html';
}

function togglePsswrd() {
    passwords.forEach(password => {
        password.type = password.type === "password" ? "text" : "password";
    });
}


// Evento para capturar Enter e validar os inputs
inputs.forEach(input => {
    input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            if (userName.value.trim() === '' || userPsswrd.value === '') {
                alert('empty inputs, try again');
                return;
            }
            if (userPsswrdConfirm.value !== userPsswrd.value) {
                return;
            }
            // Salva no localStorage e redireciona
            savedName = userName.value.trim();
            savedPsswrd = userPsswrd.value;
            localStorage.setItem('userName', savedName);
            localStorage.setItem('userPsswrd', savedPsswrd);
            window.location.href = 'lockScreen.html';
        }
    });
    input.addEventListener('input', () => {
        if (userPsswrdConfirm.value !== userPsswrd.value) {
            userPsswrdConfirm.style.backgroundColor = 'red';
        } else {
            userPsswrdConfirm.style.backgroundColor = '';
        }
    })
});
