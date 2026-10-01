import { Button, Stack } from '@mui/material';
import type { TodoFilter } from '../types/todo';

interface TodoFiltersProps {
  value: TodoFilter;
  onChange: (value: TodoFilter) => void;
}

const filters: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function TodoFilters({ value, onChange }: TodoFiltersProps) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={value === filter.value ? 'contained' : 'outlined'}
          size="small"
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </Stack>
  );
}
