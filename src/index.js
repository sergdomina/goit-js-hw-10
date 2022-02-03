import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fechCountries } from './js/services/fetch-coutries';
import countriesList from './js/templeites/countriesMarkup.hbs'
import oneCountriesMarkup from './js/templeites/onecountryMarkup.hbs'
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchBox=document.querySelector('#search-box')
const ulBox=document.querySelector('.country-list')
const divBox=document.querySelector('.country-info')
searchBox.addEventListener('input',debounce(handlInput,DEBOUNCE_DELAY))
function handlInput(event){

    const userInput=event.target.value.trim()
    if(userInput===''){
        ulBox.innerHTML=''
        divBox.innerHTML=''
        return
    }
    fechCountries(userInput).then(showCountries).catch(showError)
}
function showCountries(countries){
    ulBox.innerHTML=''
    divBox.innerHTML=''
    if(countries.status===404){
        Notify.failure(`please, write valid country name`)
        return
    }
    if(countries.length>10){
        return Notify.success("Too many matches found. Please enter a more specific name.");
    }
    if(countries.length>=2 && countries.length<=10){
        const markUp=countriesList(countries)
        ulBox.insertAdjacentHTML('beforeend',markUp)
        return
    }
    const countryMarkup=oneCountriesMarkup(countries)
    divBox.insertAdjacentHTML('beforeend',countryMarkup)
}
function showError(){
    ulBox.innerHTML=''
    divBox.innerHTML=''
    return Notify.failure("Oops, there is no country with that name");
}