
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { CompanyOfficersComponent } from './components/company-officers/company-officers.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchComponent } from './components/search/search.component';
import { ApiKeyInterceptor } from './interceptors/api-key.interceptor';
import { ApiService } from './services/api.service';

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        SearchResultsComponent,
        CompanyDetailsComponent,
        CompanyOfficersComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatListModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatCardModule
    ],
    providers: [ApiService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiKeyInterceptor,
            multi: true
        },
        {
            provide: DATE_PIPE_DEFAULT_OPTIONS,
            useValue: { dateFormat: "longDate" }
        }
    ],
    exports: [ReactiveFormsModule],
    bootstrap: [AppComponent]
})
export class AppModule { }