document.addEventListener('DOMContentLoaded', function () {
    getAdminState();
})

var loggedCookie = getCookieValue('logged')

if (loggedCookie == 'true') {
    document.getElementById('loginItem').style.display = 'none'
    document.getElementById('registerItem').style.display = 'none'
    document.getElementById('converterItem').style.display = 'block'
    document.getElementById('classlogout').style.display = 'block'

} else {
    document.getElementById('loginItem').style.display = 'block'
    document.getElementById('registerItem').style.display = 'block'
    document.getElementById('converterItem').style.display = 'none'
    document.getElementById('classlogout').style.display = 'none'
    document.getElementById('manageItem').style.display = 'none';

}

function getCookieValue(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return match[2];
    }
    else {
        console.log('Qualcosa è andato storto.');
    }
}

function getAdminState() {
    let value = getCookieValue('userID')
    let data = {_id: value}
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let admin = (JSON.parse(xhr.response)).admin
            if (!admin) {
                document.getElementById('manageItem').style.display = 'none'
            } else{
                document.getElementById('manageItem').style.display = 'block'
            }
        }
    }
    xhr.open('POST', '/getAdminValue', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}