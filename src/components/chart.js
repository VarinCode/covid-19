import Chart from "chart.js/auto";
import { fetchAPI } from "../../api/api";

const [newDeath, death, province, $case, $newCase , totalC , totalD] = [[], [], [], [], [], [] , []];

fetchAPI('https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces')
    .then(data => {
        // console.log(data)
        data.map(el => {
            if(el.province !== 'ทั้งประเทศ'){
                newDeath.push(el.new_death);
                province.push(el.province)
                death.push(el.total_death);
                $case.push(el.total_case);
                $newCase.push(el.new_case);
            } else {
                totalC.push(el.total_case);
                totalD.push(el.total_death);
            }
        })
    })

export function createChart() {
    new Chart(document.querySelector('#chart'), {
        type: 'line',
        options: {
            scales: {
                y: {
                    max: Math.max(...death, ...newDeath , ...$newCase , ...$case),
                    min: 0,
                    ticks: {
                        callback: value => `${value} คน`
                    }
                }
            }
        },
        data: {
            labels: province,
            datasets: [
                {
                    label: '# ผู้ป่วยรายใหม่',
                    data: $newCase,
                    borderWidth: 1.2,
                    backgroundColor: 'rgba(153, 102, 255, 0.9)',
                    borderColor: 'rgba(153, 102, 255, 0.9)',
                },
                {
                    label: '# ผู้ป่วยสะสม',
                    data: $case,
                    borderWidth: 1.2,
                    backgroundColor: 'rgba(255, 205, 86, 0.9)',
                    borderColor: 'rgba(255, 205, 86, 0.9)',
                },
                {
                    label: '# ผู้เสียชีวิตรายใหม่',
                    data: newDeath,
                    borderWidth: 1.2,
                    backgroundColor: 'rgba(54, 162, 235, 0.9)',
                    borderColor: 'rgba(54, 162, 235, 0.9)',
                }, {
                    label: '# ผู้เสียชีวิตสะสม',
                    data: death,
                    borderWidth: 1.2,
                    backgroundColor: 'rgba(255, 99, 132, 0.9)',
                    borderColor: 'rgba(255, 99, 132, 0.9)',
                }
            ]
        }
    });
    document.querySelector('.tt').innerHTML = `
        <div class="col-12 bg-success p-2 text-dark bg-opacity-25">
            <h2 class="text-center">ยอดผู้เสียชีวตในแต่ละจังหวัด</h2>
        </div>
    `
    document.querySelector('ul').innerHTML = `
        <li>ผู้ป่วยทั้งหมด: ${totalC}</li>
        <li>ผู้เสียชีวิตทั้งหมด: ${totalD}</li>
     `
}

export default function _Chart() {
    return `
        <div class="container cht">
            <div class="tt row my-5">
            </div>
            <div class="row">
                <ul></ul>
            </div>
            <div class="row d-flex">
                <div class="col-12"><canvas id="chart"></canvas></div>
            </div>
        </div>
        `
}