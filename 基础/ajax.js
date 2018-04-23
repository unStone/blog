var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('microsoft.XMLhttp');
xhr.open('get', 'https://www.baidu.com', true);
xhr.send();

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200 || xhr.status === 304) {
      console.log('is success')
    }
  }
}
