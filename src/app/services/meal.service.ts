import { Injectable } from '@angular/core';
import { Area, Category, Ingredient, Meal, MealsSearch } from '../interfaces';
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

  categories: Category[] = [];
  ingredientes: Ingredient[] = [];
  areas: Area[] = [];

  constructor(private http: HttpClient, private logService: LogService) {
    this.log('init');
    this.loadCategories();
    this.loadIngredientes();
    this.loadAreas();

    this.getMealByFirstLetter('t');
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

  loadCategories(): Category[] {
    this.log('🚀 fetching categories');
    this.http
      .get<any>(this.categoriesURL)
      .pipe(
        tap({
          complete: () => {
            this.log('✅ fetch categories complete');
          },
        })
      )
      .subscribe((data) => {
        for (let i = 0; i < data.categories.length; i++) {
          const element = data.categories[i];
          this.categories.push(element);
        }
      });
    return this.categories;
  }

  loadIngredientes(): Ingredient[] {
    this.log('🚀 fetching ingredients');
    this.http
      .get<any>(this.ingredientesURL)
      .pipe(
        tap({
          complete: () => {
            this.log('✅ fetch ingredients complete');
          },
        })
      )
      .subscribe((data) => {
        for (let i = 0; i < data.meals.length; i++) {
          const element = data.meals[i];
          this.ingredientes.push(element);
        }
      });
    return this.ingredientes;
  }

  loadAreas(): Area[] {
    this.log('🚀 fetching areas');
    this.http
      .get<any>(this.areasURL)
      .pipe(
        tap({
          complete: () => {
            this.log('✅ fetch areas complete');
          },
        })
      )
      .subscribe((data) => {
        for (let i = 0; i < data.meals.length; i++) {
          const element = data.meals[i];
          this.areas.push(element);
        }
      });
    return this.areas;
  }

  private log(message: string): void {
    this.logService.add(`MealService: ${message}`);
  }
}
