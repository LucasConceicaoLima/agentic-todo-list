import { Alert, Box, Chip, CircularProgress, Container, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createTodo, deleteTodo, listTodos, updateTodo } from './api/todos';
import { TodoForm } from './components/TodoForm';
import { TodoFilters } from './components/TodoFilters';
import { TodoList } from './components/TodoList';
import type { Todo, TodoFilter } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState('');
  const creatingRef = useRef(false);
  const savingRef = useRef(false);

  const loadTodos = async () => {
    setLoading(true);
    setError(null);

    try {
      const items = await listTodos();
      setTodos(items);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const handleCreateTodo = async () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle || creatingRef.current) {
      if (!trimmedTitle) {
        setError('Todo title cannot be empty');
      }
      return;
    }

    creatingRef.current = true;
    setSubmitting(true);
    setError(null);

    try {
      await createTodo({ title: trimmedTitle });
      setTitle('');
      await loadTodos();
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Could not create todo');
    } finally {
      creatingRef.current = false;
      setSubmitting(false);
    }
  };

  const handleToggleTodo = async (id: string, checked: boolean) => {
    setError(null);

    try {
      await updateTodo(id, { completed: checked });
      await loadTodos();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Could not update todo');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    setError(null);

    try {
      await deleteTodo(id);
      await loadTodos();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Could not delete todo');
    }
  };

  const handleEditSave = async (id: string) => {
    const trimmedTitle = draftTitle.trim();

    if (!trimmedTitle || savingRef.current) {
      if (!trimmedTitle) {
        setError('Todo title cannot be empty');
      }
      return;
    }

    savingRef.current = true;

    try {
      await updateTodo(id, { title: trimmedTitle });
      setEditingId(null);
      setDraftTitle('');
      await loadTodos();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Could not update todo title');
    } finally {
      savingRef.current = false;
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2} alignItems="center">
            <Box>
              <Typography variant="h4" component="h1" fontWeight={700}>
                Todo List
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Keep your tasks organized and updated.
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Chip label={`${activeCount} active`} color="primary" variant="outlined" />
              <Chip label={`${completedCount} done`} color="success" variant="outlined" />
            </Stack>
          </Stack>

          <TodoForm value={title} onChange={setTitle} onSubmit={handleCreateTodo} disabled={submitting} />

          <TodoFilters value={filter} onChange={setFilter} />

          {error ? (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          ) : null}

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : (
            <TodoList
              todos={visibleTodos}
              editingId={editingId}
              draftTitle={draftTitle}
              onEditStart={(todo) => {
                setEditingId(todo.id);
                setDraftTitle(todo.title);
              }}
              onEditChange={setDraftTitle}
              onEditSave={handleEditSave}
              onEditCancel={() => {
                setEditingId(null);
                setDraftTitle('');
              }}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          )}
        </Stack>
      </Paper>
    </Container>
  );
}

export default App;
