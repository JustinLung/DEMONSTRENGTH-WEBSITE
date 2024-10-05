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
                    alt
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