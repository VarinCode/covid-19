import viteLogo from '../img/vite.svg'

export default function Navabar(){
    return  `
    <nav class="navbar navbar-expand-lg bg-dark h-75">
    <div class="container d-flex align-items-center justify-content-between">
      <a class="navbar-brand" href="#">
        <img src=${viteLogo} width="50px" height="50px">
      </a>
    </div>
  </nav>
    `
}