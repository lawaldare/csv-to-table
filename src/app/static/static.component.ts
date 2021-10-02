import { Component, OnInit } from '@angular/core';
import * as PAPA from 'papaparse'
import { data } from '../../assets/db';

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
  listOfData: any[] = [];
  term: string = "tech";
  searchValue = '';
  visible = false;
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

  ngOnInit() {
    // if (JSON.parse(localStorage.getItem('__data__'))) {
    //   this.finalArray = JSON.parse(localStorage.getItem('__data__'))
    // } else {
    //   this.finalArray = [];
    // }
    this.finalArray = data;
  }

  // search(event) {
  //   this.finalArray = this.finalArray.filter(data => data.organization.includes(event));
  // }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

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

      this.finalArray = [...tempArray];
      this.listOfData = [...tempArray];

      this.exportToJsonFile(this.finalArray);
    }

  }

  exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.finalArray = this.listOfData.filter((item) => item.organization.toLowerCase().indexOf(this.searchValue) !== -1);
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
