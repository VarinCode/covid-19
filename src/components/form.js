import { getData } from '/api/api.js';
import { createChart } from './chart.js';

import Swal from 'sweetalert2';
import 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const search = () => {
    event.preventDefault();
    getData.then((val) => {
        const province = val.map((item) => item.province);
        let index = province.indexOf(event.target[0].value.toString());
        if (index >= 0 && Number.isInteger(index)) {
            const data = val[index]; // ข้อมูลที่ค้นหา
            document.querySelector('.content').innerHTML = `
                    <div class="row my-5">
                        <div class="col-12 bg-success p-2 text-dark bg-opacity-25">
                            <h2>วันที่อัปเดตล่าสุด ${data.update_date}</h2>
                        </div>
                    </div>
                    <div class="row my-5 gap-5">
                        <div class="card col-5 shadow p-3 rounded  border-0 ">
                            <div class="card-body">
                                <i class="bi bi-geo-alt-fill fs-1"></i>
                                <h2 class="card-header mb-3 bg-white">จังหวัด</h2>
                                <h3 class="card-title">${data.province}</h3>
                            </div>
                        </div>
                        <div class="card col-5 shadow p-3 rounded  border-0 ">
                            <div class="card-body">
                                <i class="bi bi-hospital-fill fs-1"></i>
                                <h2 class="card-header mb-3 bg-white">ผู้ป่วยรายใหม่</h2>
                                <h3 class="card-title">${data.new_case}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="row my-5 gap-5">
                    <div class="card col-5 shadow p-3 rounded  border-0 ">
                    <div class="card-body">
                        <i class="bi bi-heart-pulse-fill fs-1"></i>
                        <h2 class="card-header mb-3 bg-white">ผู้ป่วยสะสม</h2>
                        <h3 class="card-title">${data.total_case}</h3>
                    </div>
                    </div>
                    <div class="card col-5 shadow p-3 rounded  border-0 ">
                        <div class="card-body">
                            <i class="bi bi-clipboard2-pulse-fill fs-1"></i>
                            <h2 class="card-header mb-3 bg-white">ผู้ป่วยเสียชีวิตรายใหม่</h2>
                            <h3 class="card-title">${data.new_death}</h3>
                        </div>
                    </div>
                    </div>
                `
            createChart();
        } else if (index < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'เกิดข้อผิดพลาดขึ้นโปรดพิมพ์ชื่อจังหวัดให้ถูกต้อง!',
            })
        }
        /*
            val.filter((value , index) => {
                if(value.province === event.target[0].value){
                    document.querySelector('.content').innerHTML = `
                        <div class="row my-5">
                            <div class="col-12 bg-success p-2 text-dark bg-opacity-25">
                                <h2>วันที่อัปเดตล่าสุด ${value.update_date}</h2>
                            </div>
                        </div>
                        <div class="row my-5 gap-5">
                            <div class="card col-5 shadow p-3 rounded  border-0 ">
                                <div class="card-body">
                                    <i class="bi bi-geo-alt-fill fs-1"></i>
                                    <h2 class="card-header mb-3 bg-white">จังหวัด</h2>
                                    <h3 class="card-title">${value.province}</h3>
                                </div>
                            </div>
                            <div class="card col-5 shadow p-3 rounded  border-0 ">
                                <div class="card-body">
                                    <i class="bi bi-hospital-fill fs-1"></i>
                                    <h2 class="card-header mb-3 bg-white">ผู้ป่วยรายใหม่</h2>
                                    <h3 class="card-title">${value.new_case}</h3>
                                </div>
                            </div>
                        </div>
                        <div class="row my-5 gap-5">
                            <div class="card col-5 shadow p-3 rounded  border-0 ">
                                <div class="card-body">
                                    <i class="bi bi-heart-pulse-fill fs-1"></i>
                                    <h2 class="card-header mb-3 bg-white">ผู้ป่วยสะสม</h2>
                                    <h3 class="card-title">${value.total_case}</h3>
                                </div>
                            </div>
                            <div class="card col-5 shadow p-3 rounded  border-0 ">
                                <div class="card-body">
                                    <i class="bi bi-clipboard2-pulse-fill fs-1"></i>
                                    <h2 class="card-header mb-3 bg-white">ผู้ป่วยเสียชีวิตรายใหม่</h2>
                                    <h3 class="card-title">${value.new_death}</h3>
                                </div>
                            </div>
                        </div>
                `
                createChart();
                process.exit();
            } 
        })
        */
    })
}

export { search };
export default function Form() {
    return `
        <form class="d-flex flex-column align-item-center justify-content-center gap-3 text-center mt-5">
            <h2 class="text-center"><a href="#" class="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">ค้นหาข้อมูลสถานการณ์ผู้ติดเชื้อ COVID-19 ในแต่ละจังหวัด</a></h2>
                <div class="input-group align-self-center mb-5 mt-2">
                    <label class="input-group-text" id="basic-addon1"><i class="bi bi-building-fill"></i></label>
                    <input type="text" placeholder="ค้นหาชื่อจังหวัด" class="p-3 form-control" value="กรุงเทพมหานคร" required />
                </div>
            <button type="submit" class="btn btn-primary align-self-center" >ค้นหา</button>
        </form>
    `
}
