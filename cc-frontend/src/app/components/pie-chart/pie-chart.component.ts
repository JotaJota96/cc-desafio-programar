import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var Chart: any;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

   ngAfterViewInit(): void {
      // === include 'setup' then 'config' above ===
  const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];

 const data = {
  labels: labels,
  datasets: [{
    label: 'Empresas por rubro',
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    borderColor: 'rgb(0,0,0)',
    data: [0, 10, 5, 2, 20, 30],
  }]
};

 const config = {
  type: 'pie',
  data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
          legend: {
              display: false
        }
    }
  }
};

  var myChart = new Chart(
    document.getElementById('myChartPie'),
    config
  );
  }

}
