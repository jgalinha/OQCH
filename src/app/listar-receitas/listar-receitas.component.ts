import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-listar-receitas',
  templateUrl: './listar-receitas.component.html',
  styleUrls: ['./listar-receitas.component.css'],
})
export class ListarReceitasComponent implements OnInit {

  letters: String[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

  constructor() {}

  ngOnInit(): void {
  }
}
