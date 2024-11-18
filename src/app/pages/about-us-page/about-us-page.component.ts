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
  styleUrls: ['./about-us-page.component.css'],
})
export class AboutUsPageComponent {
  tagline: string = 'Your one-stop shop for quality and convenience.';
  aboutUsDescription: string = `
    Welcome to our store! We take pride in offering a curated selection of the finest products 
    to meet your needs. From fresh, organic produce to reliable tech gadgets, 
    we have something for everyone. Our mission is to deliver quality, convenience, 
    and exceptional customer service every time you shop with us.
  `;

  mission: string = `
    To bring high-quality products to your doorstep with unmatched convenience, 
    ensuring a seamless shopping experience.
  `;

  offerings: string[] = [
    'Fresh, organic, and natural produce',
    'Reliable and durable tech products',
    'Home essentials and beyond',
    'Fast and free delivery on orders over $50',
  ];

  uniqueSellingPoints: string = `
    With a commitment to quality and customer satisfaction, we stand out by providing a 
    seamless shopping experience, carefully curated products, and excellent customer support. 
    Our store is not just about products—it's about creating lasting relationships with our customers.
  `;

  links = {
    email: 'support@ourstore.com',
    emailLink: 'mailto:support@ourstore.com',
    phone: '+1-800-123-4567',
    phoneLink: 'tel:+18001234567',
  };
}
