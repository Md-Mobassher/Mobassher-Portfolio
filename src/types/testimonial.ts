export interface TTestimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  testimonial: string;
  project: string;
  projectUrl: string;
  date: string;
  verified: boolean;
}

export interface TTestimonialCardProps {
  testimonial: TTestimonial;
}

export interface TStarRatingProps {
  rating: number;
}
