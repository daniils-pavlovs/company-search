import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { CompanyOfficersComponent } from './components/company-officers/company-officers.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchComponent } from './components/search/search.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SearchComponent,
      },
      {
        path: 'search-results',
        component: SearchResultsComponent,
      },
      {
        path: 'company-details/:companyId',
        component: CompanyDetailsComponent,
        canActivate: [() => !!sessionStorage.getItem('token')],
        children: [],
      },
      {
        path: 'company-details/:companyId/officers',
        component: CompanyOfficersComponent,
        canActivate: [() => !!sessionStorage.getItem('token')],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }