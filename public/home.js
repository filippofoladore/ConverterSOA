document.addEventListener('DOMContentLoaded', function () {
    getAdminState();
})

var loggedCookie = getLoggedValue('logged')
var adminCookie = getLoggedValue('admin')


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

function getLoggedValue(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return match[2];
    }
    else {
        console.log('Qualcosa è andato storto.');
    }
}

function getAdminState() {
    var value = getLoggedValue('userID')
    var data = {_id: value}
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var admin = (JSON.parse(xhr.response)).admin
            console.log(typeof(admin))
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