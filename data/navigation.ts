import type { NavLink } from '@/types';

export const mainNav: readonly NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
];

export const primaryCta: NavLink = {
  label: 'Get a Quote',
  href: '/quote',
};

export const secondaryCta: NavLink = {
  label: 'View Services',
  href: '/services',
};

export const footerNav: readonly NavLink[] = [
  ...mainNav,
  { label: 'Get a Quote', href: '/quote' },
];
