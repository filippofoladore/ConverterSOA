var loggedCookie = getLoggedValue('logged')
var adminCookie = getLoggedValue('admin')


if (loggedCookie == 'true') {
    console.log('logged')
    document.getElementById('loginItem').style.display = 'none'
    document.getElementById('registerItem').style.display = 'none'
    document.getElementById('converterItem').style.display = 'block'
    document.getElementById('classlogout').style.display = 'block'
    
} else {
    document.getElementById('loginItem').style.display = 'block'
    document.getElementById('registerItem').style.display = 'block'
    document.getElementById('converterItem').style.display = 'none'
    document.getElementById('classlogout').style.display = 'none'
    document.getElementById('manageItem').style.display  = 'none';
    
} 

if (adminCookie  == 'false') {
    document.getElementById('manageItem').style.display = 'none'
} else if (adminCookie == 'true') {
    document.getElementById('manageItem').style.display = 'block'
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

