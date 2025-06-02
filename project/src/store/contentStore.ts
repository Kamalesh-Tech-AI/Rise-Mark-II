import { create } from 'zustand';
import { Content, ContentCategory, CustomProject } from '../types';

interface ContentState {
  marketplaceContent: Content[];
  myUploads: Content[];
  customProjects: CustomProject[];
  
  // Actions
  setMarketplaceContent: (content: Content[]) => void;
  setMyUploads: (content: Content[]) => void;
  addUpload: (content: Content) => void;
  updateUploadStatus: (id: string, status: Content['status']) => void;
  setCustomProjects: (projects: CustomProject[]) => void;
  updateProjectStatus: (id: string, status: CustomProject['status'], progress: number) => void;
}

// Sample data for MVP demo
const sampleContent: Content[] = [
  {
    id: '1',
    title: 'E-commerce Platform with React',
    description: 'A complete e-commerce solution built with React, Node.js, and MongoDB.',
    sellerId: 'seller1',
    sellerName: 'Tech Solutions',
    category: 'project',
    price: 299.99,
    previewImages: [
      'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg',
      'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg'
    ],
    tags: ['react', 'ecommerce', 'nodejs', 'mongodb'],
    rating: 4.8,
    reviewCount: 24,
    status: 'approved',
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2024-08-15')
  },
  {
    id: '2',
    title: 'Portfolio Website Template',
    description: 'Modern portfolio website template for creative professionals.',
    sellerId: 'seller2',
    sellerName: 'Design Masters',
    category: 'portfolio',
    price: 149.99,
    previewImages: [
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg'
    ],
    tags: ['portfolio', 'responsive', 'creative'],
    rating: 4.5,
    reviewCount: 18,
    status: 'approved',
    createdAt: new Date('2024-08-05'),
    updatedAt: new Date('2024-08-10')
  },
  {
    id: '3',
    title: 'AI Implementation in Healthcare',
    description: 'PhD research on AI applications in modern healthcare systems.',
    sellerId: 'seller3',
    sellerName: 'Dr. Smith',
    category: 'phd',
    price: 499.99,
    previewImages: [
      'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg',
      'https://images.pexels.com/photos/3786215/pexels-photo-3786215.jpeg'
    ],
    tags: ['ai', 'healthcare', 'research', 'phd'],
    rating: 5.0,
    reviewCount: 7,
    status: 'approved',
    createdAt: new Date('2024-07-20'),
    updatedAt: new Date('2024-08-05')
  }
];

export const useContentStore = create<ContentState>((set) => ({
  marketplaceContent: sampleContent,
  myUploads: [],
  customProjects: [],
  
  setMarketplaceContent: (content) => set({ marketplaceContent: content }),
  setMyUploads: (content) => set({ myUploads: content }),
  
  addUpload: (content) => set((state) => ({
    myUploads: [...state.myUploads, content]
  })),
  
  updateUploadStatus: (id, status) => set((state) => ({
    myUploads: state.myUploads.map(item => 
      item.id === id ? { ...item, status } : item
    )
  })),
  
  setCustomProjects: (projects) => set({ customProjects: projects }),
  
  updateProjectStatus: (id, status, progress) => set((state) => ({
    customProjects: state.customProjects.map(project => 
      project.id === id ? { ...project, status, progress } : project
    )
  }))
}));