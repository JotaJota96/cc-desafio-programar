import { Component, OnInit } from '@angular/core';
import { inCardAnimation } from 'src/app/animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    inCardAnimation,
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
