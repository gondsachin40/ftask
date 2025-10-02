import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObjective } from './add-objective';

describe('AddObjective', () => {
  let component: AddObjective;
  let fixture: ComponentFixture<AddObjective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddObjective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddObjective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
