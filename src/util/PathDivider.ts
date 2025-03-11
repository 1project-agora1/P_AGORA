export const pathDivided = (pathname: string) => {
    const segments = pathname.split("/");
    const result: { [key: string]: string } = {};
    segments.forEach((segment, index) => {
        result[`item${index + 1}`] = segment;
    });
    return result;
};
