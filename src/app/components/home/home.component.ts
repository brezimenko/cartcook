import {AfterViewInit, Component, OnInit} from '@angular/core';
import {merge, Observable, Subject, timer} from 'rxjs';
import {FormControl} from '@angular/forms';
import {RecipeService} from '../../services/recipe.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {MANUAL} from '../../common/utils/manual';
import {getSurprise} from '../../common/utils/surprise';
import {Recipe} from '../../models/recipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public page = 1;
  public ingredients = [];
  public results$: Observable<Recipe[]>;
  public searchName: FormControl;
  public ingredientToAdd: string;
  public updateItems$ = new Subject();
  public manualConstant = MANUAL;
  public manual = '';

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getSurprise().subscribe(_ => {
      this.setSearchString(getSurprise(), 200);
    });
    this.searchName = new FormControl();
    this.results$ = merge(
      this.searchName.valueChanges,
      this.updateItems$
    ).pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(_ => this.recipeService.getRecipe(this.searchName.value, this.ingredients, this.page))
    );
  }
  ngAfterViewInit() {
    if (localStorage && !localStorage.getItem('isPresented')) {
      this.startAnimation();
    }
  }
  addIngredient() {
    if (!this.ingredientToAdd) return;
    this.ingredients.push(this.ingredientToAdd);
    this.updateItems$.next(this.ingredientToAdd);
    this.ingredientToAdd = undefined;
  }
  deleteIngredient(index) {
    this.ingredients.splice(index, 1);
    this.updateItems$.next(index);
  }
  startAnimation() {
    const sub = timer(200, 5000).subscribe((i) => {
      if (i === 4) {
        sub.unsubscribe();
        localStorage.setItem('isPresented', 'true');
        this.manual = '';
        return;
      }
      this.manual = this.manualConstant[i];
      if (i === 1) {
        this.setSearchString('TOMATO', 2000);
      } else if (i === 2) {
        const text = 'POTATO';
        const textTimer = timer(2000, 100).subscribe(p => {
          if (p < 6) {
            this.ingredientToAdd = text.substr(0, p + 1);
          } else {
            this.addIngredient();
            textTimer.unsubscribe();
          }
        });
      }
    });
  }
  setSearchString(text, delay) {
    const textTimer = timer(delay, 100).subscribe(p => {
      if (p < text.length + 1) {
        this.searchName.setValue(text.substr(0, p + 1));
      } else {
        textTimer.unsubscribe();
      }
    });
  }
}
