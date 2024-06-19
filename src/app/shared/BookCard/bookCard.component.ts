import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './BookCard.component.html',
  styles: ``,
})
export class BookCardComponent {
  // props
  @Input({ required: true }) imageName!: number;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) year!: number;
  @Input({ required: true }) author!: string;
  @Input({ required: true }) available!: boolean;

  // dependecies
  private bookService = inject(BookService);

  public deleteBook = (id: number): void => {
    console.log(id);
    this.bookService.deleteBook(id);
  };
}
