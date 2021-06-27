import { taggedTemplate } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Meal } from '../interfaces';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.css']
})
export class ReceitaComponent implements OnInit {

  @Input() meal!: Meal;

  tags: string[] = []

  constructor() { }

  ngOnInit(): void {
    if (this.meal.strTags !== null){
      for (let tag of this.meal.strTags.split(',')) {
       if (tag.length > 1) {
         this.tags.push(tag)
       }
      }
    }
  }

}
