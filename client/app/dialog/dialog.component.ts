import { Component, Inject, OnInit } from "@angular/core";
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";

@Component({
  templateUrl: 'dialog.component.html'
})
export class DialogComponent implements OnInit {
  avatars = new Array(5).fill(0).map((_, i) => `svg-${i+1}`);
  name: any;
  details:any;
  isDataAvailable:boolean = false;
  selectedAvatar = this.avatars[0];
  constructor(   @Inject(MD_DIALOG_DATA) private data:any,public dialogRef: MdDialogRef<DialogComponent>) {
  
  }

    public ngOnInit() {
    //set custom data from parent component
    console.log(this.data);
    if(this.data){
      this.name = this.data.name;
      this.details = this.data.details;
      this.selectedAvatar =this.data.avatar;
    }else{
      this.name = "";
      this.details = "";
      this.selectedAvatar =this.avatars[0];
    }
    console.log(this.selectedAvatar);
    this.isDataAvailable =true;
  }

  
}
