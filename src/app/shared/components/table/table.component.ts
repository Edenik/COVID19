import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CountryReport } from '../../models/country-report';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit {
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  @Input() data: CountryReport[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns = ['Country', 'Total Cases', 'New Cases', 'Total Deaths', 'New Deaths', 'Active', 'Critical', 'Recovered', 'Tests', 'Tests per 1Mil'];
  dataSource: MatTableDataSource<CountryReport>;
  savedCountries: any[] = [];
  url: any;
  constructor(private snackBar: MatSnackBar, private localStorage: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
    console.log(location.pathname);

    this.dataSource = new MatTableDataSource<CountryReport>(this.data);
    this.dataSource.sort = this.sort;
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
      location.reload();
    }

  }

}
