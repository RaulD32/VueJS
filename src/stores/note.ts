import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Note } from '@/interfaces/INotes';

export const useNoteStore = defineStore('note', () => {
  const notes = ref<Note[]>(JSON.parse(localStorage.getItem('notes') || '[]'));
  const categories = ref<string[]>(JSON.parse(localStorage.getItem('categories') || '["trabajo", "personal", "urgente"]'));
  const loading = ref(false);

  function addNote(note: Omit<Note, 'id' | 'createdAt'>) {
    const newNote: Note = {
      ...note,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    notes.value.push(newNote);
  }

  function editNote(updatedNote: Note) {
    const index = notes.value.findIndex((x) => x.id === updatedNote.id);
    if (index !== -1) {
      notes.value[index] = updatedNote;
    }
  }

  function deleteNote(id: string) {
    notes.value = notes.value.filter((x) => x.id !== id);
  }

  function deleteAll() {
    notes.value = [];
  }

  function filterNotes(category: Note['cat']) {
    return notes.value.filter((x) => x.cat === category);
  }

  function sortNotes(order: 'asc' | 'desc' = 'desc') {
    notes.value.sort((a, b) => {
      return order === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  function addCategory(newCategory: string) {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory && !categories.value.includes(trimmedCategory)) {
      categories.value.push(trimmedCategory);
    }
  }

  watch(notes, (newNotes) => {
    localStorage.setItem('notes', JSON.stringify(newNotes));
  }, { deep: true });

  watch(categories, (newCategories) => {
    localStorage.setItem('categories', JSON.stringify(newCategories));
  }, { deep: true });

  return {
    notes,
    categories,
    loading,
    addNote,
    editNote,
    deleteNote,
    deleteAll,
    filterNotes,
    sortNotes,
    addCategory
  };
});
