const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getRecipes() {
    const res = await fetch(`${BASE_URL}/random?apiKey=${API_KEY}&number=9`)
    if (!res.ok) {
        throw new Error("Failed to fetch recipes")
    }
    const data = await res.json()
    return data.recipes
    }

    export async function getRecipeDetails(id: string) {
    const res = await fetch(`${BASE_URL}/${id}/information?apiKey=${API_KEY}`)
    if (!res.ok) {
        throw new Error("Failed to fetch recipe details")
    }
    return res.json()
    }

    export async function searchRecipes(query: string) {
    const res = await fetch(
        `${BASE_URL}/complexSearch?apiKey=${API_KEY}&query=${encodeURIComponent(query)}&number=9&addRecipeInformation=true`,
    )
    if (!res.ok) {
        throw new Error("Failed to search recipes")
    }
    const data = await res.json()
    return data.results
}

