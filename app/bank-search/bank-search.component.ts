import { Component, OnInit, ViewChild } from '@angular/core';
import { BankApiService } from "src/app/bank-api.service"
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

import { TimelineMax, Power4 } from "gsap";

@Component({
  selector: 'bank-search',
  templateUrl: './bank-search.component.html',
  styleUrls: ['./bank-search.component.css']
})
export class BankSearchComponent implements OnInit {
  branchdata: Array<Object>;
  dataSource: any;
  showSpinner: Boolean;
  selectedCity: string = "DELHI";

  displayedColumns: String[] = ['ifsc', 'bank_id', 'branch', 'address', 'city', 'district', 'state', 'bank_name', 'select',];
  selection = new SelectionModel<any>(true, []);

  selectionCityMap = {};

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private bankapi: BankApiService) {

  }

  ngOnInit() {
    this.showSpinner = true;
    if (!(this.selectedCity in this.selectionCityMap)) {
      this.selectionCityMap[this.selectedCity] = new SelectionModel<any>(true, []);
    }
    this.fetchData(this.selectedCity);

    const container = document.querySelector(".container");
    const tableContainer = document.querySelector(".table-container");
    const overlay = document.querySelector(".overlay");
    const webkitClipPath = {value:"circle(10% at 50% 50%)"}
    
    const tl = new TimelineMax();
    tl.from(tableContainer, 1, {opacity: 0, x: -1000, ease: Power4.easeInOut}, "-=0.3")
      .to(webkitClipPath,.5,{value: 'circle(100% at 50% 50%)',  onUpdate: function () {(<HTMLElement>tableContainer).style.clipPath = webkitClipPath.value;}}, "-=.2")
      .to(overlay,.5,{opacity: 0},'-=0.5')
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Table Helper Functions
  fetchData(city: String) {
    this.showSpinner = true;
    this.dataSource = null;
    this.bankapi.getBankData(city).subscribe((data) => {
      this.showSpinner = false;
      this.branchdata = <Array<Object>>data;
      this.dataSource = new MatTableDataSource(this.branchdata);
      this.dataSource.paginator = this.paginator;
      this.populateSelectedCityMap();
    })
  }

  populateSelectedCityMap(): any {
    var storageSelectionMap = JSON.parse(localStorage.getItem("selection-map"));
    for (let city in storageSelectionMap) {
      if (storageSelectionMap.hasOwnProperty(city)) {
        if (!(city in this.selectionCityMap)) {
          this.selectionCityMap[city] = new SelectionModel<any>(true, []);
        }
        for (let key in storageSelectionMap[city]) {
          this.selectionCityMap[city].select(storageSelectionMap[city][key]);
        }
      }
    }
  }


  cityChanged(city: String) {
    if (!(this.selectedCity in this.selectionCityMap)) {
      this.selectionCityMap[this.selectedCity] = new SelectionModel<any>(true, []);
    }
    this.fetchData(city);

    const tableContainer = document.querySelector('.table-container');
    const webkitClipPath = {value:"circle(" + tableContainer.getBoundingClientRect().height/2+ " at 50% 50%)"};
    const overlay = document.querySelector(".overlay");

    var tl = new TimelineMax();
    tl.to(webkitClipPath, .3,{value: "circle(10px at 50% 50%)", onUpdate:function () {(<HTMLElement>tableContainer).style.clipPath = webkitClipPath.value;}})
      .to(overlay, .5,{opacity: 5},'-=1')
      .to(webkitClipPath, 0.5,{value: "circle(100% at 50% 10%)", onUpdate:function () {(<HTMLElement>tableContainer).style.clipPath = webkitClipPath.value;}}) 
      .to(overlay, .5,{opacity: 0},'-=0.5');
  }

  //Select Favorite Helper Fucntions
  isAllSelected() {
    const numSelected = this.selectionCityMap[this.selectedCity].selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selectionCityMap[this.selectedCity].clear() :
      this.dataSource.data.forEach(row => this.selectionCityMap[this.selectedCity].select(JSON.stringify(row)));
    this.saveSelectionData();
  }

  saveSelectionData(): any {
    let storageObj = {};
    for (let key in this.selectionCityMap) {
      if (this.selectionCityMap.hasOwnProperty(key)) {
        storageObj[key] = this.selectionCityMap[key].selected;
      }
    }
    localStorage.setItem("selection-map", JSON.stringify(storageObj));
  }

  checkBoxClicked(row) {
    if (row) {
      this.selectionCityMap[this.selectedCity].toggle(JSON.stringify(row));
      this.saveSelectionData();
    }
  }

  isCheckBoxSelected(row) {
    return this.selectionCityMap[this.selectedCity].isSelected(JSON.stringify(row));
  }
}
