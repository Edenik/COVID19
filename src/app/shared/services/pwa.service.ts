import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Platform } from '@angular/cdk/platform';
import { SwUpdate } from '@angular/service-worker';
import { PromptComponent } from '../components/prompt/prompt.component';
@Injectable({
  providedIn: 'root'
})

export class PwaService {
  public promptEvent: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private platform: Platform
  ) { }

  initPwaPrompt() {
    if (this.platform.IOS) {
      const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
    else {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
      });
    }
  }

  openPromptComponent(mobileType: 'ios') {
    timer(3000)
    .pipe(take(1))
    .subscribe(() => {
      this.bottomSheet.open(PromptComponent, { data: { mobileType, promptEvent: this.promptEvent } });
    });
  }
}
