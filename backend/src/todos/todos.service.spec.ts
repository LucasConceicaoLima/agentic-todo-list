import { NotFoundException } from '@nestjs/common';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(() => {
    service = new TodosService();
  });

  it('creates a todo with default values', () => {
    const created = service.create({ title: 'Study AGENTS.md' });

    expect(created).toMatchObject({
      title: 'Study AGENTS.md',
      completed: false,
    });
    expect(created.id).toBeDefined();
    expect(created.createdAt).toBeDefined();
    expect(created.updatedAt).toBeDefined();
  });

  it('updates an existing todo', () => {
    const created = service.create({ title: 'Read README' });
    const updated = service.update(created.id, { title: 'Read AGENTS.md', completed: true });

    expect(updated).toMatchObject({
      id: created.id,
      title: 'Read AGENTS.md',
      completed: true,
    });
  });

  it('keeps the current title when only completed is toggled', () => {
    const created = service.create({ title: 'Keep this title' });
    const updated = service.update(created.id, { completed: true });

    expect(updated).toMatchObject({
      id: created.id,
      title: 'Keep this title',
      completed: true,
    });
  });

  it('throws when deleting or updating an unknown id', () => {
    expect(() => service.update('missing-id', { title: 'New title' })).toThrow(NotFoundException);
    expect(() => service.remove('missing-id')).toThrow(NotFoundException);
  });
});
