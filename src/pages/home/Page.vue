<script setup lang="ts">
  import { onMounted, ref, toRaw } from "vue";
  import SearchBar from "./components/SearchBar.vue";
  import Dropdown from "./components/Dropdown.vue";
  import Card from "./components/Card.vue";
  import router from "@/pages/router";
  import { getAllCountries } from "@/fetch"


  type countryCardProps ={
    name:string,
    flagUrl:string,
    info: {
      population:string,
      region:string,
      capital:string
    }
  }
  let allCountries =ref<CountryRestResponse[]>([])
  let countryCardPropsList =ref<countryCardProps[]>([])
  let filteredCardPropsList =ref<countryCardProps[]>([])

  function reduceResponseData(country:CountryRestResponse):countryCardProps {
    const name =country.name.common
    const flagUrl =country.flags.svg
    const population =`${country.population}`
    const region = country.region
    const capital = country.capital?.join(", ") || ""

    return {
      name, flagUrl,
      info: { population, region, capital }
    }
  }



  const searchPlaceholder =`${router.currentRoute.value.query.q || ""}`

  onMounted(async () => {
    allCountries.value =await getAllCountries()

    countryCardPropsList.value =allCountries.value.map(reduceResponseData)
    filteredCardPropsList.value =countryCardPropsList.value

    onSearchInput(searchPlaceholder)
  })


  let selectedRegion =ref<string|null>(null)
  let searchedCountry =ref<string>("")
    
  


  type countryName ={official:string,common:string}
  const compareStrings =(s1:string,s2:string) => s2.toLowerCase().includes(s1.toLowerCase())
  
  function filterCards() {
    const value =searchedCountry.value
    const region =selectedRegion.value
    
    router.push({path:"/",query:{"q":value}})


    filteredCardPropsList.value =allCountries.value.filter(country => {
      if ( region !== null && region !== country.region ) return false

      if ( value.length < 1 ) return true


      if (compareStrings(value,country.name.official)) return true
      if (compareStrings(value,country.name.common)) return true

      if ( country.name.nativeName ) {
        const nameList =Object.values(toRaw(country.name.nativeName)) as countryName[]
        for ( const name of nameList ) {
          if (compareStrings(value,name.official)) return true
          if (compareStrings(value,name.common)) return true
        }
      }

      if ( country.translations ) {
        const nameList =Object.values(toRaw(country.translations)) as countryName[]
        for ( const name of nameList ) {
          if (compareStrings(value,name.official)) return true
          if (compareStrings(value,name.common)) return true
        }
      }

      return false
    })
    .map(reduceResponseData)
  }




  function onSearchInput(input:string) {
    searchedCountry.value =input
    filterCards()
  }

  function onDropdownChange(value:string|null) {
    selectedRegion.value =value
    filterCards()
  }

</script>

<template>
  
  <div class="flex items-center justify-between m-6 flex-wrap md:flex-nowrap">
    <SearchBar 
      @searchInput="onSearchInput"
      :placeholder="searchPlaceholder"
    />
    <Dropdown
      :data="['Africa','Americas','Europe','Oceania','Asia']"
      caption="Filter by Region"
      @onDropdownChange="onDropdownChange"
    />
  </div>

  <ul class="flex flex-wrap gap-8 justify-center">
    <Card
      v-for="{flagUrl,info,name} in filteredCardPropsList"
      :key="name"

      :name="name"
      :imgUrl="flagUrl"
      :info="info"
    />
  </ul>
</template>