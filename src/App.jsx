import { ThemeProvider } from "@/components/theme-provider";
import { Route, Routes, Navigate } from "react-router";
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
import { useSelector } from "react-redux";
import Author from "@/features/author/Author";
import Post from "./features/seePost/ViewPost";
import Navbar from "./components/Navbar";
import CreatePost from "./features/profile/CreatePost";
import EditPost from "./features/profile/EditPost";

function App() {
    const user = useSelector((state) => state.auth);
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="App min-h-screen">
                <Navbar />
                <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="*" element={'page not found'} />
                    <Route element={<Layout />}>
                        <Route path="author/:id" element={<Author />} />

                        <Route path="profile">
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
                            path="login"
                            element={
                                <Auth groupId={[-1]}>
                                    <Login />
                                </Auth>
                            }
                        />
                        <Route
                            path="signIn"
                            element={
                                <Auth groupId={[-1]}>
                                    <SignIn />
                                </Auth>
                            }
                        />
                        <Route
                            path="usersDashboard"
                            element={
                                <Auth groupId={[1]}>
                                    <UsersDashboard />
                                </Auth>
                            }
                        />

                        <Route path="postsDashboard">
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
                        <Route path="post">
                            <Route index element={<Post />} />
                            <Route path="read/:id" element={<PostDetails />} />
                        </Route>
                    </Route>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;