import React, { useEffect, useState } from 'react';
// import "./RecipeList.css";


const RecipeResult = ({ item }) => {
    return (
        <a href={item.recipeUrl} target="_blank" rel="noopener noreferrer" className="recipe-link">
            <div className="recipe">
                <img
                    src={item.foodImageUrl}
                    alt={item.recipeTitle}
                    className="recipe-image"
                />
                <div className="recipe-info">
                    <p className="recipe-title">
                        {item.recipeTitle}
                    </p>
                    <p className="recipe-description">
                        {item.recipeDescription}
                    </p>
                </div>
            </div>
        </a>
    );
};

const RecipeList = ({ recipeKeyword }) => {
    const [recipeData, setRecipeData] = useState(null);

    useEffect(() => {
        if (recipeKeyword) {
            const apiUrl = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?format=json&categoryId=${recipeKeyword}&applicationId=1077188838370490177`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => setRecipeData(data))
                .catch(error => console.error('Error fetching the recipe data:', error));
        }
    }, [recipeKeyword]);

    if (!recipeData) {
        return <div>Loading...</div>;
    }

    console.log(recipeData)

    return (
        <div className="recipe-result">
            <RecipeResult item={recipeData.result[1]} />
        </div>
    );
};

export default RecipeList;