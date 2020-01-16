var loginClick = document.getElementById('login-submit')

loginClick.addEventListener('click', function (e) {
    e.preventDefault();
    data = {
        email: document.getElementById('emaillogin').value,
        password: document.getElementById('passwordlogin').value,
    }
    data = JSON.stringify(data)
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            setTimeout(() => {
                window.location.href = 'http://localhost:3001/'
            }, 1500);

        }
    }
    xhr.open('POST', '/user/login', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
})