export async function getAllCountries() {
  const cache =window.localStorage.getItem("countries")
  let json =[] as CountryRestResponse[]
  
  if ( cache !== null ) {
    json =JSON.parse(cache)

  }
  else {
    const response =await fetch("https://restcountries.com/v3.1/all")
    if ( !response.ok ) return []
    
    json =await response.json() as CountryRestResponse[]

  }

  window.localStorage.setItem("countries", JSON.stringify(json))
  return json.sort((a,b) => a.name.common.localeCompare(b.name.common))
}