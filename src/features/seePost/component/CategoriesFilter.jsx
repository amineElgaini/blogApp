function Categories({ category, setCategory }) {
    const availableCategories = ["Back End", "Front End", "UI/UX"];
    return (
        <div className="flex gap-4 p-2 border-b-2">
            {availableCategories.map((e) => (
                <span
                    key={e}
                    onClick={() => {
                        if (category.includes(e)) {
                            const newCategory = category.filter(
                                (element) => element !== e
                            );
                            setCategory(newCategory);
                        } else {
                            setCategory((p) => {
                                return [...p, e];
                            }); 
                        }
                    }}
                    className={`duration-1000 whitespace-nowrap select-none cursor-pointer bg-slate-100/10 p-1 rounded ${
                        category.includes(e) ? "border-2 border-sky-500" : "border-2 border-transparent"
                    }`}
                >
                    {e}
                </span>
            ))}
        </div>
    );
}

export default Categories;
