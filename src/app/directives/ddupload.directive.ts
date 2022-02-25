import { Directive, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDDUpload]'
})
export class DDUploadDirective {

  @Output() onFileDropped = new EventEmitter<any>();

  @HostBinding('style.background-color') public background = '#f5fcff'
  @HostBinding('style.opacity') public opacity = '1'

  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt:any) {

    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8'
  }

  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt:any) {
    evt.preventDefault();
    evt.stopPropagation();
    //this.background = '#f5fcff'
   // this.opacity = '1'
  }

  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt:any) {
    evt.preventDefault();
    evt.stopPropagation();
   // this.background = '#f5fcff'
    //this.opacity = '1'
    let match=evt.dataTransfer.getData('text/html').matchAll(/ src\s*=\s*"(.+?)"/g);

    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }
  }

}
