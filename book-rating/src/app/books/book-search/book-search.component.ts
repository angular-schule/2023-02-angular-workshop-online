import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, map, Observable, switchMap, tap } from 'rxjs';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {
  searchControl = new FormControl('', { nonNullable: true });
  books$: Observable<Book[]>;

  constructor(private bs: BookStoreService) {
    this.books$ = this.searchControl.valueChanges.pipe(
      debounceTime(250),
      filter(term => term.length >= 3),
      switchMap(term => this.bs.search(term)),
      tap(e => console.log(e)),
      map(books => [...books].sort((a, b) => b.rating - a.rating)),
    );
  }

}
