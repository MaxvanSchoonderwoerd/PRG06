import { Link, useParams } from "react-router-dom";

export type TPaginationParams = {
  start: string | undefined;
  limit: string | undefined;
};

type TPaginationProps = {
  first: string;
  previous: string;
  next: string;
  last: string;

  currentPage: string;
  totalPages: string;
  currentItems: string;
  totalItems: string;

  loadPosts: Function;
};

export default function PaginationComponent(props: TPaginationProps) {
  return (
    <div className="pagination">
      <Link className="btn first" to={`/${props.first}`} onClick={() => props.loadPosts()}>
        &lt;&lt;&lt;
      </Link>
      <Link className="btn previous" to={`/${props.previous}`} onClick={() => props.loadPosts()}>
        &lt;
      </Link>
      <Link className="btn next" to={`/${props.next}`} onClick={() => props.loadPosts()}>
        &gt;
      </Link>
      <Link className="btn last" to={`/${props.last}`} onClick={() => props.loadPosts()}>
        &gt;&gt;&gt;
      </Link>
      <div className="paginationInfoContainer">
        <p className="paginationInfo">
          Page: {props.currentPage}/{props.totalPages}
        </p>
        <p className="paginationInfo">
          Showing {props.currentItems} out of {props.totalItems} posts
        </p>
      </div>
    </div>
  );
}
