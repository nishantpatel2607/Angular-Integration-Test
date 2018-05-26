//Here we are going to test routes. The save button is navigating to users
import { Observable,Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { spawn } from 'child_process';


//step 1 - create a fake router. This is a dummy class with the same router methods like navigate etc
//which we are using in our real routes
class RouterStub {
  navigate(params){}
}
//This stub is for ActivatedRoutes and we are using its params object
class ActivatedRouteStub {
  private subject = new Subject(); //this is a class from Rxjs and has methods to push values in observables
  
  push(value){
    this.subject.next(value);
  }
  //params: Observable<any> = Observable.empty();

  //This will help  the component to use params property like observable
  get params() {
    return this.subject.asObservable(); 
  }
}

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  // Step 2- here we are telling angular to use our fake class instead of angular's Router class
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      providers: [
        {provide:Router, useClass: RouterStub}, 
        {provide:ActivatedRoute, useClass: ActivatedRouteStub}
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // step - 3 Testing a navigation
  it('should redirect the user to the users page after saving', () => {
    let router = TestBed.get(Router);
    let spy = spyOn (router, 'navigate');

    component.save();

    expect(spy).toHaveBeenCalledWith(['users']);
  });
  //Step - 4 Write a unit test to check if the route 'users' is present in the routes array.
  
  // Step - 5 Testing routes with parameters
  it('should navigate the user to the not found page when an invalid user id is passed', () => {
    let router = TestBed.get(Router);
    let spy = spyOn (router, 'navigate');

    let route:ActivatedRouteStub = TestBed.get(ActivatedRoute);
    route.push({id:0}); //This will push id=0 in observable in activated route.
    
    expect(spy).toHaveBeenCalledWith(['not-found']);
  });
});
