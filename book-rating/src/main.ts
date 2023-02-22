import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


/******************************** */

export class Customer {
  foo: string = '';

  // Kurzschreibweise
  constructor(private id: number) {}

  bar(foo: number): string {
    setTimeout(() => {
      console.log('ID ist:', this.id);
    }, 2000);

    return '';
  }
}


const myCustomer = new Customer(4);
console.log(myCustomer);
myCustomer.bar(5);




