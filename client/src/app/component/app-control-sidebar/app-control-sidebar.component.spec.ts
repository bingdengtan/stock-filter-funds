import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppControlSidebarComponent } from './app-control-sidebar.component';

describe('AppControlSidebarComponent', () => {
  let component: AppControlSidebarComponent;
  let fixture: ComponentFixture<AppControlSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppControlSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppControlSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
