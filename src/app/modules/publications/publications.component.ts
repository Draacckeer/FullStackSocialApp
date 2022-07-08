import {Component, OnInit} from "@angular/core";
import {Publication} from "../../models/publication";
import {PublicationsService} from "../../services/publications.service";

@Component({
  selector: 'app-publications',
  templateUrl: 'publications.component.html'
})

export class PublicationsComponent implements OnInit {
  publicationsData: Publication[] = [] as Publication[];
  constructor(private publicationsService: PublicationsService) {

  }

  ngOnInit() {
    this.retrievePublications();
  }

  retrievePublications(){
    this.publicationsService.getAll().subscribe((response: any)=>{
      this.publicationsData = response;
    })
  }
}
