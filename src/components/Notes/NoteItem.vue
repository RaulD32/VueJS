<template>
    <div 
        class="flex items-center justify-between p-4 rounded-lg border border-blue-300 shadow-sm hover:shadow-md hover:shadow-blue-500/50 transition-shadow"
    >
        <div class="flex-1">
            <h3 class="text-lg font-semibold text-blue-700">{{ note.title }}</h3>
            <p class="text-gray-900 text-sm">{{ note.content }}</p>
            <div class="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <span class="px-2 py-1 rounded-full text-xs font-semibold text-white bg-blue-600 capitalize">
                    {{ note.cat }}
                </span>
                <time v-if="formattedDate" :datetime="formattedDate">
                    {{ formattedDate }}
                </time>
                <span v-else class="text-red-500 text-xs">Fecha inválida</span>
            </div>
        </div>
        <div class="flex gap-2">
            <button 
                @click="$emit('edit', note)" 
                class="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                aria-label="Editar nota"
            >
                ✏️ Editar
            </button>
            <button 
                @click="$emit('delete', note.id)" 
                class="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                aria-label="Eliminar nota"
            >
                🗑️ Eliminar
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Note } from '@/interfaces/INotes';

const props = defineProps<{ note: Note }>();

defineEmits<{
    (e: 'edit', note: Note): void;
    (e: 'delete', id: string): void;
}>();

const formattedDate = computed(() => {
    if (!props.note.createdAt) return null;
    const date = new Date(props.note.createdAt);
    if (isNaN(date.getTime())) return null; // Verifica si la fecha es válida
    return new Intl.DateTimeFormat('es-ES', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(date);
});
</script>
