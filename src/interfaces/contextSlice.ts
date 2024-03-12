import { Book, TableOfContent } from "./books";
import { User } from "./user";

export interface ContextSlice {
  isLoading: boolean;
  addBookDialogVisible: boolean;
  previewDialogVisible: boolean;
  updateBookDialogVisible: boolean;
  selectedBook: Book | null;
  loginDetails: User;
  books: Book[] | null;
  tableOfContent: TableOfContent[];
  subChapterInput: {
    chapterName: string;
    pageNumber: number;
  };
}
