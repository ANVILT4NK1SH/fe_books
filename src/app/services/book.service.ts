import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(this.url);
  }

  getMyBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.url}/mybooks`);
  }

  createBook(book: { title: string; author: string; read: boolean}): Observable<Book> {
    console.log(book)
    return this.http.post<Book>(this.url, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.url}/${book.id}`, book);
  }

  deleteBook(id: number): Observable<Book> {
    return this.http.delete<Book>(`${this.url}/${id}`);
  }
}
