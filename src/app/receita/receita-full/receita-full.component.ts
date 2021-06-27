import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal } from 'src/app/interfaces';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-receita-full',
  templateUrl: './receita-full.component.html',
  styleUrls: ['./receita-full.component.css']
})
export class ReceitaFullComponent implements OnInit {

  id!: any;
  meal!: Meal;
  tags: string[] = [];

  constructor(private activatedRoute: ActivatedRoute, private mealService: MealService) { }

  addTags(tags: string): void {
    if (tags !== null){
      for (let tag of tags.split(',')) {
        if (tag.length > 1) {
          this.tags.push(tag)
        }
      }
    }
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    })

    if (this.id != null) {
      this.mealService.getMealById(parseInt(this.id)).subscribe(meal => {
        this.meal = meal;
        this.addTags(meal.strTags);
      })
    }
  }
}
