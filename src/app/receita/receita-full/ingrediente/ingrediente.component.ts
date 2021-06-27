import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})
export class IngredienteComponent implements OnInit {

  @Input() ingredient!: string;
  @Input() measure!: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.ingredient)
  }

}
