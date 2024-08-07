import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { languages } from '@codemirror/language-data';
import {CodeEditor} from "@acrodata/code-editor";

@Component({
  selector: 'app-sparql-editor-area',
  templateUrl: './sparql-editor-area.component.html',
  styleUrls: ['./sparql-editor-area.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CodeEditor,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SparqlEditorAreaComponent),
      multi: true
    }
  ]
})
export class SparqlEditorAreaComponent implements ControlValueAccessor, OnInit {
  editorValue = '';

  options: any = {
    language: 'sparql',
    theme: 'light',
    setup: 'basic',
    disabled: false,
    readonly: false,
    placeholder: 'Type your SPARQL query here...',
    indentWithTab: false,
    indentUnit: '',
    lineWrapping: true,
    highlightWhitespace: false,
    height: { value: 300, unit: 'px' },
  };

  languages = languages;

  constructor() {}

  ngOnInit(): void {}

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.editorValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.options.disabled = isDisabled;
  }

  handleEditorChange(value: string) {
    this.editorValue = value;
    this.onChange(value);
    this.onTouched();
  }
}
