import ProductList from "./ProductList.jsx";
import RecipeList from "./RecipeList.jsx";

const RelatedProductAndRecipe = ({ category, keyword }) => {
    if (category === "product") {
        return (
            <div>
                <h2>{keyword}に関連する商品</h2>
                <ProductList productKeyword={keyword}/>
            </div>
        )
    } else if (category === "recipe") {
        return (<div>
            <h2>{keyword}に関連するレシピ</h2>
            <RecipeList recipeKeyword={keyword}/>
        </div>)
    } else {
        /* empty */
    }
};

export default RelatedProductAndRecipe;