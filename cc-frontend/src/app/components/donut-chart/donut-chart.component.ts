import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var Chart: any;

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit, AfterViewInit {

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
    label: 'My First dataset',
    //backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(0, 0, 0)',
    data: [11, 10, 5, 2, 20, 30],
  }]
};

 const config = {
  type: 'doughnut',
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
    document.getElementById('myChartDonut'),
    config
  );
  }

}
