<script setup lang="ts">
  import { onMounted, onUnmounted, ref, type PropType } from 'vue';

  const emit =defineEmits(["onDropdownChange"])

  defineProps({
    data: {
      type: Array as PropType<string[]>,
      default: () => [],
      required: true
    },
    caption: {
      type: String,
      required: true
    }
  })

  let closed =ref(true)
  let selected =ref<null|string>(null)
  let divWrapper =ref<null|HTMLDivElement>(null)

  onMounted(() => document.addEventListener("click",closeDropdown))
  onUnmounted(() => document.removeEventListener("click",closeDropdown))

  function closeDropdown(e:Event,depth =4) {
    let el =e.target as HTMLElement
    const nodes =[]
    for ( let i =0; i < depth; i++ ) {
      const isSameNode =divWrapper.value?.isSameNode(el)
      nodes.push(isSameNode)
      
      if ( el.parentElement ) el =el.parentElement
    }

    if ( nodes.some(e => e)) return
    
    closed.value =true
  }


  function onDropdownClick() {
    closed.value = !closed.value
  }


  function onDropdownChange(input:string|null) {
    selected.value =input
    emit("onDropdownChange",selected.value)
    closed.value =true
  }

</script>

<template>
  <div class="m-2" ref="divWrapper">
    <div
      @click="onDropdownClick"
      class="px-6 py-4 dark:bg-dark-blue bg-white dark:text-white w-64 rounded-md flex justify-between items-center select-none cursor-pointer shadow-lg"
    >
      <p>{{selected || caption}}</p>
      <svg
        class="w-3 h-3 transition-transform"
        :class="!closed && 'rotate-90'"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>

    </div>
    <TransitionGroup
      tag="ul"
      name="list"
      class="dark:bg-dark-blue bg-white dark:text-white text-very-dark-blue-text rounded-md absolute shadow-md mt-1 overflow-hidden"
    >
      <li
        class="select-none py-2 px-4 w-64 transition-all duration-300 cursor-pointer"
        @click="e => onDropdownChange(null)"
        v-if="!closed"
      >-</li>
      <li
        class="select-none py-2 px-4 w-64 transition-all duration-300 cursor-pointer"
        @click="e => onDropdownChange(item)"
        v-for="(item,index) in data" :key="index"
        v-if="!closed"
        :style="`--delay: ${(index +1) *50}ms`"
      >
        {{item}}
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
  .list-enter-active,
  .list-leave-active {
    transition: all 0.2s;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
    transition-delay: var(--delay);
  }
</style>