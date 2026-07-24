export const imageBaseUrl = `${process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_API_DEV_URL : process.env.NEXT_PUBLIC_API_BASE_URL}/uploads`;

export const defaultAltText = "High Creation Interior"


// Keep your existing exports
// export const imageBaseUrl = `${process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_API_DEV_URL : process.env.NEXT_PUBLIC_API_BASE_URL}/uploads`;
// export const defaultAltText = "High Creation Interior";

// ADD THIS: Helper to fetch images from your backend folders
export const getBackendImageUrl = (path) => {
    // path example: '/parent-child/wework_bgImage.94f57400.jpg'
    return `${process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_API_DEV_URL : process.env.NEXT_PUBLIC_API_BASE_URL}/uploads${path}`;
};