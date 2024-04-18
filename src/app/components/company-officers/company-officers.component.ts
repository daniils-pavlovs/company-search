import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOfficer } from '../../models/officer';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-company-officers',
  templateUrl: './company-officers.component.html',
  styleUrl: './company-officers.component.scss'
})
export class CompanyOfficersComponent {
  officers: IOfficer[] = [];
  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.route.params.subscribe((params) => {
      const companyId = params['companyId'];
      this.apiService.getOfficers(companyId).subscribe((res: IOfficer[]) => {
        this.officers = res;
      });
    });
  }

}
