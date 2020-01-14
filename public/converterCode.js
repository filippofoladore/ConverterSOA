// document.getElementById('fileUploaded').onchange = function(event) {
//     var fileList = event.target.files;
//     console.log(fileList)
//     var xhr;
//     xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             console.log('caricato')           
//         }
//         xhr.open('POST', '/converter/doctopdf', true)
//         xhr.setRequestHeader('Content-Type', 'multipart/form-data')
//         xhr.send(fileList);
//     }
// }

