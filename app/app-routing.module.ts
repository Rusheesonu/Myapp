import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {BankSearchComponent} from './bank-search/bank-search.component'
import { FooterComponent } from './footer/footer.component';
import { FavoriteBanksComponent } from './favorite-banks/favorite-banks.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/bank-search',
    pathMatch: 'full'
  },
  { path: 'bank-search', component: BankSearchComponent },
  { path: 'favorite-banks', component: FavoriteBanksComponent },
  // { path: 'favorite-banks', component: FavoriteBansk },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
