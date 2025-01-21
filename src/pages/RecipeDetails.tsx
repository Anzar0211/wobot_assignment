import{ useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipeDetails } from "../lib/api";
import { Recipe } from "../interfaces/RecipeInterface";



function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (!id) {
        setError("Recipe ID is missing.");
        setLoading(false);
        return;
      }
      try {
        const data = await getRecipeDetails(id);
        setRecipe(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch recipe details. Please try again later.");
        console.log(err);
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!recipe) return null;

  return (
    <div>
      <Link to="/" className="text-green-600 hover:underline mb-4 inline-block">
        &larr; Back to Recipes
      </Link>
      <h1 className="text-3xl font-bold mb-6">{recipe.title}</h1>
      <img
        src={recipe.image || "/placeholder.svg"}
        alt={recipe.title}
        className="w-full max-w-2xl mb-6 rounded-lg shadow-lg"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc pl-5">
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ol className="list-decimal pl-5">
            {recipe.analyzedInstructions[0]?.steps.map((step) => (
              <li key={step.number} className="mb-2">
                {step.step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
