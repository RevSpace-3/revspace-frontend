import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupHubComponent } from './group-hub.component';

describe('GroupHubComponent', () => {
  let component: GroupHubComponent;
  let fixture: ComponentFixture<GroupHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
