// Book preview component
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { BookPreviewProps, TableOfContent } from "../../interfaces/books";

// Function to render the table of contents
const renderTableOfContents = (data: TableOfContent[], marginLeft: string = "0") => {
 let renderedContent: any[] = [];

 data?.forEach((content: TableOfContent) => {
    const style = {
      marginLeft,
    };

    renderedContent.push(
      <div className="pe-3">
        <ul className="d-flex justify-content-between">
          <li style={style} className="fw-semibold text-secondary">
            {content.title}
          </li>
          <p className="fw-semibold text-secondary mb-0">
            {content.pageNumber}
          </p>
        </ul>
      </div>
    );

    if (content.subChapters?.length) {
      const subChapterContent = renderTableOfContents(
        content.subChapters,
        `${15 + parseInt(marginLeft)}px`
      );
      renderedContent = [...renderedContent, ...subChapterContent];
    }
 });
 return renderedContent;
};

const BookPreview: React.FC<BookPreviewProps> = ({ onClose }) => {
 const { selectedBook } = useSelector((state: any) => state.homeSlice);

 return (
    <div className="dialog-box w-25">
      <div className="pb-3 d-flex justify-content-between align-items-center">
        <h2 className="primary-text fw-bold">Book Preview</h2>
        <button onClick={onClose} className="border-0 bg-transparent">
          <FontAwesomeIcon icon={faClose} className="fs-4 cursor-pointer" />
        </button>
      </div>
      <div>
        <table className="preview-details-table">
          <tr>
            <th className="fw-bold text-secondary text-nowrap">Book Name </th>
            <td className="ps-2 text-secondary">{selectedBook?.bookName}</td>
          </tr>
          <tr>
            <th className="fw-bold text-nowrap text-secondary">Author Name</th>
            <td className="ps-2 text-secondary">{selectedBook?.author}</td>
          </tr>
          <tr>
            <th className="fw-bold text-nowrap text-secondary">Book Price</th>
            <td className="ps-2 text-secondary">{`${selectedBook?.price}$ USD`}</td>
          </tr>
          <tr>
            <th className="fw-bold text-nowrap text-secondary d-flex">
              Description
            </th>
            <td className="ps-2 text-secondary">{selectedBook?.description}</td>
          </tr>
        </table>
        <div className="pt-4">
          <div className="">
            <p className="fs-5 fw-semibold text-secondary">Table Of Content</p>
            <div className="page-content">
              {renderTableOfContents(selectedBook?.tableOfContent)}
            </div>
          </div>
        </div>
      </div>
      <div className="dialog-box-footer mt-2">
        <button className="me-2 close-button" onClick={onClose} type="button">
          Close
        </button>
      </div>
    </div>
 );
};

export default BookPreview;
