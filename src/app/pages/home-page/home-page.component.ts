import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/**
 * HomePageComponent
 */
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  highlights = [
    {
      title: 'Feature-Rich E-commerce Application',
      description:
        'Built with Angular and Node.js, this project showcases dynamic product listing, user authentication, and a responsive UI.',
      icon: 'bi bi-cart-check',
    },
    {
      title: 'Modern Frontend Development',
      description:
        'Utilizes Angular, TypeScript, and Bootstrap to deliver a seamless, responsive user experience.',
      icon: 'bi bi-window',
    },
    {
      title: 'Scalable Backend Architecture',
      description:
        'Designed with Node.js and MongoDB to support high traffic and efficient data handling.',
      icon: 'bi bi-server',
    },
    {
      title: 'Portfolio Integration',
      description:
        'Showcases software development skills and full-stack project implementation as part of a professional portfolio.',
      icon: 'bi bi-person-badge',
    },
  ];

  techStack = [
    'Angular',
    'TypeScript',
    'Bootstrap',
    'Node.js',
    'Express.js',
    'MongoDB',
    'REST APIs',
  ];
}
