import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    const ratingMock = {
      rateUp: (book: Book) => book,
      rateDown: (book: Book) => book,
    };

    /*const storeMock = {
      getAll: () => of([])
    };*/

    /*const routeMock = {
      paramMap: of({ get: (key: string) => '123' })
    }*/

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent,  ],
      providers: [
        // BRS ersetzen: immer wenn BRS angefordert wird, wird stattdessen ratingMock ausgeliefert
       {
          provide: BookRatingService,
          useValue: ratingMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Shallow Component Test
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    // Zugriff auf das Host-Element:
    // Beispiel: fixture.nativeElement.querySelector('br-book')
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp() for doRateUp()', () => {
    // Arrange
    // Service anfordern (das ist tatsächlich unser ratingMock!)
    const rs = TestBed.inject(BookRatingService);

    // Buch
    const book = { isbn: '123', title: 'TESTBUCH' } as Book; // Type Assertion (Vorsicht!)

    // Service/Mock überwachen
    // spyOn(rs, 'rateUp').and.returnValue(book);
    // spyOn(rs, 'rateUp').and.callFake(book => book);
    spyOn(rs, 'rateUp').and.callThrough();

    // Act
    component.doRateUp(book);

    // Assert
    // prüfen, ob Methode aufgerufen wurde
    // expect(rs.rateUp).toHaveBeenCalled();
    // expect(rs.rateUp).toHaveBeenCalledTimes(1);
    // expect(rs.rateUp).toHaveBeenCalledWith(book);
    expect(rs.rateUp).toHaveBeenCalledOnceWith(book);
  });
});
