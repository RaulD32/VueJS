<template>
    <div
      :class="['bg-gray-800 rounded-2xl border border-gray-600 shadow-md p-4 transition-all duration-200',
               'hover:shadow-lg hover:-translate-y-1 hover:shadow-orange-500/50',
               'focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2',
               className
      ]"
      role="region"
    >
    <slot />
    </div>
    
    </template>
    
    <script setup lang="ts">
    
    interface Props{
      className?: string;
    }
    
    withDefaults(defineProps<Props>(),{
      className:'',
    });
    </script>
    