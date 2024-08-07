import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparqlEditorAreaComponent } from './sparql-editor-area.component';

describe('SparqlEditorAreaComponent', () => {
  let component: SparqlEditorAreaComponent;
  let fixture: ComponentFixture<SparqlEditorAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SparqlEditorAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparqlEditorAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
