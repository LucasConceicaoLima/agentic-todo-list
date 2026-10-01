import { Box, Divider, List, Typography } from '@mui/material';
import type { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  editingId: string | null;
  draftTitle: string;
  onEditStart: (todo: Todo) => void;
  onEditChange: (value: string) => void;
  onEditSave: (id: string) => void;
  onEditCancel: () => void;
  onToggle: (id: string, checked: boolean) => void;
  onDelete: (id: string) => void;
}

export function TodoList({
  todos,
  editingId,
  draftTitle,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  onToggle,
  onDelete,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">No todos in this view.</Typography>
      </Box>
    );
  }

  return (
    <List disablePadding>
      {todos.map((todo, index) => (
        <Box key={todo.id}>
          <TodoItem
            todo={todo}
            isEditing={editingId === todo.id}
            draftTitle={editingId === todo.id ? draftTitle : todo.title}
            onEditStart={() => onEditStart(todo)}
            onEditChange={onEditChange}
            onEditSave={() => onEditSave(todo.id)}
            onEditCancel={onEditCancel}
            onToggle={(checked) => onToggle(todo.id, checked)}
            onDelete={() => onDelete(todo.id)}
          />
          {index < todos.length - 1 ? <Divider /> : null}
        </Box>
      ))}
    </List>
  );
}
