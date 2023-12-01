// need validation
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../store/userSlice";

function UpdateUser({ user }) {
    const dispatch = useDispatch();
    const username = useRef(user.username);
    const password = useRef(user.password);
    const img = useRef(user.img);
    const [userIsUpdated, setUserIsUpdated] = useState(false);

    const [error, setError] = useState({});

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

    const handleSubmit = () => {
        const valueUsername = username.current.value.trim();
        const valuePassword = password.current.value.trim();
        const errors = validation(valueUsername, valuePassword);
        if (Object.keys(errors).length === 0) {
            dispatch(
                updateUser({
                    id: user.id,
                    updates: {
                        id: user.id,
                        groupId: user.groupId,
                        img: img.current.value,
                        username: username.current.value,
                        password: password.current.value,
                    },
                })
            );
            setUserIsUpdated(true);
        }
        setError(errors);
    };
    const handleClose = () =>{
        setUserIsUpdated(false);
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="relative cursor-pointer after:content-[''] after:absolute after:inset-0 after:blur-sm after:rounded-lg hover:after:bg-blue-600/50">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="text-blue-600 w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                    </svg>
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update User</DialogTitle>
                    <DialogDescription>
                        Update user{" "}
                        <span className="text-blue-400">[{user.id}]</span> here.
                        Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="username"
                            className="pt-2 self-start text-right"
                        >
                            Username
                        </Label>

                        <div className="col-span-3">
                            <Input
                                id="username"
                                placeholder="Username"
                                defaultValue={user.username}
                                ref={username}
                            />
                            {error.username ? (
                                <small className="text-red-500">
                                    {error.username}
                                </small>
                            ) : (
                                <small className="invisible">placeholder</small>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="img"
                            className="pt-2 self-start text-right"
                        >
                            Image
                        </Label>

                        <div className="col-span-3">
                            <Input
                                id="img"
                                placeholder="Image URL"
                                defaultValue={user.img}
                                ref={img}
                            />
                            <small className="invisible">placeholder</small>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="password"
                            className="pt-2 self-start text-right"
                        >
                            Password
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="password"
                                placeholder="Password"
                                className="col-span-3"
                                defaultValue={user.password}
                                ref={password}
                            />
                            {error.password ? (
                                <small className="text-red-500">
                                    {error.password}
                                </small>
                            ) : (
                                <small className="invisible">placeholder</small>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 flex-wrap-reverse justify-between items-center">

                        {userIsUpdated && (
                            <span className="flex gap-2 text-green-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <p>user Is Updated</p>
                            </span>
                        )}
                        <div className="ms-auto">
                            <DialogClose onClick={handleClose} asChild className='mr-4'>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={userIsUpdated}
                            >
                                Add User
                            </Button>
                        </div>
                    </div>
            </DialogContent>
        </Dialog>
    );
}

export default UpdateUser;
