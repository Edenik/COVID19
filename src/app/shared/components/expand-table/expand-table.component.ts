import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CountryReport } from '../../models/country-report';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-expand-table',
  templateUrl: './expand-table.component.html',
  styleUrls: ['./expand-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExpandTableComponent implements OnInit {
  columnsToDisplay = ['Country', 'Total Cases', 'New Cases', 'Cases per 1 mil', 'Total Deaths', 'New Deaths', 'Deaths per 1 mil', 'Active', 'Critical', 'Recovered', 'Tests'];
  savedCountries: any[] = [];

  expandedElement: any | null;
  @Input() data: CountryReport[];
  dataSource = new MatTableDataSource(this.data);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  error: boolean = false;
  constructor(private snackBar: MatSnackBar, private localStorage: LocalStorageService, public router: Router, private translate: TranslateService) { }

  ngOnInit() {
    console.log(this.data)
    this.dataSource = new MatTableDataSource<CountryReport>(this.data);
    this.dataSource.paginator = this.paginator;

    if (this.localStorage.getObjFromStorage("COVID-APP-FAV-COUNRIES")) {
      this.savedCountries = this.localStorage.getObjFromStorage("COVID-APP-FAV-COUNRIES");
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  saveCountry(country: string) {
    // ${this.translate.instant('country')}
    this.snackBar.open(`Country: ${country} added to favorites!`, "", {
      duration: 2000,
    });
    this.savedCountries.push(country)
    this.localStorage.saveObjToStorage(this.savedCountries, "COVID-APP-FAV-COUNRIES")
  }

  sort(object) {
    console.log(object)
    this.error = true;
    if (object == 'cases') {
      var sortedArray: CountryReport[] = this.data.sort((obj1, obj2) => {
        if (obj1.cases < obj2.cases) {
          return 1;
        }

        if (obj1.cases > obj2.cases) {
          return -1;
        }

        return 0;
      });
    }

    if (object == 'active') {
      var sortedArray: CountryReport[] = this.data.sort((obj1, obj2) => {
        if (obj1.active < obj2.active) {
          return 1;
        }

        if (obj1.active > obj2.active) {
          return -1;
        }

        return 0;
      });
    }

    if (object == 'deaths') {
      var sortedArray: CountryReport[] = this.data.sort((obj1, obj2) => {
        if (obj1.deaths < obj2.deaths) {
          return 1;
        }

        if (obj1.deaths > obj2.deaths) {
          return -1;
        }

        return 0;
      });
    }

    if (object == 'critical') {
      var sortedArray: CountryReport[] = this.data.sort((obj1, obj2) => {
        if (obj1.critical < obj2.critical) {
          return 1;
        }

        if (obj1.critical > obj2.critical) {
          return -1;
        }

        return 0;
      });
    }

    if (object == 'recovered') {
      var sortedArray: CountryReport[] = this.data.sort((obj1, obj2) => {
        if (obj1.recovered < obj2.recovered) {
          return 1;
        }

        if (obj1.recovered > obj2.recovered) {
          return -1;
        }

        return 0;
      });
    }

    if (object == 'casesToday') {
      var sortedArray: CountryReport[] = this.data.sort((obj1, obj2) => {

        if (obj1.todayCases < obj2.todayCases) {
          return 1;
        }

        if (obj1.todayCases > obj2.todayCases) {
          return -1;
        }

        return 0;
      });
    }

    if (object == 'deathsToday') {
      var sortedArray: CountryReport[] = this.data.sort((obj1, obj2) => {
        if (obj1.todayDeaths < obj2.todayDeaths) {
          return 1;
        }

        if (obj1.todayDeaths > obj2.todayDeaths) {
          return -1;
        }

        return 0;
      });
    }

    if (object == 'deathsPerOneMillion') {
      var sortedArray: CountryReport[] = this.data.sort((obj1, obj2) => {
        if (obj1.deathsPerOneMillion < obj2.deathsPerOneMillion) {
          return 1;
        }

        if (obj1.deathsPerOneMillion > obj2.deathsPerOneMillion) {
          return -1;
        }

        return 0;
      });
    }

    if (object == 'casesPerOneMillion') {
      var sortedArray: CountryReport[] = this.data.sort((obj1, obj2) => {
        if (obj1.casesPerOneMillion < obj2.casesPerOneMillion) {
          return 1;
        }

        if (obj1.casesPerOneMillion > obj2.casesPerOneMillion) {
          return -1;
        }

        return 0;
      });
    }

    if (object == 'tests') {
      var sortedArray: CountryReport[] = this.data.sort((obj1, obj2) => {
        if (obj1.tests < obj2.tests) {
          return 1;
        }

        if (obj1.tests > obj2.tests) {
          return -1;
        }

        return 0;
      });
    }

    this.dataSource = new MatTableDataSource(this.data);
    console.table(this.data)
    this.error = false;
  }

  deleteCountry(country: string) {
    this.snackBar.open(`Country: ${country} deleted from favorites!`, "", {
      duration: 2000,
    });

    for (var i = 0; i < this.savedCountries.length; i++) {
      if (this.savedCountries[i] === country) {
        this.savedCountries.splice(i, 1);
      }
    }
    this.localStorage.saveObjToStorage(this.savedCountries, "COVID-APP-FAV-COUNRIES")
    if (location.pathname.includes("/saved")) {
      this.router.navigateByUrl('/about', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/saved']);
      });
    }

  }


  animStart(event) {
    // console.log('Animation Started');
    // // do more stuff
    // console.log('event.fromState', event.fromState);
    // console.log('event.phaseName', event.phaseName);
    // console.log('event.toState', event.toState);
    // console.log('event.totalTime', event.totalTime);
  }

  animEnd(event) {
    // console.log('Animation Ended');
    // // do more stuff
    // console.log('event.fromState', event.fromState);
    // console.log('event.phaseName', event.phaseName);
    // console.log('event.toState', event.toState);
    // console.log('event.totalTime', event.totalTime);
  }
}
