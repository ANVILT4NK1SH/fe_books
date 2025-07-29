import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-new',
  imports: [ReactiveFormsModule],
  templateUrl: './book-new.component.html',
  styleUrl: './book-new.component.scss',
})
export class BookNewComponent {
  newBookForm: FormGroup;

  constructor(private bookService: BookService, private router: Router) {
    this.newBookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      read: new FormControl(false, Validators.required),
    });
  }

  create() {
    if (this.newBookForm.valid) {
      this.bookService.createBook(this.newBookForm.value).subscribe({
        next: (book: Book) => {
          console.log('Book created', book);
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.error('Error creating book', error);
        },
      });
    }
  }
}
