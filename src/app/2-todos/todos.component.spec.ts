//Here we are going to test service dependency

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import {HttpModule} from '@angular/http'; // import http module as todoservice depends on it
import {TodoService} from './todo.service'; //import the service
import {Observable} from 'rxjs';
import { Component } from '@angular/core/src/metadata/directives';

describe('TodosComponent', () => {
  let component: TodosComponent; 
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpModule],
      declarations: [ TodosComponent ],
      providers: [TodoService] //declare service in provider so angular can create its instanceng test

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges(); //Removed this line when testing ngOnInit in test method because ngOnInit will be
    //already executed by this line and will not be able to run our test
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  //this code will test the component creation and ngOnInit. 
  //if we remove implements Oninit from the component code, it will not generate any error and also
  //will not execute ngOnInit method. so we need to test that ngOnInit is called when the component is created.
    it('should load todos from the server', ()=> {

      let service =  TestBed.get(TodoService); //This statement can only work if the dependencies are registered at module level
      spyOn(service,'getTodos').and.returnValue(Observable.from([[1,2,3]]));
      fixture.detectChanges(); // called this method here so the service can load observable from the array
      expect(component.todos.length).toBe(3);
  });
});
