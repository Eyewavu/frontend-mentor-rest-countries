<script setup lang="ts">
  import { type PropType, defineProps, ref, onMounted } from 'vue';
  const props =defineProps({
    name: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String,
      required: true
    },
    info: {
      type: Object as PropType<{[key:string]:string}>,
      required: true
    },
  })

  let infoArray =ref<[string,string][]>([])

  let image_src =ref("")
  let cardRef =ref<HTMLLIElement|null>(null)

  onMounted(() => {
    infoArray.value =Object.entries(props.info)

    if ( !cardRef.value ) return

    const observer =new IntersectionObserver(([entry]) => {
      if ( !entry ) return
      if ( entry.isIntersecting ) {
        observer.unobserve(entry.target)
        image_src.value =props.imgUrl
      }
    })

    observer.observe(cardRef.value)  
  })

  
</script>

<template>
  <li
    class="list-item-card overflow-hidden rounded-md dark:bg-dark-blue bg-white w-72 shadow-lg"
    ref="cardRef"
  >
    <router-link :to="`/country/${name}`">
      <img 
        :data-image="imgUrl"
        :src="image_src"
        :alt="name +' flag'"
        class="h-44 mx-auto"
      >
    </router-link>

    <div class="p-6 dark:text-white text-very-dark-blue-text flex flex-col gap-3">
      <router-link :to="`/country/${name}`">
        <h2 class="text-xl">{{name}}</h2>
      </router-link>

      <ul>
        <li 
          v-for="[caption,description] in infoArray"
          class="flex gap-2"
        >
          <span class="font-semibold">{{caption}}:</span>
          <span>{{description}}</span>
        </li>
      </ul>

    </div>
  </li>
</template>