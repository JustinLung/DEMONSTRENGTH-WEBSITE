import { client } from "$lib/vendors/client";

export async function load() {
    const query = `
    query MyQuery {
        homepage {
            hero {
                title
                description
            }
        about {
            title
            description
            aboutImage {
                url
                title
                alt
            }
        }
        reviewTitle
        review {
            name
            review
        }
        coachTitle
        coach {
            title
            tiktok
            instagram
            description
            image {
                url
                title
                alt
            }
        }
        highlightTitle
        highlights {
            tag
            media {
                url
                video {
                    thumbnailUrl
                    mp4Url
                }
                url
                alt
                mimeType
            }
        }
    }
}
    `;
    const data = await client({ query, fetch: fetch });
    return {
        data
    }
}