import {AfterViewInit, Component, ElementRef, OnInit} from "@angular/core";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#c0deed';
  }

}
