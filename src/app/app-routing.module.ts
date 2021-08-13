import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'calculadora',
    pathMatch: 'full'
  },
  { path: 'calculadora', loadChildren: () => import('./modules/calculadora/calculadora.module').then(m => m.CalculadoraModule) },
  { path: 'resultados', loadChildren: () => import('./modules/resultados/resultados.module').then(m => m.ResultadosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
