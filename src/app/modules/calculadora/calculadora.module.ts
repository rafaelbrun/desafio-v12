import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculadoraComponent } from './calculadora.component';
import { CalculadoraRoutingModule } from './calculadora-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CalculadoraComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CalculadoraRoutingModule
  ]
})
export class CalculadoraModule { }
