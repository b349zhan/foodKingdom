import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFoodComponent } from './my-food.component';

describe('MyFoodComponent', () => {
  let component: MyFoodComponent;
  let fixture: ComponentFixture<MyFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
