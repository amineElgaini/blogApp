import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { addPost } from "../../store/postSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

const AddPostForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post = useSelector((state) => state.post);
    const [searchParams, setSearchParams] = useSearchParams({
        title: "",
        img: "",
        author: "",
        description: "",
        categories: "",
    });
    const [title, setTitle] = useState(searchParams.get("title"));
    const [description, setDescription] = useState(
        searchParams.get("description")
    );
    const [img, setImg] = useState(searchParams.get("img"));
    const [author, setAuthor] = useState(searchParams.get("author"));
    const [categories, setCategories] = useState(
        searchParams
            .get("categories")
            .split(",")
            .filter((e) => e !== "")
    );

    const onTitleChanged = (e) => {
        setSearchParams((p) => {
            p.set("title", e.target.value);
            return p;
        });
        setTitle(e.target.value);
    };

    const onImgeChanged = (e) => {
        setSearchParams((p) => {
            p.set("img", e.target.value);
            return p;
        });
        setImg(e.target.value);
    };

    const onAuthorChanged = (e) => {
        setSearchParams((p) => {
            p.set("author", e.target.value);
            return p;
        });
        setAuthor(e.target.value);
    };

    const onContentChanged = (e) => {
        setSearchParams((p) => {
            p.set("description", e.target.value);
            return p;
        });
        setDescription(e.target.value);
    };

    const handleCategory = (e) => {
        const element = e.target;
        let newCategories;
        if (element.checked) {
            newCategories = [...categories, element.value];
        } else {
            newCategories = categories.filter((e) => e !== element.value);
        }
        setSearchParams((p) => {
            p.set("categories", newCategories.join(","));
            return p;
        });
        setCategories(newCategories);
    };

    const onSavePostClicked = () => {
        if (author > 0) {
            dispatch(
                addPost({
                    values: {
                        title,
                        img,
                        userId: parseInt(author),
                        category: categories,
                        description,
                    },
                })
            );
            navigate("/postsDashboard");
        }
    };

    return (
        <section className="mx-auto max-w-2xl">
            <h2 className="text-center text-4xl font-bold mb-10">
                Add a New Post
            </h2>
            <form className="flex flex-col gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="postTitle">Title</Label>
                    <Input
                        id="postTitle"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={onTitleChanged}
                    />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="postImg">Image</Label>
                    <Input
                        id="postImg"
                        type="text"
                        placeholder="Image URL"
                        value={img}
                        onChange={onImgeChanged}
                    />
                </div>

                <div className="grid w-full gap-1.5">
                    <Label htmlFor="author">Author</Label>
                    <Input
                        id="author"
                        placeholder="UserID"
                        defaultValue={author}
                        onChange={(e) => onAuthorChanged(e)}
                    />
                </div>

                <div className="grid w-full gap-1.5">
                    <Label htmlFor="message-2">Category</Label>
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex items-center">
                            <input
                                id="default-checkbox"
                                type="checkbox"
                                value="Front End"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                checked={
                                    categories.includes("Front End")
                                        ? true
                                        : false
                                }
                                onChange={(e) => handleCategory(e)}
                            />
                            <label
                                htmlFor="default-checkbox"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Front End
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="checked-checkbox"
                                type="checkbox"
                                value="Back End"
                                checked={
                                    categories.includes("Back End")
                                        ? true
                                        : false
                                }
                                onChange={(e) => handleCategory(e)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                                htmlFor="checked-checkbox"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Back End
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="checked-checkbox"
                                type="checkbox"
                                value="UI/UX"
                                checked={
                                    categories.includes("UI/UX") ? true : false
                                }
                                onChange={(e) => handleCategory(e)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                                htmlFor="checked-checkbox"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                UI/UX
                            </label>
                        </div>
                    </div>
                </div>

                <div className="grid w-full gap-1.5">
                    <Label htmlFor="message-2">Description</Label>
                    <Textarea
                        placeholder="Type your message here."
                        id="message-2"
                        value={description}
                        onChange={onContentChanged}
                    />
                    <p className="text-sm text-muted-foreground">
                        write a nice description.
                    </p>
                </div>

                <Button type="button" onClick={onSavePostClicked}>
                    Save Post
                </Button>
            </form>
        </section>
    );
};
export default AddPostForm;
