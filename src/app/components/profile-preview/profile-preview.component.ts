import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-preview',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './profile-preview.component.html',
  styleUrl: './profile-preview.component.css',
})
export class ProfilePreviewComponent {}
