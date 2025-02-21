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


if (!Array.isArray(userData)) {
    userData = [];
}




// Event listeners
signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const file = document.getElementById("signUpImage").files[0]; // Получаем файл
    const reader = new FileReader();

    reader.onload = function (event) {
        const newUser = { 
            userName: document.getElementById("signUpUserName").value.trim(),
            email: signUpEmail.value.trim(),
            pswd: signUpPswd.value.trim(),
            img: event.target.result // Base64-строка
        };

        if (!newUser.userName || !newUser.email || !newUser.pswd) {
            alert("Заполните все поля!");
            return;
        } else if (userData.some(user => user.email === newUser.email)) {
            alert("Пользователь с таким email уже существует!");
            return;
        }

        userData.push(newUser);
        localStorage.setItem("userData", JSON.stringify(userData));
        alert("Вы успешно зарегистрировались!");
        signUpForm.reset();
    };

    if (file) {
        reader.readAsDataURL(file); // Читаем файл как Base64
    } else {
        alert("Выберите изображение!");
    }
});

logInForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputEmail = logInEmail.value.trim();
    const inputPassword = logInPswd.value.trim();
    const user = userData.find(user => user.email === inputEmail);

    if (!user) {
        alert("Пользователь не найден!");
        return;
    }

    if (user.pswd !== inputPassword) {
        alert("Неверный пароль!");
        return;
    }

    localStorage.setItem("user", JSON.stringify(user)); // Сохраняем текущего пользователя

    alert("Вы успешно вошли!");
    logInForm.reset();
    window.location.href = "index.html";
});

