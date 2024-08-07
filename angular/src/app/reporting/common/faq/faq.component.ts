import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  faqs = [
    {
      question: 'What is the Report Generator?',
      answer: 'The Report Generator is a useful tool for semantic developers. It allows you to generate different types of outputs, such as XLSX and DOCX, from semantic data sources.'
    },
    {
      question: 'How do I use the Report Generator?',
      answer: 'To use the Report Generator, you need to create a model definition, select the data from the model, and then choose a reporting template. Finally, you can export the report in your desired format.'
    },
    {
      question: 'What types of outputs can I generate?',
      answer: 'You can generate outputs in various formats including XLSX (Excel) and DOCX (Word). This allows for flexible reporting and data presentation.'
    },
    {
      question: 'Can I customize the reporting template?',
      answer: 'Yes, you can customize the reporting templates to fit your specific needs. The tool provides options to define the structure and style of your reports.'
    }
  ];
}
