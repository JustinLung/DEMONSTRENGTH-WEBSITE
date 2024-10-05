export async function client({
    query,
    variables = {}, // Default to an empty object if no variables are provided
    fetch
}: {
    query: string;
    variables?: object;
    fetch: any;
}) {
    try {
        const response = await fetch(import.meta.env.VITE_DATO_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_DATO_KEY}`,
                'Content-Type': 'application/json', // Ensure content type is set
            },
            body: JSON.stringify({ query, variables }),
        });

        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.errors ? JSON.stringify(json.errors) : 'Error fetching data');
        }

        return json.data;
    } catch (error) {
        console.error("Error fetching data from DatoCMS:", error);
        throw error;
    }
}
