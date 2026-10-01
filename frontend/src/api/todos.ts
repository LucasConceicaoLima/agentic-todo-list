import type { Todo } from '../types/todo';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Request failed');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function listTodos(): Promise<Todo[]> {
  return request<Todo[]>('/todos');
}

export async function createTodo(input: { title: string }): Promise<Todo> {
  return request<Todo>('/todos', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function updateTodo(
  id: string,
  input: Partial<Pick<Todo, 'title' | 'completed'>>,
): Promise<Todo> {
  return request<Todo>(`/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export async function deleteTodo(id: string): Promise<void> {
  await request<void>(`/todos/${id}`, {
    method: 'DELETE',
  });
}
