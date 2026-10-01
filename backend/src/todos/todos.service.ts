import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class TodosService {
  private readonly todos: Todo[] = [];

  findAll(): Todo[] {
    return [...this.todos];
  }

  create(createTodoDto: CreateTodoDto): Todo {
    const now = new Date().toISOString();
    const todo: Todo = {
      id: randomUUID(),
      title: createTodoDto.title,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    this.todos.push(todo);
    return todo;
  }

  update(id: string, updateTodoDto: UpdateTodoDto): Todo {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      throw new NotFoundException(`Todo with id "${id}" not found`);
    }

    const currentTodo = this.todos[todoIndex];
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(updateTodoDto).filter(([, value]) => value !== undefined),
    ) as Partial<UpdateTodoDto>;

    const updatedTodo: Todo = {
      ...currentTodo,
      ...fieldsToUpdate,
      updatedAt: new Date().toISOString(),
    };

    this.todos[todoIndex] = updatedTodo;
    return updatedTodo;
  }

  remove(id: string): void {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      throw new NotFoundException(`Todo with id "${id}" not found`);
    }

    this.todos.splice(todoIndex, 1);
  }
}
