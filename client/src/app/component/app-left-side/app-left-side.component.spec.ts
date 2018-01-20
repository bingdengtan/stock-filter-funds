import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLeftSideComponent } from './app-left-side.component';

describe('AppLeftSideComponent', () => {
  let component: AppLeftSideComponent;
  let fixture: ComponentFixture<AppLeftSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLeftSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLeftSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
