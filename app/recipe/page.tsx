import IngredientList from "@/components/ingredient/IngredientList";
import RecipeList from "@/components/recipe/RecipeList";

const RecipePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RecipeList />
    </main>
  );
};
export default RecipePage;
