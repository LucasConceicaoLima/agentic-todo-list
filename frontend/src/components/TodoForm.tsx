import { Button, Stack, TextField } from '@mui/material';

interface TodoFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export function TodoForm({ value, onChange, onSubmit, disabled = false }: TodoFormProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} component="form" onSubmit={(event) => {
      event.preventDefault();
      onSubmit();
    }}>
      <TextField
        fullWidth
        label="New todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        inputProps={{ 'aria-label': 'New todo title' }}
      />
      <Button type="submit" variant="contained" disabled={disabled || !value.trim()}>
        Add Todo
      </Button>
    </Stack>
  );
}
