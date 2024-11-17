import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/**
 * AboutUsPageComponent
 */
@Component({
  selector: 'app-about-us-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.css',
})
export class AboutUsPageComponent {
  name: string = 'Your Name';
  profession: string = 'Software Developer';
  experience: string = 'Over X years of experience in full-stack development';
  description: string = `I specialize in building scalable, responsive, and user-friendly web applications.
                         This e-commerce project is a demonstration of my skills in frontend, backend,
                         and database development.`;

  techStack: string[] = [
    'Angular',
    'TypeScript',
    'Bootstrap',
    'Node.js',
    'Express.js',
    'MongoDB',
  ];

  links = {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    email: 'yourname@example.com',
  };
}
