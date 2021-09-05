import { ElementRef, HostListener, Input, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UploadAppDataComponent } from '../upload-app-data/upload-app-data.component';
import { MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',

providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: UploadAppDataComponent,
    multi: true
  }
]
})
export class FileUploadComponent {
  @Input() progress;
  onChange: Function;
  private file: File | null = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  constructor( private host: ElementRef<HTMLInputElement> ) {
  }

  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }

}