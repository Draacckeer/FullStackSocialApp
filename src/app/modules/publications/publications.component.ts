import {AfterViewInit, Component, ElementRef, OnInit} from "@angular/core";
import {Publication} from "../../models/publication";
import {PublicationsService} from "../../services/publications.service";
import {PublicationComment} from "../../models/publicationComment";
import {PublicationMessagesService} from "../../services/publicationMessages.service";
import io from "socket.io-client";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-publications',
  templateUrl: 'publications.component.html',
  styleUrls: ['publications.component.css']
})

export class PublicationsComponent implements OnInit, AfterViewInit{
  publicationCreate: Publication = {} as Publication;
  socket: any;
  publicationCommentCreate: PublicationComment = {} as PublicationComment;
  comment: string[] = [] as string[];
  publicationsData: Publication[] = [] as Publication[];
  publicationCommentsArranged: PublicationComment[][] = [] as PublicationComment[][];
  publicationCommentsData: PublicationComment[] = [] as PublicationComment[];
  constructor(
    private publicationsService: PublicationsService,
    private usersService: UsersService,
    private publicationMessagesService: PublicationMessagesService,
    private elementRef: ElementRef
              ) {

  }

  ngOnInit() {
    this.retrievePublications();
    this.socket = io('http://localhost:3000/');
    this.socket.on('addNewPublicationComment', (data: PublicationComment)=>{
      this.publicationCommentsArranged[this.publicationsData.findIndex(x=>x.id==data.publication)].push(data);
    });
    this.socket.on('addNewPublication', (data: Publication)=>{
      console.log(data);
      this.publicationsData.push(data);
      this.publicationCommentsArranged.push([]);
      console.log(data);
    });


  }

  ngAfterViewInit() {

    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#f0f2f5';
  }


  retrievePublications(){
    this.publicationCommentsArranged = [];
    this.publicationsService.getAll().subscribe((response: any)=>{
      this.publicationsData = response;


      this.publicationMessagesService.getAll().subscribe((response2: any)=>{
        this.publicationCommentsData = response2;
        for(let publication of this.publicationsData){
          this.publicationCommentsArranged.push(this.publicationCommentsData.filter(x=>x.publication==publication.id));
          let inputs = document.querySelectorAll("textarea");
          inputs.forEach(input => {
            input.addEventListener("keydown", (e)=>{
              if(e.key == "Enter" && !e.shiftKey){
                e.preventDefault();
              }
            });

          });

          document.getElementById("input" + publication.id)!
            .addEventListener("keyup", (e) => {
              e.preventDefault();
              if (e.key == "Enter" && !e.shiftKey) {
                document.getElementById("button" + publication.id)!.click();
              }
            });
        }

      })
    })
  }

  addNewPublication(){
    this.usersService.getUserPublicationByToken().subscribe({
      next: (response: any)=>{
        this.publicationCreate.userid = response.id;
        this.publicationCreate.username = response.username;
        this.publicationsService.create(this.publicationCreate).subscribe({
          next: (response2: any)=>{
            console.log(response2);
            this.publicationsData.push(response2);
            this.publicationCreate = {} as Publication;
            this.socket.emit('addNewPublication', response2);
            this.publicationCommentsArranged.push([]);
          }
        });
      }
    });
  }

  addNewComment(index: number, publicationId: number){
    this.usersService.getUserPublicationByToken().subscribe({
      next: (response: any)=>{
        this.publicationCommentCreate.userid = response.id;
        this.publicationCommentCreate.username = response.username;
        this.publicationCommentCreate.publication = publicationId;
        this.publicationCommentCreate.comment = this.comment[index];
        this.publicationCommentCreate.line = 0;
        this.publicationCommentCreate.level = 0;
        this.publicationCommentCreate.level1 = 0;
        this.publicationCommentCreate.level2 = 0;
        this.publicationCommentCreate.level3 = 0;
        this.publicationMessagesService.create(this.publicationCommentCreate).subscribe({
            next: (response2: any)=>{
              this.publicationCommentsArranged[index].push(response2);
              this.publicationCommentCreate = {} as PublicationComment;
              this.comment[index] = "";
              this.socket.emit('addNewPublicationComment', response2);
            }
        });
      }
    });

  }
}
