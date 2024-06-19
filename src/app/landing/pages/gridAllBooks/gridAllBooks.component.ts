import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { BookService } from '../../../services/book.service';
import { BookCardComponent } from '../../../shared/BookCard/BookCard.component';

@Component({
  selector: 'app-grid-all-books',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './gridAllBooks.component.html',
  styles: ``,
})
export default class GridAllBooksComponent {
  public bookService = inject(BookService);
  public allBooks = this.bookService.allBooks;
  public loading = this.bookService.loading;
  public mapped = this.bookService.mapped;
}
