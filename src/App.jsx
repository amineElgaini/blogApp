import { Route, Routes } from "react-router";
import UsersDashboard from "./features/user/UserDashboard";
import PostView from "@/features/post/PostDashboard";
import AddPostForm from "@/features/post/AddPost";
import Layout from "@/components/Layout";
import EditPostForm from "@/features/post/EditPost";
import PostDetails from "@/features/seePost/PostDetails";
import Home from "@/features/home/Home";
import Profile from "@/features/profile/Profile";
import Login from "@/features/login/Login";
import SignIn from "./features/login/SignIn";
import Auth from "@/auth/Auth";
import Author from "@/features/author/Author";
import Post from "./features/seePost/ViewPost";
import Navbar from "./components/Navbar";
import CreatePost from "./features/profile/CreatePost";
import EditPost from "./features/profile/EditPost";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/ProfilSlice";

function App() {
    const dispatch = useDispatch();
    let user = localStorage.getItem("user");
    if (user) {
        user = JSON.parse(user);
        dispatch(
            fetchUser({
                username: user.username,
                password: user.password,
            })
        );
    }
    return (
        <div className="App min-h-screen">
            <Navbar />
            <Routes>
                <Route path="blogApp/home" element={<Home />} />
                <Route path="*" element={<Home />} />
                <Route element={<Layout />}>
                    <Route path="blogApp/author/:id" element={<Author />} />

                    <Route path="blogApp/profile">
                        <Route
                            index
                            element={
                                <Auth groupId={[0, 1]}>
                                    <Profile />
                                </Auth>
                            }
                        />
                        <Route
                            path={"createPost"}
                            element={
                                <Auth groupId={[0, 1]}>
                                    <CreatePost />
                                </Auth>
                            }
                        />
                        <Route
                            path={"editPost/:id"}
                            element={
                                <Auth groupId={[0, 1]}>
                                    <EditPost />
                                </Auth>
                            }
                        />
                    </Route>

                    <Route
                        path="blogApp/login"
                        element={
                            <Auth groupId={[-1]}>
                                <Login />
                            </Auth>
                        }
                    />
                    <Route
                        path="blogApp/signIn"
                        element={
                            <Auth groupId={[-1]}>
                                <SignIn />
                            </Auth>
                        }
                    />
                    <Route
                        path="blogApp/usersDashboard"
                        element={
                            <Auth groupId={[1]}>
                                <UsersDashboard />
                            </Auth>
                        }
                    />

                    <Route path="blogApp/postsDashboard">
                        <Route
                            index
                            element={
                                <Auth groupId={[1]}>
                                    <PostView />
                                </Auth>
                            }
                        />
                        <Route
                            path="add"
                            element={
                                <Auth groupId={[1]}>
                                    <AddPostForm />
                                </Auth>
                            }
                        />
                        <Route
                            path="edit/:id"
                            element={
                                <Auth groupId={[1]}>
                                    <EditPostForm />
                                </Auth>
                            }
                        />
                    </Route>
                    <Route path="blogApp/post">
                        <Route index element={<Post />} />
                        <Route path="read/:id" element={<PostDetails />} />
                    </Route>
                </Route>
                <Route path="*" element={"err page not found"} />
            </Routes>
        </div>
    );
}

export default App;
