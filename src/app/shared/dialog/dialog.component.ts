import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styles: ``,
})
export class DialogComponent {
  @Input({ required: true }) visible!: boolean;

  @ContentChild('dialogContent') content!: ElementRef;
  public ngAfterContentInit(): void {}
}
