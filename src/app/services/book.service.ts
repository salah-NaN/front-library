import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author, BookResponse } from '../interfaces/req-res';

interface State {
  books: BookResponse[];
  loading: boolean;
}

interface BookWithAvailability {
  book: BookResponse;
  available: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  // signals
  public http = inject(HttpClient);
  #books = signal<State>({
    books: [],
    loading: true,
  });
  #mapped = signal<Array<BookWithAvailability>>([]);
  #allAuthors = signal<Author[]>([]);

  // readable variables
  public allBooks = computed(() => this.#books().books);
  public loading = computed(() => this.#books().loading);
  public mapped = computed(() => this.#mapped());
  public allAuthors = computed(() => this.#allAuthors());

  constructor() {
    //func
    const isAvailable = (book: BookResponse): boolean => {
      return new Date(book.borrowRecordBooks[0].returnDate).getTime() >
        Date.now()
        ? false
        : true;
    };

    this.http
      .get<BookResponse[]>('http://localhost:8000/book')
      .subscribe((res) => {
        this.#books.set({
          books: res,
          loading: true,
        });

        // main mapping
        // this logic is basically for knowing if a book is available or not
        const books = res;
        console.log(books);
        // sorting borrow records
        books.forEach((book) => {
          book.borrowRecordBooks.sort(
            (rec1, rec2) =>
              new Date(rec1.returnDate).getTime() -
              new Date(rec2.returnDate).getTime()
          );
        });

        // mapping
        const mapped = books.map((book) => {
          return {
            book,
            available: !book.borrowRecordBooks.length
              ? true
              : isAvailable(book),
          };
        });

        this.#mapped.set(mapped);
      });
  }

  public authorPostFetch = (author: any): void => {
    this.http
      .post<Author>('http://localhost:8000/author', author)
      .subscribe((res) => {
        console.log(res);
      });
  };

  public getAllAuthors = (): void => {
    this.http.get<Author[]>('http://localhost:8000/author').subscribe((res) => {
      this.#allAuthors.set(res);
    });
  };

  public bookPostFetch = (book: any): void => {
    this.http
      .post<BookResponse>('http://localhost:8000/book', book)
      .subscribe((res) => {
        console.log(res);
      });
  };

  public deleteBook = (id: number): void => {
    this.http
      .delete<String>('http://localhost:8000/book/' + id)
      .subscribe((res) => {});
  };
}
