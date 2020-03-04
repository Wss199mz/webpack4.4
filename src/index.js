import _ from 'lodash';
// import '@/static/css/index.css';
// import banner from './static/img/banner.jpg';
import printMe from './print.js';
import Data from './static/data';
function component () {
  var element = document.createElement('div');
  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  var btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.classList.add('hello');
  var myIcon = new Image();
  // myIcon.src = banner;
  console.log(Data);
  // element.appendChild(myIcon);
  element.appendChild(btn);
  return element;
}
document.body.appendChild(component());
