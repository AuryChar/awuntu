// Verifica se existe um usuário salvo no localStorage
let existingName = localStorage.getItem('userName');
let existingPsswrd = localStorage.getItem('userPsswrd');

if (!existingName || !existingPsswrd) {
    // Redireciona para a página inicial se não existir
    window.location.href = 'index.html';
}

//-- Centro --//

const user = document.querySelector('.user');
const loginArea = document.querySelector('.loginArea');
const backLockScreen = document.querySelector('#backLockScreen');
const password = document.querySelector('#password');
let log;

user.innerHTML = `<i class="bi bi-person"></i>${existingName}`;

user.addEventListener('click', () => {
    user.style = 'display: none;';
    loginArea.style = 'display: flex;';
});

backLockScreen.addEventListener('click', () => {
    loginArea.style = 'display: none;';
    user.style = 'display: flex';
});

let isLogged = localStorage.getItem('log');
if (isLogged) {
    window.location.href = 'system.html';
}

password.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        let oldError = document.querySelector('.error-msg');
        if (oldError) {
            oldError.remove();
        }

        if (password.value === '' || password.value !== existingPsswrd) {
            let errorElement = document.createElement('p');
            errorElement.textContent = 'Empty or wrong password, try again.';
            errorElement.style.color = '#dc4c4c';
            errorElement.classList.add('error-msg');
            loginArea.appendChild(errorElement);
        } else {
            log = true;
            localStorage.setItem('log', log);
            window.location.href = 'system.html';
        }
    }
});
