export interface Note{
    id: string
    title: string
    description: string
    cat: 'trabajo' | 'personal' | 'urgente'
    createdAt: Date
  }
  