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
  selectedFile: File | null = null;

  constructor(private bookService: BookService, private router: Router) {
    this.newBookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      read: new FormControl(false, Validators.required),
    });
  }

  onFileSelected(event: any) {
    if(event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    }
  }

  create() {
    if (this.newBookForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.newBookForm.get('title')!.value!);
      formData.append('author', this.newBookForm.get('author')!.value!);
      formData.append('read', this.newBookForm.get('read')!.value!);
      formData.append('cover_image', this.selectedFile, this.selectedFile.name);

      this.bookService.createBook(formData).subscribe({
        next: (book: Book) => {
          console.log('Book created', book);
          this.router.navigate(['/']);          
        },
        error: (error: any) => {
          console.error('Error creating book', error);
        },
      })
    }
  }
}
