export default function Footer(){
    const year = new Date().getFullYear();
    return `
        <footer class="d-flex justify-content-center align-item-center position-absolute bottom-0 text-bg-dark w-100 mt-5" style="height:40px">
            <p class="text-center mt-2">&copy;${year} Copyright</p>
        </footer>
    `
}