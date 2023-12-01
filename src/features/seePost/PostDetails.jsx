import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";

function PostDetails() {
    const params = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_REACT_API_URL}/posts?id=${params.id}`)
            .then((response) => {
                return response.data[0];
            })
            .then((response) => {
                setPost(response);
            });
    }, []);

    const show = (
        <>
            <Link to={"/blogApp/post"}>
                <Button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                    Post Page
                </Button>
            </Link>
            {post ? (
                < div className='m-4'>
                    {post.img ? (
                        <img
                            className="rounded-full mx-auto mb-10"
                            src={`${post.img}`}
                            alt=""
                        />
                    ) : (
                        <img
                            className="rounded-full mx-auto mb-10"
                            src={`https://www.searchenginejournal.com/wp-content/uploads/2020/08/7-ways-a-blog-can-help-your-business-right-now-5f3c06b9eb24e-1280x720.png`}
                            alt=""
                        />
                    )}

                    <h2 className="text-3xl italic font-thin text-center mb-4">
                        {post.title}
                    </h2>
                    <div className="leading-7 text-lg font-mono">
                        {post.description}
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
    return <div>{show}</div>;
}

export default PostDetails;
