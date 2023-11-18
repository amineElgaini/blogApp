import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { updatePost } from "../../store/postSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditPostForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const [post, setPost] = useState({});

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [img, setImg] = useState("");
    const [categories, setCategories] = useState([]);

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onImgChanged = (e) => setImg(e.target.value);
    const onContentChanged = (e) => setDescription(e.target.value);

    const handleCategory = (e) => {
        const element = e.target;
        let newCategories;
        if (element.checked) {
            newCategories = [...categories, element.value];
        } else {
            newCategories = categories.filter((e) => e !== element.value);
        }
        setCategories(newCategories);
    };

    const onSavePostClicked = () => {
        if (author > 0) {
            dispatch(
                updatePost({
                    id: post.id,
                    updates: {
                        title,
                        img,
                        description,
                        userId: parseInt(author),
                        category: categories,
                    },
                })
            );
            navigate("/postsDashboard");
        }
    };

    useEffect(() => {
        axios
            .get(`https://blogappserver-bna3.onrender.com/posts?id=${params.id}`)
            .then((response) => {
                return response.data[0];
            })
            .then((response) => {
                setTitle(response.title);
                setDescription(response.description);
                setAuthor(response.userId);
                setImg(response.img);
                setCategories(response.category === '' ? [] : response.category.split(','));
                setPost(response);
            });
    }, []);

    return (
        <section className="mx-auto max-w-2xl">
            <Link className="fixed opacity-90" to={'/postsDashboard'}><Button>Posts Dashboard</Button></Link>
            <h2 className="text-center text-4xl font-bold mb-10">
                Edit Post <span className="text-blue-500">[{post.id}]</span>
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
                        onChange={onImgChanged}
                    />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="author">Author</Label>
                    <Input
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>

                <div className="grid w-full gap-1.5">
                    <Label htmlFor="category">Category</Label>
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex items-center">
                            <input
                                checked={categories.includes("Front End")}
                                id="default-checkbox"
                                type="checkbox"
                                value="Front End"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                                checked={categories.includes("Back End")}
                                id="checked-checkbox"
                                type="checkbox"
                                value="Back End"
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
                                checked={categories.includes("UI/UX")}
                                id="checked-checkbox"
                                type="checkbox"
                                value="UI/UX"
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
export default EditPostForm;
