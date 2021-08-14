import { Component, ViewChild } from '@angular/core';
import * as XLXS from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedFile: any = null;
  file = null;
  sheetNames: string[];
  workbook: any;
  name: string;
  extension: string;

  constructor() {
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.name = event.target.files[0].name;
    this.extension = this.name.split('.')[1];
    if (this.extension === 'xlsx' || this.extension === 'xls' || this.extension === 'csv') {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(this.selectedFile);
      fileReader.onload = (event: any) => {
        let binaryData = event.target.result;
        this.workbook = XLXS.read(binaryData, { type: 'binary' });
        this.sheetNames = this.workbook.SheetNames;
      }
    } else {
      alert('Please upload a .csv or .xls or .xlxs file');
    }

  }

  covertSheetToJSON(sheet) {
    return XLXS.utils.sheet_to_json(sheet);
  }

  generateHeaders(object) {
    return Object.keys(object)
  }
}
