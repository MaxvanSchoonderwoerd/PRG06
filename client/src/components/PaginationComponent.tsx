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
      <Link className="paginationLink" to={`/${props.first}`} onClick={() => props.loadPosts()}>
        &lt;&lt;&lt;
      </Link>
      <Link className="paginationLink" to={`/${props.previous}`} onClick={() => props.loadPosts()}>
        &lt;
      </Link>
      <Link className="paginationLink" to={`/${props.next}`} onClick={() => props.loadPosts()}>
        &gt;
      </Link>
      <Link className="paginationLink" to={`/${props.last}`} onClick={() => props.loadPosts()}>
        &gt;&gt;&gt;
      </Link>
      <p className="paginationLink">
        page: {props.currentPage}/{props.totalPages}
      </p>
      <p className="paginationLink">
        showing {props.currentItems}/{props.totalItems} posts
      </p>
    </div>
  );
}
