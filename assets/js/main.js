const API_KEY = 'c904e0c3de7845eeb472fe22f6a92cff';
const API = 'https://api.spoonacular.com/recipes/complexSearch';


function createCard(data) {

    // Create card elements first

    const colDiv = document.createElement('div');
    const aTag = document.createElement('a');
    const cardDiv = document.createElement('div');
    const image = document.createElement('img');
    const cardBodyDiv = document.createElement('div');
    const cardTitleDiv = document.createElement('div');
    const strongTag = document.createElement('strong');
    const cardTextDiv = document.createElement('div');
    const pTag = document.createElement('p');

    // Add the description of the recipe to the card body
    pTag.innerHTML = data.summary.substring(1, 60) + '...';
    // Append the p tag to the parent tag that is the card text div
    cardTextDiv.appendChild(pTag);
    // Add the bootstrap classes to the cardTextDiv
    cardTextDiv.classList.add('card-text');

    strongTag.innerText = data.title;
    cardTitleDiv.appendChild(strongTag);
    cardTitleDiv.classList.add('card-title');

    cardBodyDiv.appendChild(cardTitleDiv);
    cardBodyDiv.appendChild(cardTextDiv);
    cardBodyDiv.classList.add('card-body');

    image.src = data.image;
    image.classList.add('card-image-top');
    image.alt = data.title;

    cardDiv.appendChild(image);
    cardDiv.appendChild(cardBodyDiv);
    cardDiv.classList.add('card');

    aTag.href = '/html/food-details.html?id=' + data.id;
    aTag.classList.add('text-decoration-none');
    aTag.classList.add('text-reset');
    aTag.appendChild(cardDiv);


    colDiv.appendChild(aTag);
    colDiv.classList.add('col-md-3');
    colDiv.classList.add('col-sm-6');
    colDiv.classList.add('mt-3');

    console.log('In the card items');

    return colDiv;
}

function setPageTitle() {
    const label = get('cuisine');
    const pageTitle = document.getElementById('page_title');
    pageTitle.innerText = label + ' Recipes';
}


function showRecipes(data) {
    const rowElement = document.getElementById('recipes');
    console.log('Data in the ');
    if (rowElement) {
        for (d of data) {
            const card = createCard(d);
            rowElement.appendChild(card);
        }
    }

    console.log('After the card Items: ');
}

/**
 * Get the value of the request parameter whose name is passed as parameter to the function
 * @param name, name of the parameter 
 * @returns value of the request parameter
 */
function get(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}


function getData() {
    let cuisine = get('cuisine');

    fetch(`${API}?apiKey=${API_KEY}&cuisine=${cuisine}&number=12&addRecipeInformation=true&fillIngredients=true`)
        .then((response) => response.json())
        .then((data) => {
            console.log('The data is: ', data);
            showRecipes(data.results);
        });
}


getData();
setPageTitle();