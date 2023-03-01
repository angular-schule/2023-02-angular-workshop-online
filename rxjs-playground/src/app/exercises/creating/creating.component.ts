import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Subscriber, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'rxw-creating',
  templateUrl: './creating.component.html',
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    // of('A', 'B', 'C')
    // from([1,2,3,4,5,6])
    // timer(3000) // ---------0| // setTimeout
    // interval(1000) ---0---1---2---3---4---5--- ... // setInterval
    // timer(0, 1000) 0---1---2---3---4---5--- ...
    // timer(3000, 1000) ---------0---1---2---3---4---5--- ...

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE'),
    });






    /******************************/


    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);

      sub.next(5);
      setTimeout(() => sub.next(6), 1000);
      setTimeout(() => sub.complete(), 5000);

      const myinterval = setInterval(() => {
        sub.next(Date.now());
        console.log('XXX', Date.now());
      }, 1000)

      // Teardown Logic
      return () => {
        console.log('Teardown Logic')
        clearInterval(myinterval);
      }
    }

    const obs = {
      next: (value: number) => console.log(value),
      error: (err: any) => console.error(err),
      complete: () => console.log('COMPLETE')
    }

    // producer(obs);
    // Finnische Notation
    const myObservable$ = new Observable(producer);
    const myObservable2$ = new Observable((sub) => {
      sub.next(1)
      sub.next(2)
      sub.next(3)
    });

    // myObservable$.subscribe(obs);
    // setTimeout(() => subscription.unsubscribe(), 5000);



    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
