//testing router outlet
//testing the link to todos pages
import { RouterOutlet,RouterLinkWithHref } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; 
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  //step 1 - import RouterTestingModule
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])], 
      declarations: [ AppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  //step 2 
  it('should have router outlet', () => {
    let de = fixture.debugElement.query(By.directive(RouterOutlet));

    expect(de).not.toBeNull();
  });

  //step -3
  it('should have link to todos page', () => {
    let de = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));//returns array of all link elements

    let index = de.findIndex(de => de.properties ['href'] === '/todos');
    expect(index).toBeGreaterThan(-1);
  });
});
