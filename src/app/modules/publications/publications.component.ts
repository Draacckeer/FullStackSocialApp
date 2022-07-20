import {AfterViewInit, Component, ElementRef, OnInit} from "@angular/core";
import {Publication} from "../../models/publication";
import {PublicationsService} from "../../services/publications.service";
import {PublicationComment} from "../../models/publicationComment";
import {PublicationCommentsService} from "../../services/publicationComments.service";
import io from "socket.io-client";
import {UsersService} from "../../services/users.service";
import {formatDate} from "@angular/common";

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
    private publicationCommentsService: PublicationCommentsService,
    private elementRef: ElementRef
              ) {

  }

  ngOnInit() {
    this.retrievePublications();
    // July 16, at 2:16:34 AM
    this.socket = io('https://full-stack-social-app-socket.herokuapp.com/');
    this.socket.on('addNewPublicationComment', (data: PublicationComment)=>{
      this.publicationCommentsArranged[this.publicationsData.findIndex(x=>x.id==data.publication)].push(data);
    });
    this.socket.on('addNewPublication', (data: Publication)=>{
      this.publicationsData.push(data);
      this.publicationCommentsArranged.push([]);
    });
  }

  ngAfterViewInit() {

    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#e0ecf4';
    document.getElementById("publicationContentAddTextarea")!
      .addEventListener("keyup", (e) => {
        e.preventDefault();
        if (e.key == "Enter" && !e.shiftKey) {
          document.getElementById("publicationContentAddButton")!.click();
        }
      });

  }


  retrievePublications(){
    this.publicationCommentsArranged = [];
    this.publicationsService.getAll().subscribe({
      next: (response: any)=>{
        this.publicationsData = response;

        this.publicationCommentsService.getAll().subscribe({
          next: (response2: any)=>{
            this.publicationCommentsData = response2;
            let inputs = document.querySelectorAll("textarea");
            inputs.forEach(input => {
              input.addEventListener("keydown", (e)=>{
                if(e.key == "Enter" && !e.shiftKey){
                  e.preventDefault();
                }
              });
            });
            for(let publication of this.publicationsData){
              publication.createdAt = formatDate(publication.createdAt, "MMMM d, 'at' h:mm a", 'en-US');
              this.publicationCommentsArranged.push(this.publicationCommentsData.filter(x=>x.publication==publication.id));
              document.getElementById("input" + publication.id)!
                .addEventListener("keyup", (e) => {
                  e.preventDefault();
                  if (e.key == "Enter" && !e.shiftKey) {
                    document.getElementById("button" + publication.id)!.click();
                  }
                });
            }
            for(let publicationComment of this.publicationCommentsData){
              publicationComment.createdAt = formatDate(publicationComment.createdAt, "MMMM d, 'at' h:mm a", 'en-US');
            }
          }
        });
      }
    })
  }

  addNewPublication(){
    this.usersService.getUserPublicationByToken().subscribe({
      next: (response: any)=>{
        this.publicationCreate.userid = response.id;
        this.publicationCreate.userAvatar = response.avatar;
        this.publicationCreate.username = response.username;
        this.publicationsService.create(this.publicationCreate).subscribe({
          next: (response2: Publication)=>{
            response2.createdAt = formatDate(response2.createdAt, "MMMM d, 'at' h:mm a", 'en-US');
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
    let actualComment = this.comment[index];
    if(actualComment == undefined || actualComment.replace(/\s/g,"") == ""){
      return;
    }
    this.comment[index] = "";
    this.usersService.getUserPublicationByToken().subscribe({
      next: (response: any)=>{
        this.publicationCommentCreate.userid = response.id;
        this.publicationCommentCreate.username = response.username;
        this.publicationCommentCreate.userAvatar = response.avatar;
        this.publicationCommentCreate.publication = publicationId;
        this.publicationCommentCreate.comment = actualComment;
        this.publicationCommentCreate.line = 0;
        this.publicationCommentCreate.level = 0;
        this.publicationCommentCreate.level1 = 0;
        this.publicationCommentCreate.level2 = 0;
        this.publicationCommentCreate.level3 = 0;
        this.publicationCommentsService.create(this.publicationCommentCreate).subscribe({
            next: (response2: any)=>{
              this.publicationCommentsArranged[index].push(response2);
              this.publicationCommentCreate = {} as PublicationComment;
              this.socket.emit('addNewPublicationComment', response2);
            }
        });
      }
    });

  }
}
