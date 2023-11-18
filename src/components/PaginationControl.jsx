function PaginationControl({ pagination, setPagination, PaginationInterval }) {
    const handlePagination = (v) => {
        if (v === 1) {
            setPagination((p) => p + 1);
        } else {
            setPagination((p) => p - 1);
        }
    };
    return (
        <div className="flex gap-2">
            <button
                className="border-2 p-1 cursor-pointer"
                onClick={() => handlePagination(-1)}
                disabled={pagination == PaginationInterval[0]}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 ${
                        pagination == PaginationInterval[0] ? "opacity-40" : ""
                    }`}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
            </button>{" "}
            <button
                className="border-2 p-1 cursor-pointer"
                onClick={() => handlePagination(1)}
                disabled={pagination == PaginationInterval[1]}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 ${
                        pagination == PaginationInterval[1] ? "opacity-40" : ""
                    }`}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                </svg>
            </button>
        </div>
    );
}

export default PaginationControl;
