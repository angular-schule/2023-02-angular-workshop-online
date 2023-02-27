import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  book?: Book;

  constructor(private route: ActivatedRoute, private bs: BookStoreService) {
    // Synchronen Weg / PULL
    // const isbn = this.route.snapshot.paramMap.get('isbn'); // path: 'books/:isbn'

    // Asynchroner Weg / PUSH
    // TODO: Verschachtelte Subscription auflösen
    this.route.paramMap.subscribe(params => {
      const isbn = params.get('isbn')!; // Non-Null Assertion
      this.bs.getSingle(isbn).subscribe(book => {
        this.book = book;
      });
    });

  }

}
