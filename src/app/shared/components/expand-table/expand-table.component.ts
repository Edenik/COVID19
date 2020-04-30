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
    this.snackBar.open(`Country: ${country} added to favorites!`, "", {
      duration: 2000,
    });
    this.savedCountries.push(country)
    this.localStorage.saveObjToStorage(this.savedCountries, "COVID-APP-FAV-COUNRIES")
  }

  sort(object) {
    console.log(object)

    var sortedArray: CountryReport[] = this.data.sort((obj1, obj2) => {
      switch (object) {
        case 'cases':
          var sortObject1 = obj1.cases
          var sortObject2 = obj2.cases
          break;
        case 'active':
          var sortObject1 = obj1.active
          var sortObject2 = obj2.active
          break;
        case 'deaths':
          var sortObject1 = obj1.deaths
          var sortObject2 = obj2.deaths
          break;
        case 'critical':
          var sortObject1 = obj1.critical
          var sortObject2 = obj2.critical
          break;
        case 'recovered':
          var sortObject1 = obj1.recovered
          var sortObject2 = obj2.recovered
          break;
        case 'casesToday':
          var sortObject1 = obj1.todayCases
          var sortObject2 = obj2.todayCases
          break;
        case 'deathsToday':
          var sortObject1 = obj1.todayDeaths
          var sortObject2 = obj2.todayDeaths
          break;
        case 'deathsPerOneMillion':
          var sortObject1 = obj1.deathsPerOneMillion
          var sortObject2 = obj2.deathsPerOneMillion
          break;
        case 'casesPerOneMillion':
          var sortObject1 = obj1.casesPerOneMillion
          var sortObject2 = obj2.casesPerOneMillion
          break;
        case 'tests':
          var sortObject1 = obj1.tests
          var sortObject2 = obj2.tests
          break;
      }

      if (sortObject1 < sortObject2) {
        return 1;
      }
      if (sortObject1 > sortObject2) {
        return -1;
      }
      return 0;
    });



    this.dataSource = new MatTableDataSource(this.data);
    console.table(this.data)
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
