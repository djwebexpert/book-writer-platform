import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { getLocalStorageItem } from "../../utils/common";
import { User } from "../../interfaces/user";
import axiosInstance from "../../utils/axios_instance";
import {
  fetchBookData,
  addTableOfContent,
} from "../../redux/features/homeSlice";
import { bookValidationSchema } from "../../schemas";
import { Book, TableOfContent, CSSProperties } from "../../interfaces/books";
import ChapterForm from "../book/chapter-form";
import { DialogBoxProps } from "../../interfaces/dialogBox";
import Input from "../common/Input";

// DialogBox component for adding or updating
const DialogBox: React.FC<DialogBoxProps> = ({
  title,
  buttonText,
  onClose,
  isFormVisible,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedBook, tableOfContent } = useSelector(
    (state: any) => state.homeSlice
  );
  const [user] = useState<User>(getLocalStorageItem("user")!);

  const [initialValues] = useState<Book>({
    bookName: "",
    description: "",
    author: `${user.firstName} ${user.lastName}`,
    price: 0,
    authorId: 0,
    chapter: "",
    pageNumber: 0,
  });

  useEffect(() => {
    const url = window.location.pathname;
    if (!(url === "/")) {
      dispatch(fetchBookData(url));
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedBook) {
      setValues({
        bookName: `${selectedBook ? selectedBook.bookName : ""}`,
        description: `${selectedBook ? selectedBook.description : ""}`,
        author: `${
          selectedBook ? selectedBook.author : user.firstName + user.lastName
        }`,
        price: parseInt(`${selectedBook ? selectedBook.price : 0}`),
        authorId: parseInt(`${selectedBook ? selectedBook.authorId : user.id}`),
        chapter: "",
        pageNumber: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBook]);

  const addChapter = () => {
    if (!values.chapter?.length) {
      setErrors({ chapter: "Chapter name is required !" });
    } else {
      const newChapter = {
        id: uuidv4(),
        title: values.chapter,
        pageNumber: values.pageNumber,
        subChapters: [],
      };
      dispatch(addTableOfContent(newChapter));
      setValues((prevValues) => ({
        ...prevValues,
        chapter: "",
        pageNumber: 0,
      }));
    }
  };

  const renderSubChapterInputs: any = (
    data: TableOfContent[],
    paddingLeft: string = "0"
  ) => {
    let renderedContent: any[] = [];

    data?.forEach((content: TableOfContent, idx: number) => {
      const style: CSSProperties = {
        paddingLeft: paddingLeft,
      };

      renderedContent.push(
        <ChapterForm data={content} idx={idx} style={style} />
      );

      if (content.subChapters?.length) {
        const subChapterContent = renderSubChapterInputs(
          content.subChapters,
          `${15 + parseInt(paddingLeft)}px`
        );
        renderedContent = [...renderedContent, ...subChapterContent];
      }
    });

    return renderedContent;
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    isValid,
    setValues,
    setErrors,
  } = useFormik({
    initialValues,
    validationSchema: bookValidationSchema,
    onSubmit: async (values, action) => {
      if (!tableOfContent.length) {
        action.setErrors({ chapter: "AtLeast once chapter is required" });
      } else {
        switch (buttonText) {
          case "Add":
            const bookData = { ...values, tableOfContent };
            try {
              const response = await axiosInstance.post("/books", bookData);
              if (response.data) {
                toast.success("Book added successfully", {
                  position: "top-center",
                });
                onClose?.();
              }
            } catch (error: any) {
              if (error?.response?.data) {
                toast.error(`failed to add book. - ${error?.response?.data}`, {
                  position: "top-center",
                });
              }
            }
            break;

          case "Update":
            const updateBookData = { ...values, tableOfContent };
            try {
              const response = await axiosInstance.put(
                `/books/${selectedBook.id}`,
                updateBookData
              );
              if (response.data) {
                toast.success("Book updated successfully", {
                  position: "top-center",
                });
                onClose?.();
              }
            } catch (error: any) {
              if (error?.response?.data) {
                toast.error(
                  `failed to update book. - ${error?.response?.data} `,
                  {
                    position: "top-center",
                  }
                );
              }
            }
            break;

          default:
            break;
        }
        action.resetForm();
      }
    },
  });
  return (
    <div className="dialog-box">
      <div className="pb-3 d-flex justify-content-between align-items-center">
        <h2 className="primary-text fw-bold">{title}</h2>
        <button onClick={onClose} className="border-0 bg-transparent">
          <FontAwesomeIcon icon={faClose} className="fs-4 cursor-pointer" />
        </button>
      </div>
      <div>
        {isFormVisible ? (
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="bookName"
              className="form-control mb-3"
              id="bookName"
              label="Book name"
              values={values.bookName}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={
                errors.bookName && touched.bookName ? errors.bookName : ""
              }
            />

            <div className="mb-3">
              <label
                htmlFor="description"
                className="fw-semibold mb-1 form-label"
              >
                Description
              </label>
              <textarea
                name="description"
                className="form-control"
                id="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ resize: "none" }}
                autoComplete="off"
              />
              {errors.description && touched.description && (
                <p className="text-danger mt-1">{errors.description}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="chapter" className="fw-semibold mb-1 form-label">
                Add Chapter
              </label>
              <div className="d-flex">
                <Input
                  type="text"
                  name="chapter"
                  className="form-control w-50"
                  id="chapter"
                  placeholder="Enter chapter name"
                  values={values.chapter ?? ""}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />

                <Input
                  type="number"
                  name="pageNumber"
                  className="form-control w-25 ms-2"
                  id="pageNumber"
                  values={values.pageNumber ?? 0}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />

                <button
                  className="ms-2 preview-button"
                  type="button"
                  onClick={addChapter}
                >
                  Add Chapter
                </button>
              </div>
              {(errors.chapter || touched.chapter) && (
                <p className="text-danger mt-1">{errors.chapter}</p>
              )}
            </div>

            <div style={{ maxHeight: 300 }} className="overflow-auto scroll">
              {renderSubChapterInputs(tableOfContent)}
            </div>

            <Input
              type="number"
              name="price"
              className="form-control mb-3"
              id="price"
              label="Price"
              values={values.price}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors.price && touched.price ? errors.price : ""}
            />

            <div className="dialog-box-footer">
              <button
                className="me-2 close-button"
                onClick={onClose}
                type="button"
              >
                Close
              </button>
              <button
                className="dialog-box-button"
                type="submit"
                disabled={!isValid}
              >
                {buttonText}
              </button>
            </div>
          </form>
        ) : (
          <div className="dialog-box-footer">
            <button
              className="me-2 close-button"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
            <button
              className="dialog-box-button btn btn-primary"
              type="submit"
              disabled={!isValid}
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogBox;
