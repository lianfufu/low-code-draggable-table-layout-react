(function (baseFontSize) {
 let clientWidth = document.documentElement.clientWidth > 540 ? 375 : document.documentElement.clientWidth
 document.documentElement.style.fontSize = clientWidth / 10 + 'px';

 console.log('屏幕宽度:' + clientWidth);
 console.log('html字体大小设置:' + document.documentElement.style.fontSize);
})();