import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'O Que Comer Hoje!';
  currentUrl: any = '';

  public constructor(private titleService: Title, router: Router) {
    // Get the current url to use with skip to main
    // https://dev.to/altsyset/make-your-angular-spa-accessible-16h
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url != '') {
          this.currentUrl = e.url;
        } else {
          this.currentUrl = '';
        }
      }
    })

  }
  /**
  * setTitle
  */
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
