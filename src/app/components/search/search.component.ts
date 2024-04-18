import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  constructor(private router: Router) { }

  searchbox = new FormControl('');


  search(event: Event) {
    console.log('Search term:', this.searchbox.value);
    this.router.navigate(['/search-results'], { queryParams: { query: this.searchbox.value } });
  }

}
