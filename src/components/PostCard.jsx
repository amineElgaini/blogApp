import { Badge } from "@/components/ui/badge";
import TimeAgo from "../features/post/component/TimeAgo";
import { Link } from "react-router-dom";

function PostCard({ post }) {
    return (
        <>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="w-100">
                    <img
                        className="rounded-t-lg w-100"
                        src={
                            post.img
                                ? post.img
                                : "https://www.searchenginejournal.com/wp-content/uploads/2020/08/7-ways-a-blog-can-help-your-business-right-now-5f3c06b9eb24e-1280x720.png"
                        }
                        alt=""
                    />
                </div>
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {post.title ? (
                            post.title
                        ) : (
                            <span className="text-slate-300">___</span>
                        )}
                        <small className="dark:text-slate-300 text-slate-500 text-sm">
                            {" "}
                            . <TimeAgo timestamp={post.time} />
                        </small>
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {post.description
                            ? post.description.slice(0, 100) + "..."
                            : "___"}
                    </p>
                    <div className="flex gap-2 justify-center my-4">
                        {post.category.map((cat) => {
                            return <Badge key={cat}>{cat}</Badge>;
                        })}
                    </div>
                    <div className="flex gap-4 justify-between">
                        <Link
                            to={`/blogApp/post/read/${post.id}`}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Read more
                            <svg
                                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </Link>
                        <Link
                            to={`/blogApp/profile/editPost/${post.id}`}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Edit
                            <svg
                                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostCard;
