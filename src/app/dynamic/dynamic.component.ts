import { Component, OnInit } from '@angular/core';
import * as XLXS from 'xlsx';


@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {

  constructor() { }

  selectedFile: any = null;
  file = null;
  sheetNames: string[];
  workbook: any;
  name: string;
  extension: string;
  showTable: boolean = false;

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.extension = this.selectedFile.name.split('.')[1];
    if (this.extension === 'xlsx' || this.extension === 'xls' || this.extension === 'csv') {
      this.showTable = true;
      this.name = this.selectedFile.name;
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(this.selectedFile);
      fileReader.onload = (event: any) => {
        let binaryData = event.target.result;
        this.workbook = XLXS.read(binaryData, { type: 'binary' });
        this.sheetNames = this.workbook.SheetNames;
      }
    } else {
      this.showTable = false;
      this.name = null;
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
