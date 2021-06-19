import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'O Que Comer Hoje!';
  public constructor(private titleService: Title) {

  }
  /**
  * setTitle
  */
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
