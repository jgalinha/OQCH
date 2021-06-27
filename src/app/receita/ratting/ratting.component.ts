import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ratting } from 'src/app/interfaces';
import { IdbService } from 'src/app/services/idb.service';

@Component({
  selector: 'app-ratting',
  templateUrl: './ratting.component.html',
  styleUrls: ['./ratting.component.css'],
})
export class RattingComponent implements OnInit {
  @Input() idMeal!: number;
  @Output() removeRating: EventEmitter<any> = new EventEmitter();

  ratting: Ratting = {
    idMeal: this.idMeal,
    ratting: 0,
    favourite: false,
  };
  fillColor: string = '#ffc107';
  favFillColor: string = '#E31B23'

  constructor(private idbService: IdbService) {}

  ngOnInit(): void {
    this.getRatting(this.idMeal);
  }

  setFav() {
    this.ratting.favourite = !this.ratting.favourite;
    this.idbService.addItem('Ratting', this.ratting).subscribe();
  }

  setRatting(ratting: number) {
    // code to handle if the user remove the star
    if (this.ratting.ratting === ratting && this.ratting.ratting > 0) {
      this.ratting.ratting -= 1;
    } else {
      this.ratting.ratting = ratting;
    }
    if (this.ratting.ratting === 0) {
      console.log("emit")
      this.removeRating.emit();
    }
    // localStoress code
    // localStorage.setItem(
    //   this.idMeal.toString(),
    //   JSON.stringify({
    //     idMeal: this.idMeal,
    //     ratting: this.ratting.ratting,
    //   })
    // );
    this.idbService.addItem('Ratting', this.ratting).subscribe();
  }

  getRatting(idMeal: number) {
    const rat = this.idbService.getItem('Ratting', this.idMeal)
      .subscribe(data => this.ratting = data);
    // localStorage code
    // localStorage code
    // const ratting = localStorage.getItem(idMeal.toString());
    // if (ratting != undefined) {
    //   this.ratting = JSON.parse(ratting);
    // }
  }
}
