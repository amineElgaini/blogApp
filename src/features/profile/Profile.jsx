import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUserPosts, logout } from "../../store/ProfilSlice";
import PostCard from "@/components/PostCard";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchUserPosts(user.userInfo));
    }, []);

    const handleDeleteUser = () => {
        dispatch(deleteUser(user.userInfo));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <div>Name: {user.userInfo.username}</div>
                <div className="flex gap-2">
                    <Button onClick={handleLogout}>Logout</Button>
                    <Button variant={"destructive"} onClick={handleDeleteUser}>
                        Delete Account
                    </Button>
                </div>
            </div>

            <hr className="my-4" />
            <Link to={"/blogApp/profile/createPost"}>
                <Button>Create Post</Button>
            </Link>

            {user.userPosts.length > 0 ? (
                <div className="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {user.userPosts.map((post) => {
                        return <PostCard key={post.id} post={post} />;
                    })}
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default Profile;
