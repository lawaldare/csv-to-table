import { Component, OnInit } from '@angular/core';
import * as XLXS from 'xlsx';
import * as PAPA from 'papaparse'

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss']
})
export class StaticComponent implements OnInit {

  selectedFile: any = null;
  file = null;
  sheetNames: string[];
  workbook: any;
  name: string;
  extension: string;
  showTable: boolean = false;
  finalArray: any[] = [];
  term: string = "tech";
  config = {
    delimiter: "",	// auto-detect
    newline: "",	// auto-detect
    quoteChar: '"',
    escapeChar: '"',
    header: false,
    transformHeader: undefined,
    dynamicTyping: false,
    preview: 0,
    encoding: "",
    worker: false,
    comments: false,
    step: undefined,
    complete: undefined,
    error: undefined,
    download: false,
    downloadRequestHeaders: undefined,
    downloadRequestBody: undefined,
    skipEmptyLines: false,
    chunk: undefined,
    chunkSize: undefined,
    fastMode: undefined,
    beforeFirstChunk: undefined,
    withCredentials: undefined,
    transform: undefined,
    delimitersToGuess: [',', '\t', '|', ';', PAPA.RECORD_SEP, PAPA.UNIT_SEP]
  }

  constructor() {
  }

  ngOnInit() { }

  search(event) {
    this.finalArray = this.finalArray.filter(data => data.organization.includes(event));
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    let tempArray = []
    this.name = this.selectedFile.name;
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(this.selectedFile);
    fileReader.onload = (event: any) => {
      let binaryData = event.target.result;
      let result = PAPA.parse(binaryData, this.config).data;
      result.shift();
      for (let data of result) {
        let output = this.transformArray(data);
        tempArray.push(output);
      }

      if (this.term) {
        this.finalArray = tempArray.filter(data => data.organization.includes(this.term));
      } else {
        this.finalArray = tempArray;
      }

    }

  }

  covertSheetToJSON(sheet) {
    return XLXS.utils.sheet_to_json(sheet);
  }

  generateHeaders(object) {
    return Object.keys(object)
  }


  transformArray(array) {
    return {
      organization: array[0],
      town: array[1],
      country: array[2],
      type: array[3],
      route: array[4]
    }
  }

}
