import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TimelineMax, Power4 } from "gsap";

@Component({
  selector: 'app-favorite-banks',
  templateUrl: './favorite-banks.component.html',
  styleUrls: ['./favorite-banks.component.css']
})
export class FavoriteBanksComponent implements OnInit {

  bankData: Array<Object>;
  dataSource: any;
  displayedColumns: String[] = ['ifsc', 'bank_id', 'branch', 'address', 'city', 'district', 'state', 'bank_name', ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    const tableContainer = document.querySelector('.table-container');
    const webkitClipPath = {value:"circle(" + tableContainer.getBoundingClientRect().height/2+ " at 50% 50%)"};
    const overlay = document.querySelector(".overlay");
  }
  
  ngOnInit() {
    this.bankData = this.getFavoritesFromStorage();
    this.dataSource = new MatTableDataSource(this.bankData);
    this.dataSource.paginator = this.paginator;

    const container = document.querySelector(".container");
    const tableContainer = document.querySelector(".table-container");
    const overlay = document.querySelector(".overlay");
    var webkitClipPath = {value:"circle(10% at 50% 50%)"}
    const tl = new TimelineMax();
    tl.from(tableContainer, 1, {opacity: 0, x: 1000, ease: Power4.easeInOut}, "-=0.3")
      .to(webkitClipPath,.5,{value: 'circle(100% at 50% 50%)',  onUpdate: function () {(<HTMLElement>tableContainer).style.clipPath = webkitClipPath.value;}}, "-=0.2")
      .to(overlay,.5,{opacity: 0},'-=0.5');
  }

  getFavoritesFromStorage() {
    let list = [];
    var favorites = JSON.parse(localStorage.getItem("selection-map"))
    for (let key in favorites) {
      if (favorites.hasOwnProperty(key)) {
        favorites[key].forEach(element => {
          list.push(JSON.parse(element));
        });
      }
    }
    return list;
  }
  
}
