// import libs
import 'chart.js';
import 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import components
import Navabar from './components/navbar.js';
import Form, { search } from './components/form.js';
import Footer from './components/footer.js';
import Content from './components/content.js';
import _Chart  from './components/chart.js';

// import css
import './style/style.css';

function APP() {
  document.querySelector('#app').innerHTML = `
  ${Navabar()}
    <section class="container p-5">
      ${Form()}
      ${Content()}
      ${_Chart()}
    </section> 
  ${Footer()}
`
  document.querySelector('form').addEventListener('submit', search)
}

APP();
