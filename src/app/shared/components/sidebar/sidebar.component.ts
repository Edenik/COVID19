import { Component, OnInit, NgZone, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { LocalStorageService } from '../../services/local-storage.service';
const SMALL_WIDTH_BREAKPOINT = 720;
import { TranslateService } from '@ngx-translate/core';
import { GetJsonService } from '../../services/get-json.service';
import { PwaService } from '../../services/pwa.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  deferredPrompt: any;
  showButton = false;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }

  constructor(
    zone: NgZone,
    private router: Router,
    public Pwa: PwaService,
    private localStorage: LocalStorageService,
    private translate: TranslateService,
    private getJson: GetJsonService) {
    translate.setDefaultLang('en');
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
  }

  @ViewChild(MatSidenav) sidenav: MatSidenav;
  isDarkTheme: boolean = false;
  dir: string = 'ltr';
  localStorageDark: boolean;
  localStorageDir: string;
  lastUpdate: number;
  isMobile: boolean;
  updated: boolean = false;
  ngOnInit() {
    this.localStorageDark = this.localStorage.getObjFromStorage("COVID-APP-DARK");
    this.localStorageDir = this.localStorage.getObjFromStorage("COVID-APP-DIR");
    this.getGlobalReport();
    this.checkMobile();
    if (this.localStorageDark == true) {
      this.toggleTheme();
    }
    if (this.localStorageDir == "rtl") {
      this.toggleLang();
    }
    this.router.events.subscribe(() => {
      if (this.isScreenSmall())
        this.sidenav.close();
    })
  }

  checkMobile() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.localStorage.saveObjToStorage(this.isDarkTheme, "COVID-APP-DARK")
  }


  toggleLang() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
    if (this.dir == 'ltr') {
      this.translate.use('en');
    }
    else {
      this.translate.use('he')
    }
    this.localStorage.saveObjToStorage(this.dir, "COVID-APP-DIR")
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  getGlobalReport() {
    this.getJson.getGlobalReport().subscribe(ele => {
      this.lastUpdate = ele.updated;
    })
  }

  installPwa(): void {
    this.Pwa.promptEvent.prompt();
  }
  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }
}
