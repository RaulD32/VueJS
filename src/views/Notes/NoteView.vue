<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 max-w-6xl mx-auto bg-gray-100 shadow-xl rounded-lg">
    
    <aside class="bg-white p-6 rounded-lg shadow-md md:col-span-1 flex flex-col items-center">
      <h1 class="text-3xl font-extrabold text-blue-800 mb-4">📌Bloc de Notas</h1>
      
      <BaseButton @click="openModal" class="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-lg">
        + Nueva nota
      </BaseButton>
      
      <div class="mt-6 w-full">
  <h2 class="text-lg font-semibold text-gray-700 mb-2">🫙 Filtrar por categoría</h2>
  <div class="flex flex-col space-y-2">
    <div v-for="category in noteStore.categories" :key="category" class="flex justify-between items-center">
      <button @click="filterByCategory(category)" 
              class="px-4 py-2 text-left rounded-lg hover:bg-blue-100 capitalize flex-grow"
              :class="{'bg-blue-500 text-white': selectedCategory === category}">
        {{ category }}
      </button>
      <button @click="removeCategory(category)" class="text-red-500 hover:text-red-700 px-2">
        🗑️
      </button>
    </div>
    <button @click="filterByCategory(null)" class="px-4 py-2 text-left rounded-lg hover:bg-blue-100">
      Todas
    </button>
  </div>
</div>

    </aside>
    
    
    <main class="md:col-span-2 space-y-6">
      <div v-if="noteStore.loading" class="text-center py-8">
        <div class="animate-spin inline-block w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p class="text-blue-600 mt-4">Cargando notas...</p>
      </div>
      
      <div v-else>
        <div v-if="totalNotes > 0" class="flex justify-end mb-4">
          <BaseButton @click="clearAll" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
            Eliminar todas 🗑️
          </BaseButton>
        </div>
        
        <div v-for="category in filteredCategories" :key="category" class="bg-white p-4 rounded-lg shadow">
          <div class="flex justify-between items-center border-b pb-1 mb-3">
            <h2 class="text-xl font-semibold text-blue-700 capitalize">
              {{ category }} ({{ getTotalByCategory(category) }})
            </h2>
            <BaseButton @click="deleteCategoryNotes(category)" class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-sm">
              🗑️ Eliminar notas
            </BaseButton>
          </div>
          <div v-if="noteStore.filterNotes(category).length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NoteItem v-for="note in noteStore.filterNotes(category)" :key="note.id" :note="note" @edit="editNote" @delete="deleteNote" />
          </div>
          <div v-else class="text-gray-500 text-center py-4">No hay notas en esta categoría.</div>
        </div>
      </div>
    </main>
    
    
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full">
        <h2 class="text-xl font-bold text-blue-800 text-center">
          {{ noteToEdit ? "Editar Nota" : "Agregar Nota" }}
        </h2>
        <div class="mt-4">
          <NoteForm @submit="handleNoteSubmit" :noteToEdit="noteToEdit" @close="closeModal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useNoteStore } from '@/stores/note';
import type { Note } from '@/interfaces/INote';
import NoteItem from '@/components/Notes/NoteItem.vue';
import NoteForm from '@/components/Notes/NoteForm.vue';
import BaseButton from '@/components/common/BaseButton.vue';

const noteStore = useNoteStore();
const noteToEdit = ref<Note | null>(null);
const isModalOpen = ref(false);
const selectedCategory = ref<string | null>(null);

const totalNotes = computed(() => noteStore.notes.length);
const filteredCategories = computed(() => (selectedCategory.value ? [selectedCategory.value] : noteStore.categories));

function getTotalByCategory(cat: Note['cat']) {
  return noteStore.filterNotes(cat).length;
}

function handleNoteSubmit(noteData: Omit<Note, 'id' | 'createdAt'>) {
  if (noteToEdit.value) {
    noteStore.editNote({ ...noteToEdit.value, ...noteData });
    noteToEdit.value = null;
  } else {
    noteStore.addNote(noteData);
  }
  closeModal();
}

function editNote(note: Note) {
  noteToEdit.value = note;
  openModal();
}

function deleteNote(id: string) {
  noteStore.deleteNote(id);
}

function clearAll() {
  noteStore.deleteAll();
}

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  noteToEdit.value = null;
}

function deleteCategoryNotes(category: string) {
  noteStore.deleteByCategory(category);
}

function removeCategory(category: string) {
  noteStore.deleteCategory(category);
}


function filterByCategory(category: string | null) {
  selectedCategory.value = category;
}
</script>
