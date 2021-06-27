import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { concat, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Area, Category, Ingredient, Meal, MealFilter } from '../interfaces';
import { GoogleTranslateService } from '../services/google-translate.service';
import { LogService } from '../services/log.service';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-pesquisar-receitas',
  templateUrl: './pesquisar-receitas.component.html',
  styleUrls: ['./pesquisar-receitas.component.css']
})
export class PesquisarReceitasComponent implements OnInit {

  ingredients!: Observable<Ingredient[]>;
  categories!: Observable<Category[]>;
  areas!: Observable<Area[]>;
  mealFilter: MealFilter = {
    ingredients: [],
    categories: [],
    areas: [],
  };
  filterTarget: number = 0;
  meals!: Observable<Meal[]>;
  filteredMeals: Meal[] = [];
  strict: number = 0;
  translatedFilters = {
    ingredients: {},
    categories: {},
    areas: {},
  }

  constructor(private mealService: MealService, private logService: LogService, private translateService: GoogleTranslateService) { }

  translate(text: string): string{
    let data = text;
    this.translateService.translate(text).subscribe(result => {
      data = result
    });
    return data
  }

  addFilter(form: NgForm): void {
    const val = form.value.pesquisa;
    if (this.filterTarget === 1) {
      this.addIngredientFilter(val)
    } else if (this.filterTarget === 2) {
      this.addCategoryFilter(val);
    } else if (this.filterTarget === 3) {
      this.addAreaFilter(val);
    }
    form.reset();
  }

  applyFilter(): void {
    this.filteredMeals = [];
    for (let ingredient of this.mealFilter.ingredients){
      this.mealService.getMealsByIngredient(ingredient.strIngredient)
      .subscribe(meals => this.addFilteredMeals(meals));
    }
    for (let category of this.mealFilter.categories){
      this.mealService.getMealsByCategory(category.strCategory)
      .subscribe(meals => this.addFilteredMeals(meals));
    }
    for (let area of this.mealFilter.areas){
      this.mealService.getMealsByArea(area.strArea)
      .subscribe(meals => this.addFilteredMeals(meals));
    }
  }

  addFilteredMeals(meals: Meal[]): void {
    for (let meal of meals) {
      const exists = this.filteredMeals.filter(m => m.idMeal === meal.idMeal).length === 0 ? 1 : 0;
      if (exists) {
        const fullMeal = this.mealService.getMealById(meal.idMeal).subscribe(meal => {
          this.filteredMeals.push(meal)
        }
        );
      }
    }
  }

  addCategoryFilter(filter: string): void {
    const exists = this.mealFilter.categories.filter(category => category.strCategory === filter).length;
    if(!exists) {
      this.categories.pipe(
        map(categories => categories.filter(category => category.strCategory === filter)),
        tap({
          complete: () => this.logService.add("filter: add Category filter: " + filter)
        })
      ).subscribe(result => {
        this.mealFilter.categories.push(...result);
        this.applyFilter();
      })
    }
  }

  addAreaFilter(filter: string): void {
    const exist = this.mealFilter.areas.filter(area => area.strArea === filter).length;
    if (!exist) {
      this.areas.pipe(
        map(areas => areas.filter(area => area.strArea === filter)),
        tap({
          complete: () => this.logService.add("filter: add Area filter: " + filter)
        })
      ).subscribe(result => {
        this.mealFilter.areas.push(...result)
        this.applyFilter();
      })
    }
  }

  addIngredientFilter(filter: string): void {
    const exist = this.mealFilter.ingredients.filter(ingredient => ingredient.strIngredient === filter).length;
    if (!exist) {
      this.ingredients.pipe(
        map(ingredients => ingredients.filter(ingredient => ingredient.strIngredient === filter)),
        tap({
          complete: () => this.logService.add("filter: add Ingredient filter: " + filter)
        })
      ).subscribe(result => {
        this.mealFilter.ingredients.push(...result);
        this.applyFilter();
      })
    }
  }

  removeFilter(tipo: number, filter: string) {
    if (tipo === 1) {
      this.mealFilter.ingredients = this.mealFilter.ingredients.filter(ingredient => ingredient.strIngredient !== filter);
    } else if (tipo === 2) {
      this.mealFilter.categories = this.mealFilter.categories.filter(category => category.strCategory !== filter);
    } else if (tipo === 3) {
      this.mealFilter.areas = this.mealFilter.areas.filter(area => area.strArea !== filter);
    }
    this.applyFilter();
  }

  changeTipo(tipo: string) {
    const filter: number =  parseInt(tipo)
    this.filterTarget = filter
    if (filter === 1){
      this.ingredients = this.mealService.getIngredients();
      this.ingredients.subscribe(result => {
        result.forEach( data => {
          // console.log(this.translate(data.strIngredient))
        }
        )
      })
    } else if (filter === 2) {
      this.categories = this.mealService.getCategories();
    } else if (filter === 3) {
      this.areas = this.mealService.getAreas();
    }
  }


  ngOnInit(): void {
    this.meals = this.mealService.getAllMeals();
  }

}
