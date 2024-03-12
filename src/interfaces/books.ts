import { User } from "./user";

export interface Book {
  bookName: string;
  description: string;
  author: string;
  price: number;
  authorId: number;
  id?: number;
  tableOfContent?: TableOfContent[];
  chapter?: string;
  pageNumber?: number;
}

export interface TableOfContent {
  title: string;
  pageNumber: number;
  subChapters: TableOfContent[];
  id: string;
}

export interface BookTableProps {
  bookData: Book[];
  user: User;
}

export interface BookPreviewProps {
  onClose: () => void;
}

export interface BookCardProps {
  bookDetails: Book;
  user: User;
}

export interface ChapterDetail {
  chapterName: string;
  pageNumber: number;
}

export interface ChapterFormProps {
  data: TableOfContent;
  idx: number;
  style: CSSProperties;
}

export interface CSSProperties {
  [key: string]: string | number | null;
}
