export function getPaginationFromHeader(header) {
    /* 
    this function send the first page and last page.
    */
    if (header === "" || header === undefined) {
        return [1, 1];
    }
    const linkHeader = header?.split("_page=");
    return [linkHeader[1][0], linkHeader[linkHeader.length - 1][0]];
}
