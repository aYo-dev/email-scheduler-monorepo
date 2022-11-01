import * as request from 'supertest';
import { server } from '../src/app';

jest.useFakeTimers();

describe("GET /", () => {
  it("returns status code 200 when request is send to base endpoint", async () => {
    request(server).get("/")
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeTruthy();
        expect(res.body).toEqual({msg: 'Hello World!'});
      });
  });
});

describe("POST /emails", () => {
	it("returns status code 200", async () => {
    const newEmail = {
      content: 'Lorem ipsum dolor sit amet....',
      receiver: 'jamesbond@dddd.vf',
      schedule: 'test',
    };

    const result =  await request(server)
      .post("/email")
      .send(newEmail);

    expect(result.statusCode).toEqual(200);
  });
});