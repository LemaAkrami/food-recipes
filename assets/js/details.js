const API_KEY = 'c904e0c3de7845eeb472fe22f6a92cff';
const API = 'https://api.spoonacular.com/recipes';


/**
 * Get the value of the request parameter whose name is passed as parameter to the function
 * @param name, name of the parameter 
 * @returns value of the request parameter
 */
 function get(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

function prepareRecipeDetails(data) {
    const recipeImage = document.getElementById('recipe_image');
    const recipeIngredients = document.getElementById('recipe_ingredients');
    const recipeTitle = document.getElementById('recipe_title');
    const recipeSummary = document.getElementById('recipe_summary');
    const recipeSourceUrl = document.getElementById('recipe_source_url');

    recipeImage.src = data.image;
    recipeTitle.innerText = data.title;
    recipeSummary.innerHTML = data.summary;
    recipeSourceUrl.href = data.sourceUrl;
    recipeSourceUrl.innerText = 'Visit this link for more details';
    

    for(ingredient of data.extendedIngredients) {
        const badge = createIngredient(ingredient.original);
        recipeIngredients.appendChild(badge);
    }
}

function createIngredient(label) {
    const span = document.createElement('span');
    span.classList.add('badge');
    span.classList.add('bg-success');
    span.classList.add('opacity-50');
    span.classList.add('my-1');
    span.classList.add('d-table');
    span.innerText = label;

    return span;
}

function getData() {
    let id = get('id');

    fetch(`${API}/${id}/information?apiKey=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
            console.log('The data is: ', data);
            prepareRecipeDetails(data);
        });
}

getData();