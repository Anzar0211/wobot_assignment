import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { searchRecipes } from "../lib/api";
import { Recipe } from "../interfaces/RecipeInterface";



function SearchResults() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const data = await searchRecipes(query || "");
        setRecipes(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch search results. Please try again later.");
        console.log(err);
        
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      {recipes.length === 0 ? (
        <p>No recipes found. Try a different search term.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="block">
              <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                  <p className="text-gray-600">
                    {recipe.summary.substring(0, 100)}...
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
