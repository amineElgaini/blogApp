import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Categories from "./component/CategoriesFilter";
import SearchBox from "@/components/SearchBox";
import { Input } from "@/components/ui/input";
import { fetchPosts } from "../../store/postViewSlice";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

import TimeAgo from "../post/component/TimeAgo";
import { Link } from "react-router-dom";
import PaginationControl from "../../components/PaginationControl";

function Post() {
    const post = useSelector((state) => state.postView);
    const dispatch = useDispatch();
    const [category, setCategory] = useState(
        post.search.category?.split(",") ?? []
    );
    const [searchByTitle, setSearchByTitle] = useState(post.search.title ?? "");

    const [pagination, setPagination] = useState(post.currentPagination);
    const PaginationInterval = post.pagination;
    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        const searchByTitleValue =
            searchByTitle === "" ? undefined : searchByTitle;

        const searchCategoryValue =
            category.join(",") === "" ? undefined : category.join(",");

        if (!firstRender || post.posts.length === 0) {
            dispatch(
                fetchPosts({
                    pagination,
                    title: searchByTitleValue,
                    category: searchCategoryValue,
                })
            );
        }
        if (firstRender) {
            setFirstRender(false);
        }
    }, [pagination, searchByTitle, category]);

    return (
        <>
            <div className="flex flex-wrap gap-10 justify-between items-center mb-10">

                <Input
                    id="search"
                    type="text"
                    placeholder="Search"
                    className="max-w-[200px]"
                    value={searchByTitle}
                    onChange={(e) => setSearchByTitle(e.target.value)}
                />

                <Categories category={category} setCategory={setCategory} />
            </div>
            <div className="flex gap-2 items-center mb-4 justify-end">
                <span>
                    {post.currentPagination}/{post.pagination[1]}
                </span>
                <PaginationControl
                    pagination={pagination}
                    setPagination={setPagination}
                    PaginationInterval={PaginationInterval}
                />
            </div>

            {post.loading === true ? "loading..." : ""}

            {post.posts.length > 0 ? (
                <div className="flex justify-center items-center flex-wrap gap-4">
                    {post.posts.map((post) => (
                        <Link key={post.id} to={`/post/read/${post.id}`}>
                            <div className="max-w-[400px] bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                                <img
                                    className="w-full sm:w-[220px] h-[270px] w-fdull rounded-lg sm:rounded-none sm:rounded-l-lg"
                                    src={
                                        post.img
                                            ? post.img
                                            : `https://picsum.photos/200/200?random=${post.id}`
                                    }
                                    alt="img"
                                />
                                <div className="p-5">
                                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {post.title}
                                    </h3>
                                    <span className="text-gray-500 dark:text-gray-400">
                                        {<TimeAgo timestamp={post.time} />}
                                    </span>
                                    <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                                        {post.description.slice(0, 100)}...
                                    </p>
                                    <ul className="flex flex-wrap gap-2">
                                        {post.category !== "" &&
                                            post.category
                                                .split(",")
                                                .map((e) => (
                                                    <Badge
                                                        key={e}
                                                        className="whitespace-nowrap"
                                                    >
                                                        {e}
                                                    </Badge>
                                                ))}
                                    </ul>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default Post;
