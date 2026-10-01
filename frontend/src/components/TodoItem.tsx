import { Delete, Edit, Save, Close } from '@mui/icons-material';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  draftTitle: string;
  onEditStart: () => void;
  onEditChange: (value: string) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onToggle: (checked: boolean) => void;
  onDelete: () => void;
}

export function TodoItem({
  todo,
  isEditing,
  draftTitle,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton aria-label={`Edit ${todo.title}`} onClick={isEditing ? onEditSave : onEditStart}>
            {isEditing ? <Save /> : <Edit />}
          </IconButton>
          <IconButton aria-label={`Delete ${todo.title}`} onClick={onDelete} color="error">
            <Delete />
          </IconButton>
        </Stack>
      }
    >
      <ListItemButton dense disableRipple sx={{ py: 1.5 }}>
        <Checkbox
          checked={todo.completed}
          onChange={(event) => onToggle(event.target.checked)}
          inputProps={{ 'aria-label': `Mark ${todo.title} complete` }}
        />

        {isEditing ? (
          <Stack component="form" direction="row" spacing={1} onSubmit={(event) => {
            event.preventDefault();
            onEditSave();
          }} sx={{ flex: 1, ml: 1 }}>
            <TextField
              fullWidth
              size="small"
              value={draftTitle}
              onChange={(event) => onEditChange(event.target.value)}
              inputProps={{ 'aria-label': `Edit title for ${todo.title}` }}
            />
            <IconButton aria-label="Cancel edit" onClick={onEditCancel}>
              <Close />
            </IconButton>
          </Stack>
        ) : (
          <ListItemText
            primary={
              <Typography
                component="span"
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'text.disabled' : 'text.primary',
                }}
              >
                {todo.title}
              </Typography>
            }
            secondary={
              <Typography variant="caption" color="text.secondary">
                {todo.completed ? 'Completed' : 'Active'}
              </Typography>
            }
          />
        )}
      </ListItemButton>
    </ListItem>
  );
}
