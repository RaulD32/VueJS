<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-1">
          <label for="title" class="block text-sm font-medium text-blue-900">
              Título <span class="text-red-500">*</span>
          </label>
          <input
          id="title"
          v-model="form.title"
          type="text"
          required
          placeholder="Ingresa el título de la nota"
          class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 placeholder-gray-400 transition-all"
          />
      </div>
  
      <div class="space-y-1">
        <label for="description" class="block text-sm font-medium text-blue-900">
          Descripción
        </label>
        <textarea
          id="description"
          v-model="form.description"
          rows="3"
          placeholder="Añade una descripción"
          class="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-400 placeholder-gray-400 transition-all"
        ></textarea>
      </div>
  
      <div class="space-y-1">
          <label for="cat" class="block text-sm font-medium text-blue-900">Categoría</label>
          <select
          id="cat"
          v-model="form.cat"
          class="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all"
          >
          <option value="trabajo">Trabajo</option>
          <option value="personal">Personal</option>
          <option value="urgente">Urgente</option>
          </select>
      </div>
  
      <div class="flex justify-center gap-3">
          <BaseButton type="button" variant="secondary"  @click="$emit('close')" class="bg-gray-700 text-gray-300 hover:bg-gray-600">
          Cancelar
          </BaseButton>
          <BaseButton type="submit" variant="primary" class="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isModalCompleted">
                  {{ notetoEdit ? 'Actualizar' : 'Guardar' }}
          </BaseButton>
      </div>
  </form>
</template>

<script lang="ts" setup>
import type { Note } from '@/interfaces/INotes';
import BaseButton from '../common/BaseButton.vue';
import { computed, reactive } from 'vue';

const isModalCompleted = computed(() =>{
return form.title.trim() !== '' && form.cat.trim() !== '';
});

const props = defineProps<{
noteToEdit?: Note | null
}>();

const emit = defineEmits<{
  (e: 'submit', note: Omit<Note, 'id' | 'createdAt'>): void;
}>();

const initialForm ={
title: props.noteToEdit?.title || '',
description: props.noteToEdit?.description || '',
cat: props.noteToEdit?.cat || 'personal'
}

const form = reactive({ ...initialForm })

const handleSubmit = () => {
emit('submit', {
  ...form,
})
resetForm()
}

const resetForm = () => {
Object.assign(form, initialForm)
}
</script>
