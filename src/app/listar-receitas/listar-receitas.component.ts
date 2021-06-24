import { Component, OnInit } from '@angular/core';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-listar-receitas',
  templateUrl: './listar-receitas.component.html',
  styleUrls: ['./listar-receitas.component.css']
})
export class ListarReceitasComponent implements OnInit {

  currentUrl: any = '';

  constructor(private mealService: MealService) {
  }

  ngOnInit(): void {
  }

}
