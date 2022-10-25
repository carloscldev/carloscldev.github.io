
const countriesEl = document.getElementById('countries');
const filterBtn = document.getElementById('filter');
const continentsFilters = filterBtn.querySelectorAll('li');
const searchEl = document.getElementById('search');
const card = document.getElementById('card');
const goBack = document.getElementById('goback');

getCountries();
async function getCountries() {
    const res = await fetch('https://restcountries.com/v3.1/all')
    const countries = await res.json();


    displayCountries(countries);

    console.log(countries);
}

function displayCountries(countries) {
    countries.forEach(country => {
        const countryEl = document.createElement('div');
        countryEl.classList.add('country');

        countryEl.innerHTML = `
            <div>
            <img src="${country.flags.svg}" alt="Flag" />
            </div>
            <div class="country-body">
                <h3 class="country-name">${country.name.common}</h2>
                <p><strong>Population: </strong>${country.population}</p>
                <p class="country-continents"><strong>Region: </strong>${country.continents}</p>
                <p><strong>Capital: </strong>${country.capital}</p>
            </div>
        `;

        countryEl.addEventListener('click', () => {
            card.style.display = 'flex';
            countryDetails(country);
        });

        countriesEl.appendChild(countryEl);
    });
}


function countryDetails(country) {
    const cardBody = card.querySelector('.card-body');


    cardBody.innerHTML = `
             <div class="row">
             <img class="flag" src="${country.flags.svg}" alt="Flag" />
            
              <div class="column">
              <h2 class="country-name">${country.name.common}</h2>
              <p><strong>Official Name: </strong>${country.name.official}</p>
              <p><strong>Population: </strong>${country.population}</p>
                <p><strong>Region: </strong>${country.region}</p>
                <p><strong>Sub Region: </strong>${country.subregion}</p>
                <p><strong>Capital: </strong>${country.capital}</p>
                <p><strong>Languages: </strong>${Object.values(country.languages).join(', ')}</p>
                <p><strong>Currencies: </strong>${Object.values(country.currencies).map(({ name }) => name).join(', ')}</p>
                   
            <p><strong>Borders: </strong>${country.borders}</p>
            </div>
            </div >

           

    `;


}



// show and hide the filter by region //
filterBtn.addEventListener('click', () => {
    filterBtn.classList.toggle('open');
});

// Go Back to first interface //
goBack.addEventListener('click', () => {
    card.style.display = 'none';
});


searchEl.addEventListener('input', e => {
    const { value } = e.target;
    const countryName = document.querySelectorAll('.country-name');

    countryName.forEach(name => {
        console.log(name.innerText);
        if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
            name.parentElement.parentElement.style.display = 'block';

        } else {
            name.parentElement.parentElement.style.display = 'none';
        }
    });
});

// add a filter inside the dropdown //
continentsFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const value = filter.innerText;
        const countryContinents = document.querySelectorAll('.country-continents');

        countryContinents.forEach(continents => {

            if (continents.innerText.includes(value) || value === 'All') {
                continents.parentElement.parentElement.style.display = 'block';
            } else {
                continents.parentElement.parentElement.style.display = 'none';

            }
        });

    });
});