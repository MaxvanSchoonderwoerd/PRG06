import { Page } from "../App";

type PaginationProps = {
  page: Page<any> | null;
  onPageChange: (page: number) => void;
};

export default function PaginationComponent({
  page,
  onPageChange,
}: PaginationProps) {
  if (!page) return null;

  return (
    <div className="pagination">
      {/* First page */}
      <button
        className="btn first"
        disabled={page.first}
        onClick={() => onPageChange(0)}
      >
        &lt;&lt;&lt;
      </button>

      {/* Previous page */}
      <button
        className="btn previous"
        disabled={page.first}
        onClick={() => onPageChange(page.number - 1)}
      >
        &lt;
      </button>

      {/* Next page */}
      <button
        className="btn next"
        disabled={page.last}
        onClick={() => onPageChange(page.number + 1)}
      >
        &gt;
      </button>

      {/* Last page */}
      <button
        className="btn last"
        disabled={page.last}
        onClick={() => onPageChange(page.totalPages - 1)}
      >
        &gt;&gt;&gt;
      </button>

      <div className="paginationInfoContainer">
        <p className="paginationInfo">
          Page {page.number + 1} of {page.totalPages}
        </p>
        <p className="paginationInfo">
          Showing {page.content.length} of {page.totalElements} posts
        </p>
      </div>
    </div>
  );
}
