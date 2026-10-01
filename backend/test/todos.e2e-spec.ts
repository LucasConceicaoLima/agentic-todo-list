import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Todos API', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /todos returns an array', async () => {
    const response = await request(app.getHttpServer()).get('/todos');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /todos creates a todo', async () => {
    const response = await request(app.getHttpServer())
      .post('/todos')
      .send({ title: 'Study AGENTS.md' });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      title: 'Study AGENTS.md',
      completed: false,
    });
    expect(response.body.id).toBeDefined();
  });

  it('PATCH /todos/:id updates title and completed state', async () => {
    const createdResponse = await request(app.getHttpServer())
      .post('/todos')
      .send({ title: 'Read README' });

    const response = await request(app.getHttpServer())
      .patch(`/todos/${createdResponse.body.id}`)
      .send({ title: 'Read AGENTS.md', completed: true });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: createdResponse.body.id,
      title: 'Read AGENTS.md',
      completed: true,
    });
  });

  it('DELETE /todos/:id removes a todo', async () => {
    const createdResponse = await request(app.getHttpServer())
      .post('/todos')
      .send({ title: 'Delete this todo' });

    const deleteResponse = await request(app.getHttpServer()).delete(
      `/todos/${createdResponse.body.id}`,
    );

    expect(deleteResponse.status).toBe(204);

    const fetchResponse = await request(app.getHttpServer()).get('/todos');
    expect(fetchResponse.body.some((todo: { id: string }) => todo.id === createdResponse.body.id)).toBe(false);
  });

  it('rejects empty titles', async () => {
    const response = await request(app.getHttpServer()).post('/todos').send({ title: '   ' });

    expect(response.status).toBe(400);
  });

  it('returns 404 for unknown todo ids', async () => {
    const patchResponse = await request(app.getHttpServer())
      .patch('/todos/does-not-exist')
      .send({ title: 'Updated title' });

    const deleteResponse = await request(app.getHttpServer()).delete('/todos/does-not-exist');

    expect(patchResponse.status).toBe(404);
    expect(deleteResponse.status).toBe(404);
  });
});
