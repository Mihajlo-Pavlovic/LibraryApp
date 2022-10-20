import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookdayComponent } from './bookday.component';

describe('BookdayComponent', () => {
  let component: BookdayComponent;
  let fixture: ComponentFixture<BookdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookdayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
