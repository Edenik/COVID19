import { Component, OnInit, IterableDiffers } from '@angular/core';
import { GetJsonService } from 'src/app/shared/services/get-json.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { News } from 'src/app/shared/models/news';
import { interval, Subscription } from 'rxjs';



@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  lang: string;
  dir: string;
  news: News[] = [];
  error: boolean = false;
  constructor(private getJson: GetJsonService, private localStorage: LocalStorageService) { }
  subscription: Subscription;
  searchWords: any[] = ['corona', 'covid'];
  checkLang() {
    const source = interval(1500);
    this.subscription = source.subscribe(val => {
      this.dir = this.localStorage.getObjFromStorage("COVID-APP-DIR");
      if (this.dir === 'rtl' && this.lang === 'en') {
        this.lang = 'he';
        this.getHeNews();
      }
      else if (this.dir === 'ltr' && this.lang === 'he') {
        this.lang = 'en';
        this.getEnNews();
      }
    });
  }

  getHeNews() {
    this.news = [];
    this.getJson.getHebrewNews().subscribe(
      ele => {
        this.error = false;
        ele.articles.forEach(ele => {
          this.news.push({
            source: ele.source.name,
            author: ele.author,
            title: ele.title,
            description: ele.description,
            url: ele.url,
            urlToImage: ele.urlToImage,
            publishedAt: ele.publishedAt,
            content: ele.content
          })
        });
      },
      err => { console.log('HTTP Error', err); this.error = true; },
      () => console.log('HTTP request completed.')
    )
  }


  getEnNews() {
    this.news = [];
    this.getJson.getEnglishNews().subscribe(
      ele => {
        this.error = false;
        ele.articles.forEach(ele => {
          if (ele.description.toLowerCase().includes('corona') || ele.description.toLowerCase().includes('covid') ||
            ele.title.toLowerCase().includes('corona') || ele.title.toLowerCase().includes('covid')) {
            this.news.push({
              source: ele.source.name,
              author: ele.author,
              title: ele.title,
              description: ele.description,
              url: ele.url,
              urlToImage: ele.urlToImage,
              publishedAt: ele.publishedAt,
              content: ele.content
            })
          }
        });

      },
      err => { console.log('HTTP Error', err); this.error = true; },
      () => console.log('HTTP request completed.')
    )
  }



  ngOnInit(): void {
    this.dir = this.localStorage.getObjFromStorage("COVID-APP-DIR");
    if (this.dir === 'rtl') {
      this.lang = 'he';
      this.getHeNews();
    }
    else {
      this.lang = 'en';
      this.getEnNews();
    }
    this.checkLang();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
