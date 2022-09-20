<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  const props =defineProps({
    placeholder: {
      type: String,
      required: false
    }
  })

  const emit =defineEmits(["searchSubmit","searchInput"])

  let input =ref<null|HTMLInputElement>(null)
  onMounted(() => {
    if ( !input.value) return
    input.value.value =props.placeholder || ""

  })
  
  function onSubmit(e:Event) {
    e.preventDefault();
    emit("searchSubmit",input?.value?.value || "")
  }
  
  function onInput(e:Event) {
    e.preventDefault();
    emit("searchInput",input?.value?.value || "")
  }

</script>

<template>
  <form
    @submit="onSubmit"
    @input="onInput"
    class="dark:bg-dark-blue bg-white m-2 flex relative items-center w-full max-w-xl px-6 rounded-md text-sm gap-4 dark:text-white text-very-dark-blue-text shadow-lg"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 flex-shrink-0">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
    <input
      ref="input"
      type="text" placeholder="Search for a country..."
      class="bg-transparent outline-none w-full h-12"
    >
  </form>
</template>