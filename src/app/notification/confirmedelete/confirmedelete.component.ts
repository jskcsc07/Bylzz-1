import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jsk-confirmedelete',
  imports: [], templateUrl: './confirmedelete.component.html',
  styles: `body {
  font-family: Arial, sans-serif;
  background: url(http://www.shukatsu-note.com/wp-content/uploads/2014/12/computer-564136_1280.jpg) no-repeat;
  background-size: cover;
  height: 100vh;
}




`
})
export class ConfirmedeleteComponent implements OnInit {
  //data:any;

  constructor() {
    //  alert("working library");
    // this.data = this.popupedit.getdata();
  }

  @Input() args: any;
  ngOnInit(): void {

  }
  alertfun(args: any) {
    this.args = args;
  }
}
