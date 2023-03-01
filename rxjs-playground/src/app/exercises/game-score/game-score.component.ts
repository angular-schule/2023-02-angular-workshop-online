import { Component } from '@angular/core';
import { Subject, ReplaySubject, scan, reduce, of, startWith } from 'rxjs';

@Component({
  selector: 'rxw-game-score',
  templateUrl: './game-score.component.html',
})
export class GameScoreComponent {

  logStream$ = new ReplaySubject<string | number>();
  score$ = new Subject<number>();

  currentScore = 0;
  finalScore?: number;

  constructor() {
    /**
     * Wir entwickeln ein spannendes Browser-Spiel!
     * Jetzt fehlt nur noch der Code, um den Punktestand zu ermitteln ...
     */

    /******************************/

    // [1,2,3,4,5,6].reduce((acc, item) => acc + item); // 21

    this.score$.pipe(
      scan((acc, item) => acc + item, 0)
    ).subscribe(score => {
      this.currentScore = score;
    });


    /******************************/

    of(
      'SETNAMEF', // { type: 'SETNAME', data: 'Ferdinand' }
      'SETCITYL',
      'SETNAMEN',
      'SETCITYHH',
      'SETFRANG',
      'SETFRREACT'
    ).pipe(
      startWith('INIT'),
      scan((acc, msg) => {
        switch (msg) {
          case 'SETNAMEF': return { ...acc, name: 'Ferdinand' };
          case 'SETNAMEN': return { ...acc, name: 'Nurhat' };
          case 'SETCITYL': return { ...acc, city: 'Leipzig' };
          case 'SETCITYHH': return { ...acc, city: 'Hamburg' };
          case 'SETCITYMUC': return { ...acc, city: 'München' };
          case 'SETFRANG': return { ...acc, framework: 'Angular' };
          default: return acc;
        }
      }, { name: 'Klaus', city: 'München' })
    ).subscribe(e => console.log(e));


    /******************************/

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  finishGame() {
    this.score$.complete();
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
