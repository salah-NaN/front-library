import { CommonModule } from '@angular/common';
import { Component, Inject, inject, signal } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, DialogComponent, FormsModule],
  templateUrl: './navBar.component.html',
  styles: ``,
})
export class NavBarComponent {
  //dependencies
  private bookService = inject(BookService);

  // signals
  public dialogVisible = signal<boolean>(false);
  public authorForm = signal<boolean>(false);
  public bookForm = signal<boolean>(false);
  public allAuthors = this.bookService.allAuthors;

  // author data related to form
  public author: any = {
    name: '',
    birthYear: 0,
    books: [],
  };

  // book data related to form
  public book: any = {
    title: '',
    year: 0,
    author_id: NaN,
    borrowRecordBooks: [],
  };

  public getAllAuthors = (): void => {
    this.bookService.getAllAuthors();
  };

  // to set only the author form taking profit of the same modal
  public setAuthorForm = (): void => {
    this.dialogVisible.update(() => !this.dialogVisible());
    this.authorForm.update(() => !this.authorForm());
  };

  // to set only the book form taking profit of the same modal
  public setBookForm = (): void => {
    if (!this.dialogVisible()) {
      this.getAllAuthors(); // to get all the authors, therefor i can map them within a select
    }
    this.dialogVisible.update(() => !this.dialogVisible());
    this.bookForm.update(() => !this.bookForm());
  };

  // post request to create a new author raw
  public createAuthor = (): void => {
    // sending request
    this.bookService.authorPostFetch(this.author);

    // close dialog
    this.setAuthorForm();
  };

  // post request to create a new book raw
  public createBook = (): void => {
    // find all author properties by id
    const author = this.allAuthors().find((author) => {
      return author.id == this.book.author_id;
    });

    // preparte the complete body
    const { author_id, ...provisionalBook } = this.book;
    const bookToSend = { ...provisionalBook, author };

    // sending request
    this.bookService.bookPostFetch(bookToSend);

    // close dialog
    this.setBookForm();
  };
}
