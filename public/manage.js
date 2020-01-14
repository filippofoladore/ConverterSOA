document.addEventListener('DOMContentLoaded', function () {
    var xhr
    xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            displayNodes(xhr.response);
        }
    }
    xhr.open('GET', '/getNodes', true);
    xhr.send();
})

function displayNodes(data) {
    let area = document.getElementById('manageResult')
    let parsed = JSON.parse(data)
    for (i = 0; i < parsed.length; i++) {
        area.innerHTML += '<li class="userManage"> ID: ' + parsed[i]._id + " <br> Nome: " + parsed[i].name + " <br> Data creazione:" + parsed[i].dataCreazione + " </li> <br>"
    }
}
