import { Injectable } from '@angular/core';
import {HttpService} from './core/http.service';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private surprise: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpService) { }

  getRecipe(searchString: string, ingredients: string[] = [], page: number = 1) {
    return this.http.get(`?i=${ingredients.join()}${searchString ? `&q=${searchString}` : ''}&p=${page}`).pipe(map(response => response.results));
  }
  setSurprise(val: boolean) {
    this.surprise.next(val);
  }
  getSurprise() {
    return this.surprise.asObservable();
  }
}
