import {AfterViewInit, Component, ElementRef, OnInit} from "@angular/core";
import {Publication} from "../../models/publication";
import {PublicationsService} from "../../services/publications.service";
import {PublicationMessage} from "../../models/publicationMessage";
import {PublicationMessagesService} from "../../services/publicationMessages.service";

@Component({
  selector: 'app-publications',
  templateUrl: 'publications.component.html',
  styleUrls: ['publications.component.css']
})

export class PublicationsComponent implements OnInit, AfterViewInit{

  publicationsData: Publication[] = [] as Publication[];
  publicationMessagesArranged: PublicationMessage[][] = [] as PublicationMessage[][];
  publicationMessagesData: PublicationMessage[] = [] as PublicationMessage[];
  constructor(
    private publicationsService: PublicationsService,
    private publicationMessagesService: PublicationMessagesService,
    private elementRef: ElementRef
              ) {

  }

  ngOnInit() {
    this.retrievePublications();

  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#f0f2f5';
  }


  retrievePublications(){
    this.publicationsService.getAll().subscribe((response: any)=>{
      this.publicationsData = response;
      this.publicationMessagesService.getAll().subscribe((response2: any)=>{
        this.publicationMessagesData = response2;
        for(let publication of this.publicationsData){
          this.publicationMessagesArranged.push(this.publicationMessagesData.filter(x=>x.publication==publication.id));
        }
      })
    })
  }
}
