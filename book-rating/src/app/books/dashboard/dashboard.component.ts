import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';


function getService() {
  return inject(BookRatingService);
}

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  books: Book[] = [];

  // rs2 = inject(BookRatingService);
  // rs3 = getService()

  constructor(private rs: BookRatingService, private bs: BookStoreService) {
    this.bs.getAll().subscribe(books => {
      this.books = books;
    });
  }

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  private updateList(ratedBook: Book) {

    // const result = [1,2,3,4,5].map(e => e * 10) // [10, 20, 30, 40, 50] // Projektion
    // const result2 = [1,2,3,4,5,6,7].filter(e => e >= 5) // [5, 6, 7] // Prädikatsfunktion

    this.books = this.books.map(b => b.isbn === ratedBook.isbn ? ratedBook : b);

    /*this.books.map(b => {
      if (b.isbn === ratedBook.isbn) {
        return ratedBook;
      } else {
        return b;
      }
    });*/

  }
}
