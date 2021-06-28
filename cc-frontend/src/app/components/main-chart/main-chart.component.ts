import { Component, OnInit, AfterViewInit } from '@angular/core';
//import { Chart } from 'chart.js';
declare var Chart: any;


@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss']
})
export class MainChartComponent implements OnInit, AfterViewInit {

  constructor() { 

  }

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
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
};

 const config = {
  type: 'line',
  data,
  options: {}
};

  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
  }

}
