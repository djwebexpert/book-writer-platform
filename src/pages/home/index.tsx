import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  fetchAllBookData,
  resetSelectedBookData,
  resetTableOfContentWhole,
  setAddBookDialogVisible,
  setPreviewDialog,
  setUpdateBookDialogVisible,
} from "../../redux/features/homeSlice";

import { getLocalStorageItem } from "../../utils/common";
import { User } from "../../interfaces/user";
import { Role } from "../../constants";
import DialogBox from "../../components/layout/add-edit-dialog-box";
import BookTable from "../../components/book/book-table";
import BookPreview from "../../components/book/book-preview-modal";
import { Modal } from "react-bootstrap";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    addBookDialogVisible,
    updateBookDialogVisible,
    books,
    previewDialogVisible,
  } = useSelector((state: any) => state.homeSlice);
  const [user] = useState<User>(getLocalStorageItem("user")!);

  useEffect(() => {
    dispatch(fetchAllBookData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addBookDialogVisible, updateBookDialogVisible]);

  useEffect(() => {
    return () => {
      dispatch(fetchAllBookData());
    };
  }, [dispatch]);

  return (
    <div className="container-fluid">
      {user.role === Role.AUTHOR && (
        <>
          <div className=" my-4 d-md-flex justify-content-between align-items-center shadow-sm p-2 rounded add-book-section">
            <div>
              <h5 className="primary-text fw-bold">{`Welcome, ${user.firstName}!`}</h5>
              <p className="mb-0 text-secondary font-size fw-semibold">
                Share your new creations with world
              </p>
            </div>
            <div className="mt-md-0 mt-3">
              <button
                className="px-4 ms-sm-0 ms-1 fw-semibold new-book"
                onClick={() => dispatch(setAddBookDialogVisible(true))}
              >
                Add New Book
              </button>
              <button className="ms-sm-2 ms-0 my-sm-0 my-3 border-0 bg-transparent">
                <Link
                  className="collaborators-button px-4 fw-semibold text-decoration-none"
                  role="button"
                  to="/collaborators"
                >
                  Collaborators List
                </Link>
              </button>
            </div>
          </div>
        </>
      )}
      <div>
        <h5 className="pt-4 pb-2 primary-text fw-bold">List of Books</h5>
        <BookTable bookData={books && books} user={user} />
      </div>

      <Modal
        show={addBookDialogVisible}
        onHide={() => {
          dispatch(setAddBookDialogVisible(false));
          dispatch(resetTableOfContentWhole());
          dispatch(setAddBookDialogVisible(false));
        }}
        centered
      >
        <DialogBox
          title={"Add Book"}
          buttonText={"Add"}
          onClose={() => {
            dispatch(setAddBookDialogVisible(false));
            dispatch(resetTableOfContentWhole());
          }}
          isFormVisible={true}
        />
      </Modal>

      <Modal
        show={updateBookDialogVisible}
        onHide={() => {
          dispatch(setUpdateBookDialogVisible(false));
        }}
        centered
      >
        <DialogBox
          title={"Update Book"}
          buttonText={"Update"}
          onClose={() => {
            dispatch(setUpdateBookDialogVisible(false));
            dispatch(resetSelectedBookData());
            dispatch(resetTableOfContentWhole());
            window.history.replaceState(null, "", "/");
          }}
          isFormVisible={true}
        />
      </Modal>

      <Modal
        show={previewDialogVisible}
        onHide={() => {
          dispatch(setUpdateBookDialogVisible(false));
        }}
        centered
      >
        <BookPreview
          onClose={() => {
            dispatch(setPreviewDialog(false));
            dispatch(resetSelectedBookData());
          }}
        />
      </Modal>
    </div>
  );
};

export default Home;
