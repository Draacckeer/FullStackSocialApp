import {AfterViewInit, Component, ElementRef, OnInit} from "@angular/core";
import {Publication} from "../../models/publication";
import {PublicationsService} from "../../services/publications.service";
import {PublicationComment} from "../../models/publicationComment";
import {PublicationMessagesService} from "../../services/publicationMessages.service";
import io from "socket.io-client";

@Component({
  selector: 'app-publications',
  templateUrl: 'publications.component.html',
  styleUrls: ['publications.component.css']
})

export class PublicationsComponent implements OnInit, AfterViewInit{
  dataTest: number = 0;
  commentTest: any;
  socket: any;
  publicationCommentCreate: PublicationComment = {} as PublicationComment;
  comment: string[] = [] as string[];
  publicationsData: Publication[] = [] as Publication[];
  publicationCommentsArranged: PublicationComment[][] = [] as PublicationComment[][];
  publicationCommentsData: PublicationComment[] = [] as PublicationComment[];
  constructor(
    private publicationsService: PublicationsService,
    private publicationMessagesService: PublicationMessagesService,
    private elementRef: ElementRef
              ) {

  }

  ngOnInit() {
    this.retrievePublications();
    this.socket = io('https://full-stack-social-app-socket.herokuapp.com/');
    this.socket.on('data', (data: any)=>{
      this.dataTest = data.x;
    })
    this.socket.on('addNewPublicationComment', (data: any)=>{
      this.commentTest = data;
    })
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#f0f2f5';
  }

  testSocketIo(){
    this.socket.emit('increment', 1);
    this.socket.emit('addNewPublicationComment', "asdsdwew");
  }


  retrievePublications(){
    this.publicationCommentsArranged = [];
    this.publicationsService.getAll().subscribe((response: any)=>{
      this.publicationsData = response;
      this.publicationMessagesService.getAll().subscribe((response2: any)=>{
        this.publicationCommentsData = response2;
        for(let publication of this.publicationsData){
          this.publicationCommentsArranged.push(this.publicationCommentsData.filter(x=>x.publication==publication.id));
        }
      })
    })
  }

  addNewComment(index: number, publicationId: number){
    this.publicationCommentCreate.comment = this.comment[index];
    this.publicationCommentCreate.publication = publicationId;
    this.publicationCommentCreate.line = 0;
    this.publicationCommentCreate.level = 0;
    this.publicationCommentCreate.level1 = 0;
    this.publicationCommentCreate.level2 = 0;
    this.publicationCommentCreate.level3 = 0;
    console.log(this.publicationCommentCreate.comment);
    this.publicationMessagesService.create(this.publicationCommentCreate).subscribe((response: any)=>{
      console.log(response);
      this.publicationCommentsArranged[index].push(response);
      this.publicationCommentCreate = {} as PublicationComment;
      this.comment[index] = '';
    })
  }
}
