import { Component, Input, OnInit } from '@angular/core';
import { Ratting } from 'src/app/interfaces';

@Component({
  selector: 'app-ratting',
  templateUrl: './ratting.component.html',
  styleUrls: ['./ratting.component.css'],
})
export class RattingComponent implements OnInit {
  @Input() idMeal!: number;

  ratting: Ratting = {
    idMeal: this.idMeal,
    ratting: 0,
  };
  fillColor: string = '#ffc107';

  constructor() {}

  ngOnInit(): void {
    this.getRatting(this.idMeal);
  }

  setRatting(ratting: number) {
    if (this.ratting.ratting === ratting && this.ratting.ratting > 0) {
      this.ratting.ratting -= 1;
    } else {
      this.ratting.ratting = ratting;
    }
    localStorage.setItem(
      this.idMeal.toString(),
      JSON.stringify({
        idMeal: this.idMeal,
        ratting: this.ratting.ratting,
      })
    );
  }

  getRatting(idMeal: number) {
    const ratting = localStorage.getItem(idMeal.toString());
    if (ratting != undefined) {
      this.ratting = JSON.parse(ratting);
    }
  }
}
