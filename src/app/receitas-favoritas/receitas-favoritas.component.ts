import { Component, OnInit } from '@angular/core';
import { Meal, Ratting } from '../interfaces';
import { IdbService } from '../services/idb.service';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-receitas-favoritas',
  templateUrl: './receitas-favoritas.component.html',
  styleUrls: ['./receitas-favoritas.component.css']
})
export class ReceitasFavoritasComponent implements OnInit {

  rattings: Ratting[] = [];
  meals: Meal[] = [];

  getMeals():void {
    this.rattings.forEach(ratting => {
      if (ratting.favourite) {
        this.mealService.getMealById(ratting.idMeal).subscribe(data => {
          this.meals.push(data)
        });
      }
    })
  }

  removeRating(idMeal: any) {
    console.log("received")
  }

  constructor(private idbService: IdbService, private mealService: MealService) { }

  ngOnInit(): void {
    // get favorite meals
    let subscription = this.idbService.getAll("Ratting").subscribe(data => {
      this.rattings = data;
      this.getMeals();
    });

  }
}
