import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructFormComponent } from './construct-form.component';

describe('ConstructFormComponent', () => {
  let component: ConstructFormComponent;
  let fixture: ComponentFixture<ConstructFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
