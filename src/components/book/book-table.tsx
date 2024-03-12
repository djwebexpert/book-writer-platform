// BookTable component displays a list of books in a grid layout
import React from "react";

// Importing necessary interfaces and components
import { Book } from "../../interfaces/books";
import { BookTableProps } from "../../interfaces/books";
import BookCard from "./book-card";

// BookTable component receives bookData as props and renders a BookCard for each book
const BookTable: React.FC<BookTableProps> = ({ bookData, user }) => {
  return (
    <div className="row">
      {/* Map over bookData to render a BookCard for each book */}
      {!!bookData?.length ? (
        bookData?.map((book: Book) => (
          <BookCard key={book.id} bookDetails={book} user={user} />
        ))
      ) : (
        <p>No book found</p>
      )}
    </div>
  );
};

export default BookTable;
