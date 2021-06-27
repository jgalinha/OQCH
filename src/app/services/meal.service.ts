import { Injectable } from '@angular/core';
import { Area, AreaJSON, CategoriesJSON, Category, Ingredient, Meal, MealsSearch } from '../interfaces';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { LogService } from './log.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ChildActivationStart } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private categoriesURL =
    'https://www.themealdb.com/api/json/v1/1/categories.php';
  private ingredientesURL =
    'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  private areasURL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  private firstLetterURl =
    'https://www.themealdb.com/api/json/v1/1/search.php?f=';
  private mealByIdURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  private mealByIngredientURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
  private mealByCategoryURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  private mealByAreaURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

  categories!: Observable<Category[]>;
  ingredients!: Observable<Ingredient[]>;
  areas!: Observable<Area[]>;
  meals!: Observable<Meal[]>;

  constructor(private http: HttpClient, private logService: LogService) {
    this.log('init');
    this.categories = this.loadCategories();
    this.ingredients = this.loadIngredients();
    this.areas = this.loadAreas();
    this.meals = this.loadMeals();
  }


  getMealsByIngredient(ingredient: string): Observable<Meal[]> {
    this.log('🚀 fetching meals by ingredient ' + ingredient);
    return this.http.get<MealsSearch>(this.mealByIngredientURL + ingredient).pipe(
      map(meals => meals.meals),
      tap({
        complete: () => this.log('✅ meals with ingredient "' + ingredient + '" fetched')
      })
    )
  }

  getMealsByCategory(category: string): Observable<Meal[]> {
    this.log('🚀 fetching meals by category ' + category);
    return this.http.get<MealsSearch>(this.mealByCategoryURL + category).pipe(
      map(meals => meals.meals),
      tap({
        complete: () => this.log('✅ meals with category "' + category + '" fetched')
      })
    )
  }

  getMealsByArea(area: string): Observable<Meal[]> {
    this.log('🚀 fetching meals by area ' + area);
    return this.http.get<MealsSearch>(this.mealByAreaURL + area).pipe(
      map(meals => meals.meals),
      tap({
        complete: () => this.log('✅ meals with area "' + area + '" fetched')
      })
    )
  }

  getMealById(idMeal: number): Observable<Meal> {
    this.log('🚀 fetching meal with id ' + idMeal);
    return this.http.get<MealsSearch>(this.mealByIdURL + idMeal).pipe(
      tap({
        complete: () => this.log('✅ meal with id "' + idMeal + '" fetched')
      }),
      map(data => data.meals[0])
    )
  }

  getMealByFirstLetter(letter: String): Observable<Meal[]> {
    // try {
    //   if (letter.length > 1) throw 'getMealByFirstLetter -> Incorrect input';
    // } catch (err) {
    //   this.log('❌ Error: ' + err);
    //   return { msg: 'Wrong input', err: err };
    // }
    this.log('🚀 fetching meals started by letter ' + letter);
    return this.http.get<MealsSearch>(this.firstLetterURl + letter).pipe(
      tap(_ => this.log('✅ meals started by lettet "' + letter + '" fetched')),
      map(data => data.meals)
    );
  }

  loadCategories(): Observable<Category[]> {
    this.log('🚀 fetching categories');
    return this.http.get<CategoriesJSON>(this.categoriesURL).pipe(
      map(data => data.categories),
      tap({
        complete: () => {
          this.log('✅ fetch categories complete');
        }},
      )
    )
  }

  getCategories(): Observable<Category[]> {
    return this.categories;
  }

  // loadCategories(): Category[] {
  //   this.log('🚀 fetching categories');
  //   this.http
  //     .get<any>(this.categoriesURL)
  //     .pipe(
  //       tap({
  //         complete: () => {
  //           this.log('✅ fetch categories complete');
  //         },
  //       })
  //     )
  //     .subscribe((data) => {
  //       for (let i = 0; i < data.categories.length; i++) {
  //         const element = data.categories[i];
  //         this.categories.push(element);
  //       }
  //     });
  //   return this.categories;
  // }

  loadIngredients(): Observable<Ingredient[]> {
    this.log('🚀 fetching ingredients');
    return this.http
      .get<any>(this.ingredientesURL)
      .pipe(
        map(data => data.meals),
        tap({
          complete: () => {
            this.log('✅ fetch ingredients complete');
          },
        }),
      )
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.ingredients;
  }


  // loadIngredientes(): Ingredient[] {
  //   this.log('🚀 fetching ingredients');
  //   this.http
  //     .get<any>(this.ingredientesURL)
  //     .pipe(
  //       tap({
  //         complete: () => {
  //           this.log('✅ fetch ingredients complete');
  //         },
  //       })
  //     )
  //     .subscribe((data) => {
  //       for (let i = 0; i < data.meals.length; i++) {
  //         const element = data.meals[i];
  //         this.ingredientes.push(element);
  //       }
  //     });
  //   return this.ingredientes;
  // }

  loadAreas(): Observable<Area[]> {
    this.log('🚀 fetching areas');
    return this.http
      .get<AreaJSON>(this.areasURL)
      .pipe(
        map(data => data.meals),
        tap({
          complete: () => {
            this.log('✅ fetch areas complete');
          },
        })
      )
  }
   getAreas(): Observable<Area[]> {
     return this.areas
   }

   loadMeals(): Observable<Meal[]> {
    this.log('🚀 fetching meals');
    return this.http.get<MealsSearch>(this.firstLetterURl + "%").pipe(
      map(meals => meals.meals),
      tap({
        complete: () => this.log('✅ fetch meals complete')
      })
    )
   }

   getAllMeals(): Observable<Meal[]> {
     return this.meals
   }

  private log(message: string): void {
    this.logService.add(`MealService: ${message}`);
  }
}
