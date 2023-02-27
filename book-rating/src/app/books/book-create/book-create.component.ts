import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, isFormGroup, ValidatorFn, Validators } from '@angular/forms';


@Component({
  selector: 'br-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent {
  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13)
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(255)
      ]
    }),
    description: new FormControl('', { nonNullable: true }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(0)]
    }),
    foo: new FormGroup({
      bar: new FormControl('')
    })
  });

  isInvalid(controlName: string): boolean {


    const control = this.bookForm.get(controlName);

    return !!control && control.invalid && control.touched;

    /*if (!control) {
      return false;
    }

    return control.invalid && control.touched;*/



    /*if (control?.invalid && control.touched) {
      return true;
    } else {
      return false;
    }*/

  }

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.bookForm.get(controlName);
    if (!control) {
      return false;
    }

    return control.hasError(errorCode) && control.touched;
    // return control.getError(errorCode) && control.touched;
    // return control.errors[errorCode] && control.touched;
  }
}
