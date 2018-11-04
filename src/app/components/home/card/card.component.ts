import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../models/recipe';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() recipe: Recipe;
  public areDetailsShown = false;
  constructor() { }

  ngOnInit() {
  }

}
