import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { deleteUser } from "../../../store/userSlice";
import EditUser from "./EditUser";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

function UserTable() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    return (
        <>
            <Table className="mx-auto">
                <TableCaption>Table Of Users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">UserId</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Password</TableHead>
                        <TableHead>GroupId</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {user.users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium text-blue-500 flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage
                                        src={`https://picsum.photos/200/300?random=${user.id}`}
                                    />
                                    <AvatarFallback>
                                        {user.username.slice(0,2)}
                                    </AvatarFallback>
                                </Avatar>
                                {user.id}
                            </TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.password}</TableCell>
                            <TableCell>{user.groupId}</TableCell>
                            <TableCell className="flex gap-2">
                                <span
                                    onClick={() =>
                                        dispatch(deleteUser({ id: user.id }))
                                    }
                                    className="relative cursor-pointer after:content-[''] after:absolute after:inset-0 after:blur-sm after:rounded-lg hover:after:bg-red-600/50"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="text-red-600 w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                    </svg>
                                </span>

                                <span>|</span>
                                <EditUser user={user} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default UserTable;
