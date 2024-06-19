export interface BookResponse {
  id: number;
  year: number;
  title: string;
  author: Author;
  borrowRecordBooks: BorrowRecordBook[];
}

export interface Author {
  id: number;
  name: string;
  birthYear: number;
}

export interface BorrowRecordBook {
  id: number;
  personName: string;
  returnDate: Date;
}
