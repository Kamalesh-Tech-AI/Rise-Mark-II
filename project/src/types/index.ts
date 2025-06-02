export type UserRole = 'buyer' | 'seller' | 'developer' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  avatar?: string;
  rating?: number;
  projectsCount?: number;
}

export type ContentCategory = 'project' | 'portfolio' | 'website' | 'phd' | 'custom';

export type ContentStatus = 'pending' | 'approved' | 'rejected';

export interface Content {
  id: string;
  title: string;
  description: string;
  sellerId: string;
  sellerName: string;
  category: ContentCategory;
  price: number;
  previewImages: string[];
  tags: string[];
  rating?: number;
  reviewCount?: number;
  status: ContentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type CustomProjectStatus = 
  | 'pending' 
  | 'developer_selection' 
  | 'in_progress' 
  | 'completed' 
  | 'security_check' 
  | 'delivered';

export interface CustomProject {
  id: string;
  title: string;
  description: string;
  buyerId: string;
  buyerName: string;
  developerId?: string;
  developerName?: string;
  price?: number;
  status: CustomProjectStatus;
  requirements: string;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}