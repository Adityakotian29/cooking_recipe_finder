document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.button');
    const input = document.querySelector('input[type="text"]');
    const resultDiv = document.querySelector('.jaipur');

    button.addEventListener('click', function() {
        const query = input.value;
        if (query) {
            fetchRecipes(query);
        }
    });

    async function fetchRecipes(query) {
        const appId = '6e96f0c2';
        const appKey = '7502f0d058e4084f4666ea6aa744c2f7';
        const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            displayRecipes(data.hits);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    }

    function displayRecipes(recipes) {
        resultDiv.innerHTML = ''; 
        recipes.forEach(hit => {
            const recipe = hit.recipe;
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');

            const recipeContent = `
                <h2>${recipe.label}</h2>
                <img src="${recipe.image}" alt="${recipe.label}">
                <p><strong>Source:</strong> <a href="${recipe.url}" target="_blank">${recipe.source}</a></p>
                <p><strong>Calories:</strong> ${recipe.calories.toFixed(2)}</p>
            `;

            recipeElement.innerHTML = recipeContent;
            resultDiv.appendChild(recipeElement);
        });
    }
});

  