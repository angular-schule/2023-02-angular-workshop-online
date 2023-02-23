import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  constructor() { }

  rateUp(book: Book): Book {
    // arbeitet nicht immutable!
    book.rating++;
    return book;
  }

  rateDown(book: Book): Book {
    return book; // TODO
  }
}
