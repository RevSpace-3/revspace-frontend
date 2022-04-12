import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGroupThreadComponent } from './view-group-thread.component';

describe('ViewGroupThreadComponent', () => {
  let component: ViewGroupThreadComponent;
  let fixture: ComponentFixture<ViewGroupThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGroupThreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGroupThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
