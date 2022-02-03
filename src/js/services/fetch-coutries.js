export function fechCountries(name){
    const url= `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
    return fetch(url).then(respons=>{
        
        if(!respons.ok){
            throw Error(respons.statusText)
        }
        return respons.json()
    })
}