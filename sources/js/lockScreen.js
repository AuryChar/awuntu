// Verifica se existe um usuário salvo no localStorage
let existingName = localStorage.getItem('userName');
let existingPsswrd = localStorage.getItem('userPsswrd');

if (!existingName || !existingPsswrd) {
    // Redireciona para a página inicial se não existir
    window.location.href = 'index.html';
}

//-- Top Bar --//

// Função para obter os meses completos
function getFullMonths() {
    return [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
}

// Função para obter os meses abreviados
function getShortMonths() {
    return getFullMonths().map(month => month.slice(0, 3));
}

// Função para obter os dias da semana completos
function getFullWeeks() {
    return [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
}

// Função para obter o mês atual completo
function getCurrentFullMonth() {
    const date = new Date();
    return getFullMonths()[date.getMonth()];
}

// Função para obter o mês atual abreviado
function getCurrentShortMonth() {
    const date = new Date();
    return getShortMonths()[date.getMonth()];
}

// Função para obter o dia da semana atual completo
function getCurrentFullWeekDay() {
    const date = new Date();
    return getFullWeeks()[date.getDay()];
}

function getCurrentShortTime(callback) {
    function atualizar() {
        const date = new Date();
        const horas = date.getHours().toString().padStart(2, '0');
        const minutos = date.getMinutes().toString().padStart(2, '0');
        callback(`${horas}:${minutos}`);
    }

    atualizar(); // Atualiza imediatamente

    const segundosRestantes = 60 - new Date().getSeconds();
    setTimeout(() => {
        atualizar();
        setInterval(atualizar, 60000); // Atualiza a cada minuto exato
    }, segundosRestantes * 1000);
}

const notifications = document.querySelector('#notifications');
const date = new Date();

function atualizarNotificacoes() {
    getCurrentShortTime((horaMinuto) => {
        notifications.textContent = `${getCurrentShortMonth()} ${date.getDate()} ${horaMinuto}`;
    });
}

atualizarNotificacoes(); // Atualiza imediatamente
setInterval(atualizarNotificacoes, 60000); // Atualiza a cada minuto exato


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
