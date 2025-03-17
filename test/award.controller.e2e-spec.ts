import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('AwardController (integration)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/awards/intervals')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('min');
    expect(response.body).toHaveProperty('max');

    expect(response.body.min).toBeInstanceOf(Array);
    expect(response.body.min[0]).toMatchObject({
      producer: expect.any(String),
      interval: expect.any(Number),
      previousWin: expect.any(Number),
      followingWin: expect.any(Number),
    });

    expect(response.body.max).toBeInstanceOf(Array);
    expect(response.body.max[0]).toMatchObject({
      producer: expect.any(String),
      interval: expect.any(Number),
      previousWin: expect.any(Number),
      followingWin: expect.any(Number),
    });
  });
});
