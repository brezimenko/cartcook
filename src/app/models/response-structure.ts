import {Recipe} from './recipe';

export class ResponseStructure {
  title: string;
  version: string;
  href: string;
  results: Recipe[];

  constructor(responseData: ResponseStructure) {
    Object.assign(this, responseData);
  }
}
