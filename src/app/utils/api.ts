const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const getApiUrl = (path: string) => {
    // If baseline starts with http, it's an absolute URL
    if (BASE_URL.startsWith("http")) {
        return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
    }
    // Otherwise default to relative path
    return path;
};
