import { Component, OnInit } from '@angular/core';
import { pagador } from 'src/models/pagador';
import { PagadorService } from 'src/services/pagador.service';

@Component({
  selector: 'app-pagadores',
  templateUrl: './pagadores.component.html',
  styleUrls: ['./pagadores.component.css']
})
export class PagadoresComponent implements OnInit{

  pagador: pagador[];
  
  constructor(private pagadorService: PagadorService){}
  
  ngOnInit(): void {
    this.pagadorService.getAll().subscribe(
      e => this.pagador=e
    );
  }
}
