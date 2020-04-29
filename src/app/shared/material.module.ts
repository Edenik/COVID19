import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../layouts/default/default.component';
import { IndexComponent } from '../modules/index/index.component';
import { AboutComponent } from '../modules/about/about.component';
import { ProjectsComponent } from '../modules/projects/projects.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableComponent } from './components/table/table.component';
import { CountUpModule } from 'ngx-countup';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ExpandTableComponent } from './components/expand-table/expand-table.component';
import { PwaService } from './services/pwa.service';
import { PromptComponent } from './components/prompt/prompt.component';
import { CountryInfoComponent } from './components/country-info/country-info.component';
import { HistoricalReportsComponent } from './components/historical-reports/historical-reports.component';
import { NewsComponent } from '../modules/news/news.component';
import { AreaComponent } from './widgets/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { StackedComponent } from './widgets/stacked/stacked.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: IndexComponent
  }, {
    path: 'saved',
    component: ProjectsComponent
  },
  {
    path: 'news',
    component: NewsComponent
  }, {
    path: 'about',
    component: AboutComponent
  }, {
    path: '**',
    component: IndexComponent
  }]
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatSnackBarModule,
    MatGridListModule,
    FlexLayoutModule,
    MatSelectModule,
    MatFormFieldModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    CountUpModule,
    HttpClientModule,
    HighchartsChartModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatTabsModule,

  ],
  exports: [
    FooterComponent, SidebarComponent, ToolbarComponent, TableComponent, ExpandTableComponent, AreaComponent, StackedComponent,
    RouterModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatSnackBarModule,
    MatGridListModule,
    FlexLayoutModule,
    MatSelectModule,
    MatFormFieldModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatSnackBarModule,
    CountUpModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    MatTabsModule,
  ],
  declarations: [FooterComponent, SidebarComponent, ToolbarComponent, TableComponent, ExpandTableComponent, PromptComponent, CountryInfoComponent, HistoricalReportsComponent, AreaComponent, StackedComponent],
  providers: [PwaService]
})
export class MaterialModule { }

