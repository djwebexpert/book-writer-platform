// Book card component
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil } from "@fortawesome/free-solid-svg-icons";
import { AppDispatch } from "../../redux/store";
import {
  setPreviewDialog,
  setSelectedBookData,
  setUpdateBookDialogVisible,
} from "../../redux/features/homeSlice";
import { Book } from "../../interfaces/books";
import { BookCardProps } from "../../interfaces/books";
import { getUser } from "../../redux/features/collaboratorSlice";
import { useEffect } from "react";
import { Role } from "../../constants";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// Function to update the book
const updateBook = (dispatch: AppDispatch, id: number) => {
  dispatch(setUpdateBookDialogVisible(true));
  window.history.replaceState(null, "", "/" + id);
};

// Function to preview the book
const previewBook = (dispatch: AppDispatch, book: Book) => {
  dispatch(setSelectedBookData(book));
  dispatch(setPreviewDialog(true));
};

const BookCard: React.FC<BookCardProps> = ({ bookDetails, user }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUser(user.id));
  }, [dispatch, user.id]);

  const { userData } = useSelector((state: any) => state.collaboratorSlice);

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
      <div className="custom-card">
        <div>
          <div className="book-title">
            <h6>{bookDetails?.bookName}</h6>
            <div className="card-icons">
              {(userData?.isActiveCollaborate ||
                user?.role === Role.AUTHOR) && (
                <FontAwesomeIcon
                  icon={faPencil}
                  className="fs-6 edit-icon me-2 text-light rounded"
                  onClick={() => updateBook(dispatch, bookDetails?.id!)}
                />
              )}
              <FontAwesomeIcon
                icon={faEye}
                onClick={() => previewBook(dispatch, bookDetails)}
                className="bg-secondary me-2 text-light rounded fs-6"
              />
            </div>
          </div>
          <div
            className={`${
              bookDetails?.description?.length > 80
                ? "card-description-ellipsis"
                : "card-description"
            } position-relative mb-0`}
          >
            {bookDetails?.description}
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between">
          <div className="book-price">
            ${bookDetails?.price?.toFixed(2)} <span>USD</span>
          </div>
          <div className="d-flex align-items-center py-2">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>{bookDetails?.author}</Tooltip>}
            >
              <div className="author-shortname">
                {bookDetails?.author?.split(" ")?.[0].charAt(0) +
                  "" +
                  bookDetails?.author
                    ?.split(" ")
                    ?.[bookDetails?.author?.split(" ")?.length - 1].charAt(0)}
              </div>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
