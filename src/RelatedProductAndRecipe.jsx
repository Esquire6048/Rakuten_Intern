import ProductList from "./ProductList.jsx";
import RecipeList from "./RecipeList.jsx";

const RelatedProductAndRecipe = ({ category, relatedKeyword }) => {
    if (category === "product") {
        return (
            <div>
                <h2 className="products-relatedto-rakuten">{relatedKeyword}をお探しですか？</h2>
                <ProductList productKeyword={relatedKeyword}/>
            </div>
        )
    } else if (category === "recipe") {
        return (<div>
            <h2 className="products-relatedto-rakuten">賞味期限が近い備蓄食料をおいしく調理</h2>
            <RecipeList recipeID={relatedKeyword}/>
        </div>)
    } else {
        /* empty */
    }
};

export default RelatedProductAndRecipe;