import { Component, OnInit, } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  imports: [FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  title: string = '';
  author: string = '';
  read: boolean = false;

  constructor(private bookService: BookService){}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((response) => {
      this.books = response
    })
  }

  createBook(title: string, author: string, read: boolean){
    this.bookService
      .createBook({ title, author, read })
      .subscribe((response) => {
        this.books.push(response);
      });
  }

  deleteBook(id: number){
    this.bookService.deleteBook(id).subscribe((response) => {
      this.books = this.books.filter((book) => book.id !== response.id);
    });
  }

  updateRead(book: Book){
    book.read = !book.read
    this.bookService.updateBook(book).subscribe((response) => {
      const index = this.books.findIndex((book) => book.id === response.id);
      this.books[index] = response;
    });
  }
}
