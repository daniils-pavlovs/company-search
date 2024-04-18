import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICompany } from '../../models/company';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss'
})
export class CompanyDetailsComponent {
  company: ICompany = {
    company_status: '',
    address_snippet: '',
    date_of_creation: '',
    matches: {
      title: []
    },
    description: '',
    links: {
      self: ''
    },
    company_number: '',
    title: '',
    company_type: '',
    address: {
      premises: '',
      postal_code: '',
      country: '',
      locality: '',
      address_line_1: ''
    },
    kind: '',
    description_identifier: []
  };

  showOfficers: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.route.params.subscribe((params) => {
      const companyId = params['companyId'];
      this.apiService.getCompany(companyId).subscribe((res: ICompany) => {
        this.company = res;
      });
    });
  }

  toggleShowOfficers() {
    this.showOfficers = !this.showOfficers;
  }

}
