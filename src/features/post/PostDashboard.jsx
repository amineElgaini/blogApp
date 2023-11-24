import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import TableRender from "@/components/table-render";

import PostTable from "./component/PostTable";
import { useEffect, useState } from "react";

import PaginationControl from "../../components/PaginationControl";
import { fetchPosts } from "@/store/postSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

function PostView() {
    const post = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const [searchByPostId, setSearchByPostId] = useState(
        post.search.postId ?? ""
    );
    const [searchByUserId, setSearchByUserId] = useState(
        post.search.userId ?? ""
    );
    const [pagination, setPagination] = useState(post.currentPagination);
    const PaginationInterval = post.pagination;
    const [firstRender, setFirstRender] = useState(true);

    // stop fetching if store is full
    useEffect(() => {
        const searchByPostIdValue =
            searchByPostId === "" ? undefined : searchByPostId;

        const searchByUserIdValue =
            searchByUserId === "" ? undefined : searchByUserId;

        if (!firstRender || post.posts.length === 0) {
            dispatch(
                fetchPosts({
                    pagination,
                    searchByPostIdValue,
                    searchByUserIdValue,
                })
            );
        }
        if (firstRender) {
            setFirstRender(false);
        }
    }, [pagination, searchByPostId, searchByUserId]);

    return (
        <>
            <main>
                <div className="flex gap-2 items-center justify-between">
                    <Link to={"/blogApp/postsDashboard/add"}>
                        <Button>Create Post</Button>
                    </Link>
                </div>

                {/* Show Error Table */}
                {!post.loading && post.error ? (
                    <div>Error: {post.error}</div>
                ) : null}

                <hr className="my-4" />
                <div className="flex justify-between items-end my-4">
                    <div className="flex relative gap-2">
                        <div>
                            <Label>PostId:</Label>
                            <Input
                                id="searchId"
                                type="text"
                                placeholder="PostId"
                                className="max-w-[100px]"
                                value={searchByPostId}
                                onChange={(e) => {
                                    setPagination(1);
                                    setSearchByPostId(e.target.value.trim());
                                }}
                            />
                        </div>
                        <div>
                            <Label>UserId:</Label>
                            <Input
                                id="searchId"
                                type="text"
                                placeholder="UserId"
                                className="max-w-[100px]"
                                value={searchByUserId}
                                onChange={(e) => {
                                    setPagination(1);
                                    setSearchByUserId(e.target.value.trim());
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 items-center">
                        <span>
                            {post.currentPagination}/{post.pagination[1]}
                        </span>
                        <PaginationControl
                            pagination={pagination}
                            setPagination={setPagination}
                            PaginationInterval={PaginationInterval}
                        />
                    </div>
                </div>

                {/* Show Render Table */}
                {post.loading && <TableRender />}

                {post.posts.length > 0 ? <PostTable /> : <h2 className="mt-10 text-gray-400 text-2xl text-center">No Post Is Found</h2>}
            </main>
        </>
    );
}

export default PostView;
