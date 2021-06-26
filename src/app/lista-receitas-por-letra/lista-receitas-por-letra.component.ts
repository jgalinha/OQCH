import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '../interfaces';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-lista-receitas-por-letra',
  templateUrl: './lista-receitas-por-letra.component.html',
  styleUrls: ['./lista-receitas-por-letra.component.css'],
})
export class ListaReceitasPorLetraComponent implements OnInit {
  @Input() letter!: string;

  meals!: Observable<Meal[]>;
  subscription: any;

  constructor(private mealService: MealService) {}

  getMealByFirstLetter(letter: string): Observable<Meal[]> {
    return this.mealService.getMealByFirstLetter(letter);
  }

  ngOnInit(): void {
    this.meals = this.getMealByFirstLetter(this.letter);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribedd();
  }
}
