import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { GetJsonService } from 'src/app/shared/services/get-json.service';
import { CountryReport } from 'src/app/shared/models/country-report';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private localStorage: LocalStorageService, private getJson: GetJsonService) { }
  savedCountries: any[] = [];
  countriesReport: CountryReport[] = [];
  error: boolean = false;

  getCountriesReport() {
    if (this.savedCountries.length == 1) {
      this.getJson.getCountryReport(this.savedCountries).subscribe(
        ele => {
          this.error = false;
          this.countriesReport = [];
          let data = [];
          data.push(ele);
          data.forEach(ele => {
            this.countriesReport.push({ country: ele.country, cases: ele.cases, deaths: ele.deaths, todayDeaths: ele.todayDeaths, todayCases: ele.todayCases, recovered: ele.recovered, active: ele.active, critical: ele.critical, casesPerOneMillion: ele.casesPerOneMillion, deathsPerOneMillion: ele.deathsPerOneMillion, flag: ele.countryInfo.flag, continent: ele.continent, tests: ele.tests, testsPerOneMillion: ele.testsPerOneMillion, updated: ele.updated })
          });
        },
        err => { console.log('HTTP Error', err); this.error = true; },
        () => console.log('HTTP request completed.')
      )
    }



    if (this.savedCountries.length > 1) {
      this.getJson.getCountryReport(this.savedCountries).subscribe(
        ele => {
          this.error = false;
          this.countriesReport = [];
          ele.forEach(ele => {
            this.countriesReport.push({ country: ele.country, cases: ele.cases, deaths: ele.deaths, todayDeaths: ele.todayDeaths, todayCases: ele.todayCases, recovered: ele.recovered, active: ele.active, critical: ele.critical, casesPerOneMillion: ele.casesPerOneMillion, deathsPerOneMillion: ele.deathsPerOneMillion, flag: ele.countryInfo.flag, continent: ele.continent, tests: ele.tests, testsPerOneMillion: ele.testsPerOneMillion, updated: ele.updated })
          });
        },
        err => { console.log('HTTP Error', err); this.error = true; },
        () => console.log('HTTP request completed.')
      )
    }

  }



  ngOnInit(): void {
    if (this.localStorage.getObjFromStorage("COVID-APP-FAV-COUNRIES")) {
      this.savedCountries = this.localStorage.getObjFromStorage("COVID-APP-FAV-COUNRIES");
    }
    this.getCountriesReport();
  }

}
