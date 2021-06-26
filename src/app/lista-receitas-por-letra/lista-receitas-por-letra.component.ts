import { Component, Input, OnInit } from '@angular/core';
import { Meal } from '../interfaces';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-lista-receitas-por-letra',
  templateUrl: './lista-receitas-por-letra.component.html',
  styleUrls: ['./lista-receitas-por-letra.component.css'],
})
export class ListaReceitasPorLetraComponent implements OnInit {
  @Input() letter!: string;

  meals: Meal[] = [];
  subscription: any;

  constructor(private mealService: MealService) {}

  getMealByFirstLetter(letter: string): void {
    this.subscription = this.mealService
      .getMealByFirstLetter(letter)
      .subscribe((meals) => (this.meals = meals));
  }

  ngOnInit(): void {
    this.getMealByFirstLetter(this.letter);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
