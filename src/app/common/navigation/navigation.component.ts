import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../services/recipe.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public isNavbarCollapsed = true;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }
  surprise() {
    this.recipeService.setSurprise(true);
  }
}
