// Login
const signUpEmail = document.getElementById("signUpEmail");
const signUpPswd = document.getElementById("signUpPswd");
const user_name = document.getElementById("user_name");
const signUpImage = document.getElementById("signUpImage");
// Login
const logInEmail = document.getElementById("logInEmail");
const logInPswd = document.getElementById("logInPswd");
const signUp = document.getElementById("signUp");
const logIn = document.getElementById("logIn");
const signUpForm = document.getElementById("signUpForm");
const logInForm = document.getElementById("logInForm");

let userData = JSON.parse(localStorage.getItem("userData")) || [];
const message = document.getElementById("authMessage");

if (!Array.isArray(userData)) {
    userData = [];
}

// Event listeners
function showMessage(text, type) {
    const message = document.getElementById("authMessage");
    message.textContent = text;
    message.className = `auth-message show ${type}`;

    setTimeout(() => {
        message.style.animation = "hideMessage 0.5s forwards";
        setTimeout(() => {
            message.classList.remove("show");
            message.style.animation = "";
        }, 500);
    }, 3000);
}

// Обновленный код для регистрации и входа:
signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const file = document.getElementById("signUpImage").files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const newUser = { 
            userName: document.getElementById("signUpUserName").value.trim(),
            email: signUpEmail.value.trim(),
            pswd: signUpPswd.value.trim(),
            img: event.target.result
        };

        if (!newUser.userName || !newUser.email || !newUser.pswd) {
            showMessage("Заполните все поля!", "error");
            return;
        } else if (userData.some(user => user.email === newUser.email)) {
            showMessage("Этот email уже используется!", "error");
            return;
        }

        userData.push(newUser);
        localStorage.setItem("userData", JSON.stringify(userData));
        showMessage("Вы зарегистрировались!", "success");
        localStorage.setItem("user", JSON.stringify(newUser));
        window.location.href = "ai.html";

        signUpForm.reset();
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        showMessage("Выберите изображение!", "error");
    }
});

logInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputEmail = logInEmail.value.trim();
    const inputPassword = logInPswd.value.trim();
    const user = userData.find(user => user.email === inputEmail);

    if (!user) {
        showMessage("Пользователь не найден!", "error");
        return;
    }

    if (user.pswd !== inputPassword) {
        showMessage("Неверный пароль!", "error");
        return;
    }
    
    localStorage.setItem("user", JSON.stringify(user));

    showMessage("Вход выполнен!", "success");
    logInForm.reset();
    
    setTimeout(() => {
        window.location.href = "ai.html";
    }, 1000);
});

