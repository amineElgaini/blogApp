import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { addUser } from "@/store/userSlice";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

function SignIn() {
    const navigate = useNavigate();
    const username = useRef("");
    const password = useRef("");
    const [error, setError] = useState({});

    const [userIsExist, setUserIsExist] = useState(false);

    const validation = (username, password) => {
        let errors = {};
        if (username.length < 4) {
            errors.username = "Username Should Be Greater Than 4 Caracters";
        }
        if (password.length < 4) {
            errors.password = "Password Should Be Greater Than 4 Caracters";
        }
        return errors;
    };

    const submitForm = () => {
        const valueUsername = username.current.value.trim();
        const valuePassword = password.current.value.trim();
        const errors = validation(valueUsername, valuePassword);
        if (Object.keys(errors).length === 0) {
            axios
                .get(`${import.meta.env.VITE_REACT_API_URL}/users`, {
                    params: {
                        username: valueUsername,
                    },
                })
                .then((response) => {
                    if (response.data.length === 0) {
                        dispatch(
                            addUser({
                                username: valueUsername,
                                password: valuePassword,
                                groupId: 0,
                            })
                        );
                        setUserIsExist(false);
                        navigate("/blogApp/login", { state: { login: true } });
                    } else {
                        setUserIsExist(true);
                    }
                });
        }
        setError(errors);
    };
    const dispatch = useDispatch();
    return (
        <>
            <h2 className="text-3xl text-center mb-4">Sign In</h2>

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col items-center gap-6">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="username">UserName</Label>
                        <Input
                            ref={username}
                            type="text"
                            id="username"
                            placeholder="Username"
                            autoFocus
                        />
                        {error.username ? (
                            <small className="text-red-500">
                                {error.username}
                            </small>
                        ) : (
                            <small className="invisible ">placeholder</small>
                        )}
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            ref={password}
                            type="text"
                            id="password"
                            placeholder="Password"
                        />
                        {error.password ? (
                            <small className="text-red-500">
                                {error.password}
                            </small>
                        ) : (
                            <small className="invisible ">placeholder</small>
                        )}
                    </div>

                    {userIsExist ? (
                        <div className="text-red-500 text-center">
                            User Is Already Exist
                        </div>
                    ) : (
                        ""
                    )}

                    <div className="grid w-full max-w-sm">
                        <Button
                            className="ms-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            onClick={submitForm}
                        >
                            Submit
                        </Button>
                    </div>
                    <Link
                        to={"/blogApp/login"}
                        className="text-blue-500 border-b-2 border-blue-500"
                    >
                        Login
                    </Link>
                </div>
            </form>
        </>
    );
}

export default SignIn;
