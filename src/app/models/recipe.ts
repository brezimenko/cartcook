export class Recipe {
  title: string;
  href: string;
  ingredients: string;
  thumbnail: string;

  constructor(recipe: Recipe) {
    Object.assign(this, recipe);
  }
}
