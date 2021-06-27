import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleTranslateService {

  sourceText:string = '';
  sourceLang:string = 'en';
  targetLang:string = 'pt';

  constructor(private http: HttpClient, private logService: LogService) { }

  translate(sourceText: string, sourceLang: string = this.sourceLang, targetLang: string = this.targetLang){
    this.log("🔎 translating " + sourceText + " from " + sourceLang + " to " + targetLang )
    return this.http.get<any>("https://translate.googleapis.com/translate_a/single?client=gtx&sl="
            + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText)).pipe(
      tap({
        complete: () => this.log("✅ translating " + sourceText + " from " + sourceLang + " to " + targetLang + " done!" )
      }),
      map(data => data[0][0][0])
    )
  }

  private log(message: string): void {
    this.logService.add("Translate Serive: " + message);
  }
}
