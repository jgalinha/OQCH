import { Component, Input, OnInit } from '@angular/core';
import { Meal } from '../interfaces';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.css']
})
export class ReceitaComponent implements OnInit {

  @Input() meal!: Meal;

  constructor() { }

  ngOnInit(): void {
  }

}
