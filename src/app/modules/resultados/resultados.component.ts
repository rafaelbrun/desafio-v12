import { Component, OnInit } from '@angular/core';
import { storeKeys } from 'src/app/shared/constants/storeKeys';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {

  results: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.results = JSON.parse(localStorage.getItem(storeKeys.HISTORY_OPERATION) || '[]');
  }

}
