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
  workbook: XLXS.WorkBook;

  constructor() {
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(this.selectedFile);
    fileReader.onload = (event: any) => {
      let binaryData = event.target.result;
      this.workbook = XLXS.read(binaryData, { type: 'binary' });
      this.sheetNames = this.workbook.SheetNames;
    }
  }

  covertSheetToJSON(sheet) {
    return XLXS.utils.sheet_to_json(sheet);
  }

  generateHeaders(object) {
    return Object.keys(object)
  }
}
