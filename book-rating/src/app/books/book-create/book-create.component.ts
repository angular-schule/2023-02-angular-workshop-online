import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'br-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent {
  bookForm = new FormGroup({
    isbn: new FormControl('', { nonNullable: true }),
    title: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    rating: new FormControl(1, { nonNullable: true }),
    price: new FormControl(0, { nonNullable: true }),
  });
}
