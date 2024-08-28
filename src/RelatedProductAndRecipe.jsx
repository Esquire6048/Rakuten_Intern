import ProductList from "./ProductList.jsx";

const RelatedProductAndRecipe = ({ category, keyword }) => {
    if (category === "product") {
        return (
            <div>
                <h2>{keyword}に関連する商品</h2>
                <ProductList keyword={keyword}/>
            </div>
        )
    } else {
        return <div>{category}</div>;
    }
};

export default RelatedProductAndRecipe;