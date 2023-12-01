import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/ProfilSlice";
import { Link, Navigate, useLocation } from "react-router-dom";
function Login() {
    const dispatch = useDispatch();
    const username = useRef("");
    const password = useRef("");
    let location = useLocation();

    const auth = useSelector((state) => state.auth);

    if (auth.userInfo?.id) {
        return <Navigate to={"/blogApp/profile"} replace={true} />;
    }

    const submitForm = () => {
        const payload = {
            username: username.current.value.trim(),
            password: password.current.value.trim(),
        };
        dispatch(fetchUser(payload));
    };

    return (
        <>
            <h2 className="text-3xl text-center mb-4">Login</h2>
            <form onSubmit={(e) => e.preventDefault}>
                <div className="flex flex-col items-center gap-6">
                    {location?.state?.login && (
                        <div
                            className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50"
                            role="alert"
                        >
                            <svg
                                className="flex-shrink-0 inline w-4 h-4 me-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-medium">
                                    Success SignIN, Know Log In
                                </span>
                            </div>
                        </div>
                    )}
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="username">UserName</Label>
                        <Input
                            ref={username}
                            type="text"
                            id="username"
                            placeholder="Username"
                            autoFocus
                        />
                        <small className="invisible ">placeholder</small>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            ref={password}
                            type="text"
                            id="password"
                            placeholder="Password"
                        />
                        <small className="invisible ">placeholder</small>
                    </div>

                    <div className="grid w-full max-w-sm">
                        <button
                            type="submit"
                            onClick={submitForm}
                            className="ms-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Submit
                        </button>
                    </div>

                    <Link
                        to={"/blogApp/signIn"}
                        className="text-blue-500 border-b-2 border-blue-500"
                    >
                        SignIn
                    </Link>
                    <span className="text-red-500 text-bold font-bold text-xl">
                        {auth.error}
                    </span>
                </div>
            </form>
        </>
    );
}

export default Login;
