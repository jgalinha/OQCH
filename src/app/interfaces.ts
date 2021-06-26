export interface Category {
  idCategory: number;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface Meal {
  idMeal: number;
  strMeal: string;
  strDrinkAlternate: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strImageSource: string;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
}

export interface Area {
  strArea: string;
}

export interface AreaJSON {
  meals: Area[]
}

export interface Ingredient {
  idIngredient: number;
  strIngredient: string;
  strDescription: string;
  strType: string;
}

export interface MealsSearch {
  meals: Meal[]
}

export interface CategoriesJSON {
  categories: Category[]
}

export interface Ratting {
  idMeal: number;
  ratting: number;
}

export interface MyDB {
  Status: any;
  Ratting: Ratting
}

export interface MealFilter {
  ingredients: Ingredient[];
  categories: Category[];
  areas: Area[];
}
