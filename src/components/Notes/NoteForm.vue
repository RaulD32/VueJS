<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">Título</label>
      <input v-model="noteData.title" type="text" id="title" required
        class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
    </div>
    
    <div>
      <label for="category" class="block text-sm font-medium text-gray-700">Categoría</label>
      <select v-model="noteData.cat" id="category" required
        class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
        <option disabled value="">Selecciona una categoría</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
    
    <div>
      <label for="new-category" class="block text-sm font-medium text-gray-700">Nueva Categoría</label>
      <div class="flex gap-2">
        <input v-model="newCategory" type="text" id="new-category"
          class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        <BaseButton type="button" @click="addCategory" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
          Agregar
        </BaseButton>
      </div>
    </div>
    
    <div>
      <label for="content" class="block text-sm font-medium text-gray-700">Contenido</label>
      <textarea v-model="noteData.content" id="content" required rows="4"
        class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
    </div>
    
    <div class="flex justify-end gap-2">
      <BaseButton type="button" @click="$emit('close')" class="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg">
        Cancelar
      </BaseButton>
      <BaseButton type="submit" :disabled="!noteData.title || !noteData.cat"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
        Guardar
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useNoteStore } from '@/stores/note';
import type { Note } from '@/interfaces/INote';
import BaseButton from '@/components/common/BaseButton.vue';

const noteStore = useNoteStore();
const props = defineProps<{ noteToEdit?: Note | null }>();
const emit = defineEmits(['submit', 'close']);

const noteData = ref({
  title: props.noteToEdit?.title || '',
  cat: props.noteToEdit?.cat || '',
  content: props.noteToEdit?.content || ''
});
const newCategory = ref('');
const categories = computed(() => noteStore.categories);

function addCategory() {
  if (newCategory.value.trim() && !categories.value.includes(newCategory.value.trim())) {
    noteStore.addCategory(newCategory.value.trim());
    noteData.value.cat = newCategory.value.trim();
    newCategory.value = '';
  }
}

function submitForm() {
  emit('submit', { ...noteData.value });
}
</script>