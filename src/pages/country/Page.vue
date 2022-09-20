<script setup lang="ts">
  import Button from '@/components/Button.vue';
  import { onMounted, ref, toRaw, watch } from 'vue';
  import { getAllCountries } from "@/fetch"
  import { useRoute } from "vue-router"


  type pageData ={
    name: string,
    img:string,
    columns: [string,string][][],
    neighbors: string[]
  }

  let allCountries =ref<CountryRestResponse[]>([])
  let country = ref<CountryRestResponse|null>(null)
  let data =ref<pageData|null>(null)

  const route =useRoute()
  watch(route,route => initialize(route.params.name || null))
  
  onMounted(initialize)
  async function initialize(countryName =route.params.name || null) {
    if ( !countryName ) return

    allCountries.value =await getAllCountries()
    country.value =allCountries.value.filter(c => c.name.common === countryName )[0]
    data.value =prepareData(country.value)
  }


  function prepareData(input:CountryRestResponse):pageData {
    const left:[string,string][] =[
      ["Native Name",Object.values(input.name?.nativeName || {})[0]?.official || ""],
      ["Population",input.population.toLocaleString()],
      ["Region",input.region],
      ["Sub Region",input?.subregion || ""],
      ["Capital",input?.capital?.join(", ") || ""]
    ]

    const right:[string,string][] =[
      ["Top Level Domain",input?.tld?.join(", ") || ""],
      ["Currencies",Object.values(input?.currencies || {})?.map(c => c.name).join(", ") || ""],
      ["Languages",Object.values(input?.languages || {}).join(", ") || ""]
    ]

    const neighbors =input.borders?.map(bor => {
      const [ country ] =allCountries.value.filter(c => c.cca3 === bor)
      return country.name.common || bor
    }) || []

    return {
      name: input.name.common,
      img:input.flags.svg,
      columns: [left, right],
      neighbors
    }
  }

</script>

<template>
  <div class="mx-10">

    <router-link to="/">
      <Button class="my-12 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
        Back
      </Button>
    </router-link>

    <div class="dark:text-white text-very-dark-blue-text md:flex">
      <div class="max-w-md">
        <img
          class="w-full relative"
          :src="data?.img" :alt="data?.name"
        >
      </div>

      <div class="md:mx-8">
        <h1 class="text-3xl my-4">{{data?.name}}</h1>

        <div class="flex md:flex-row flex-col gap-8">
          <ul
            class="flex flex-col"
            v-for="column in data?.columns"
          >
            <li
              v-for="[title,caption] in column"
            >
              <span class="font-bold">{{title}}: </span>
              <span>{{caption}}</span>
            </li>
          </ul>
        </div>
        
        <div class="flex gap-3 mt-10">
          <span>Border Countries: </span>
          <ul class="flex gap-2 flex-wrap">
            <li
              v-for="name in data?.neighbors"
            >
              <router-link :to="`/country/${name}`">
                <Button>{{name}}</Button>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
  
</style>