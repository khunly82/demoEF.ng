import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { SponsorService } from './services/sponsorService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule, TableModule, ButtonModule, InputTextModule, FileUploadModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  sponsors: any[] = [];

  form: FormGroup

  constructor(private readonly sponsorService: SponsorService, private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      name: [],
      logoFile: []
    })
  }

  ngOnInit(): void {
    this.sponsorService.get().subscribe({
      next: data => this.sponsors = data
    })
  }

  select(event: any) {
    this.form.controls['logoFile'].setValue(event.currentFiles[0]);
  }

  submit() {
    if(this.form.valid) {
      console.log(this.form.value)
      this.sponsorService.post(this.form.value).subscribe({
        next: () => {
          this.form.reset();
          this.sponsorService.get().subscribe({
            next: data => this.sponsors = data
          })
        }
      });
    }
  }
}
