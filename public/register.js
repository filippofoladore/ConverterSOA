var signupClick = document.getElementById('signup-submit')

signupClick.addEventListener('click', function (e) {
    e.preventDefault();
    data = {
        name: document.getElementById('name').value,
        email: document.getElementById('emailField').value,
        password: document.getElementById('password').value,
    }
    data = JSON.stringify(data)
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
            setTimeout(() => {
                window.location.href = 'http://localhost:3001/loginView'
           }, 1500);
        }
    }
    xhr.open('POST', '/user/register', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
})