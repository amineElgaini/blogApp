import { useParams } from "react-router-dom";

function Author() {
    const params = useParams();
    return "Author: " + params.id;
}

export default Author;
