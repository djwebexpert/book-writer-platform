// Chapter
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClose,
  faPencil,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import { AppDispatch } from "../../redux/store";
import { setTableOfContentWhole } from "../../redux/features/homeSlice";

import { getLocalStorageItem } from "../../utils/common";
import { User } from "../../interfaces/user";
import {
  ChapterDetail,
  ChapterFormProps,
  TableOfContent,
} from "../../interfaces/books";
import { Role } from "../../constants";
import Input from "../common/Input";

export const ChapterForm: React.FC<ChapterFormProps> = ({
  data,
  idx,
  style,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { tableOfContent } = useSelector((state: any) => state.homeSlice);

  const [show, setShow] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [user] = useState<User>(getLocalStorageItem("user")!);
  const [subChapterInputs, setSubChapterInputs] = useState<ChapterDetail>({
    chapterName: "",
    pageNumber: 0,
  });
  const [editSubChapterInputs, setEditSubChapterInputs] =
    useState<ChapterDetail>({
      chapterName: "",
      pageNumber: 0,
    });

  const handleAdd = () => {
    if (show) {
      setSubChapterInputs({
        chapterName: "",
        pageNumber: 0,
      });
    }
    setShow((prev) => !prev);
  };

  const onEdit = () => {
    setIsEdit((prev) => !prev);
    setEditSubChapterInputs({
      chapterName: data.title,
      pageNumber: data.pageNumber,
    });
  };

  const onChapterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSubChapterInputs((prev) => {
      return { ...prev, chapterName: value };
    });
  };

  const onPageNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const pageNumberValue = parseInt(value, 10);
    setSubChapterInputs((prev) => ({
      ...prev,
      pageNumber: pageNumberValue,
    }));
  };

  const onEditChapterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditSubChapterInputs((prev) => {
      return { ...prev, chapterName: value };
    });
  };

  const onEditPageNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const pageNumberValue = parseInt(value, 10);
    setEditSubChapterInputs((prev) => {
      return { ...prev, pageNumber: pageNumberValue };
    });
  };

  const handleSubChapterData = (
    tableData: TableOfContent[],
    newchapter: TableOfContent
  ): TableOfContent[] => {
    return tableData?.map((chapter: TableOfContent, idx: number) => {
      if (chapter.id === data.id) {
        return {
          ...chapter,
          subChapters: [...chapter.subChapters, newchapter],
        };
      }

      if (chapter.subChapters) {
        const updatedSubChapters = handleSubChapterData(
          chapter.subChapters,
          newchapter
        );
        return {
          ...chapter,
          subChapters: updatedSubChapters,
        };
      }

      return chapter;
    });
  };

  const addChapter = () => {
    const newChapter: TableOfContent = {
      id: uuidv4(),
      title: subChapterInputs.chapterName,
      pageNumber: subChapterInputs.pageNumber,
      subChapters: [],
    };

    const res: TableOfContent[] = handleSubChapterData(
      tableOfContent,
      newChapter
    );

    dispatch(setTableOfContentWhole(res));
    setSubChapterInputs({
      chapterName: "",
      pageNumber: 0,
    });
    setShow(false);
  };

  const handleRemoveChapter = (
    tableData: TableOfContent[]
  ): TableOfContent[] => {
    return (
      tableData.map((chapter: TableOfContent) => {
        if (data.id === chapter.id) {
          return null;
        }

        if (chapter.subChapters) {
          const updatedSubChapters = handleRemoveChapter(chapter.subChapters);
          return {
            ...chapter,
            subChapters: updatedSubChapters,
          };
        }

        return chapter;
      }) as TableOfContent[]
    ).filter((chapter: TableOfContent | null) => chapter !== null);
  };

  const removeChapter = () => {
    const responseData = handleRemoveChapter(tableOfContent);
    dispatch(setTableOfContentWhole(responseData));
  };

  const handleEditChapterData = (
    tableData: TableOfContent[],
    chapterData: any
  ): TableOfContent[] => {
    return tableData?.map((chapter: TableOfContent, idx: number) => {
      if (chapter.id === data.id) {
        return {
          ...chapter,
          ...chapterData,
        };
      }

      if (chapter.subChapters) {
        const updatedSubChapters = handleEditChapterData(
          chapter.subChapters,
          chapterData
        );

        return {
          ...chapter,
          subChapters: updatedSubChapters,
        };
      }

      return chapter;
    });
  };

  const editChapter = () => {
    const editedData = {
      title: editSubChapterInputs.chapterName,
      pageNumber: editSubChapterInputs.pageNumber,
    };

    const res = handleEditChapterData(tableOfContent, editedData);

    dispatch(setTableOfContentWhole(res));
    setEditSubChapterInputs({
      chapterName: "",
      pageNumber: 0,
    });
    setIsEdit(false);
  };

  return (
    <>
      <div className="d-flex justify-content-evenly align-items-center">
        <div className="w-75">
          <div className="my-1 me-2" style={style}>
            <div className="pb-2 nested-section">
              <p className="d-inline me-1 text-dark fw-semibold">{idx + 1}.</p>
              <p className="d-inline text-capitalize text-dark fw-semibold">
                {data?.title}
              </p>
            </div>
          </div>
        </div>
        <div className="w-25">
          <div className="d-flex align-items-center">
            {user.role === Role.AUTHOR && (
              <>
                {show ? (
                  <FontAwesomeIcon
                    icon={faClose}
                    className="fs-6 primary-bg text-light rounded p-2 ms-3 me-2 cursor-pointer"
                    onClick={handleAdd}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="fs-6 primary-bg text-light rounded p-2 ms-3 me-2 cursor-pointer"
                    onClick={handleAdd}
                  />
                )}

                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={removeChapter}
                  className="bg-danger me-2 text-light rounded p-2 fs-6 cursor-pointer"
                />
              </>
            )}

            <FontAwesomeIcon
              icon={isEdit ? faClose : faPencil}
              className="fs-6 secondary-bg text-light cursor-pointer p-2 rounded"
              onClick={onEdit}
            />
          </div>
        </div>
      </div>
      <div className="ms-5 py-1">
        {show && (
          <div className="d-flex align-items-center mt-1">
            <Input
              type="text"
              name="chapter"
              className="form-control w-50"
              id="chapter"
              placeholder="Chapter name"
              values={subChapterInputs.chapterName}
              handleChange={onChapterChange}
            />
            <Input
              type="number"
              name="pageNumber"
              className="form-control w-25 ms-2"
              id="pageNumber"
              placeholder="Page Number"
              values={subChapterInputs.pageNumber}
              handleChange={onPageNumberChange}
            />
            {/* <input
              name="chapter"
              className="form-control w-50"
              type="text"
              id="chapter"
              placeholder="Chapter name"
              onChange={onChapterChange}
              value={subChapterInputs.chapterName}
              autoComplete="off"
            />
            <input
              name="pageNumber"
              className="form-control w-25 ms-2"
              type="number"
              id="pageNumber"
              placeholder="Page Number"
              onChange={onPageNumberChange}
              value={subChapterInputs.pageNumber}
              autoComplete="off"
            /> */}
            <FontAwesomeIcon
              icon={faPlus}
              className="fs-6 primary-bg text-light rounded p-2 ms-3 me-2 cursor-pointer"
              onClick={addChapter}
            />
          </div>
        )}
        {isEdit && (
          <div className="d-flex mt-1">
            <Input
              type="text"
              name="chapter"
              className="form-control w-50"
              id="chapter"
              placeholder="Chapter name"
              values={editSubChapterInputs.chapterName}
              handleChange={onEditChapterChange}
            />
            <Input
              type="number"
              name="pageNumber"
              className="form-control w-25 ms-2"
              id="pageNumber"
              placeholder="Page Number"
              values={editSubChapterInputs.pageNumber}
              handleChange={onEditPageNumberChange}
            />

            <FontAwesomeIcon
              icon={faCheck}
              className="fs-6 me-3 cursor-pointer btn btn-success ms-3"
              onClick={editChapter}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ChapterForm;
