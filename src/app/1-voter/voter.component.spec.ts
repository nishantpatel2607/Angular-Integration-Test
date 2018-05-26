//in unit testing we were creating the component to test, 
//but in integration testing we ask angular to create the component 

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By} from '@angular/platform-browser';
import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {
  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>;

  beforeEach(async(() => {
     //creating a dynamic testing module. As we declare components in app module, 
    //similarly we need to declare component in this module
    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterComponent);//This method is returning component fixture 
    //which represents component's template and component itself
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Testing property binding
  it('should render total votes', () => {
    component.othersVote = 20;
    component.myVote = 1;
    fixture.detectChanges();  // runs angular's change detection

    let de = fixture.debugElement.query(By.css('.vote-count')); // By.directive - to query custom directive ..queryAll will returl all
    let el: HTMLElement =  de.nativeElement;
    
    expect(el.innerText).toContain("21");
  });

  // Testing class binding
  it('should highlight upvote button if upvoted', () => {
    component.myVote=1;
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.glyphicon-menu-up'));

    expect(de.classes['highlighted']).toBeTruthy();

  });

  //event binding test
  it('should increase total vote when upvote button clicked', () => {
    let button = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
    button.triggerEventHandler('click',null); // null -  is the data to send in event

    expect(component.totalVotes).toBe(1);
  });
});
