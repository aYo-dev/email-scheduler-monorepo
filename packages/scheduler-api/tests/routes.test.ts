import { pathOr, pickAll } from 'ramda';
import request from 'supertest';
import { server } from '../src/app';

jest.useRealTimers();

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
	it("returns status code 200 if data is correct", async () => {
    const newEmail = {
      receiver: "ayovheff@gmail.com",
      content: "hello, hello",
      sendingType: "now",
    };

    const result =  await request(server)
      .post("/email")
      .send(newEmail);

    const data = pathOr({}, ['body', 'data'], result); 
    const emailData =  pickAll(['content', 'receiver', 'sendingType'], data);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toBeDefined();
    expect(emailData).toEqual(newEmail);
  });

  it("returns status code 400 if email is incorrect", async () => {
    const newEmail = {
      content: 'Lorem ipsum dolor sit amet....',
      receiver: 'jamesbond',
      sendingType: 'now',
    };

    const result =  await request(server)
      .post("/email")
      .send(newEmail);

    const data = pathOr([], ['body', 'data'], result); 

    expect(result.statusCode).toEqual(400);
    expect(result.body).toBeDefined();
  });

  it("returns status code 400 if any required field missing", async () => {
    const newEmail = {
      receiver: 'jamesbond',
      content: 'test',
    };

    const result =  await request(server)
      .post("/email")
      .send(newEmail);

    const data = pathOr([], ['body', 'data'], result); 

    expect(result.statusCode).toEqual(400);
    expect(result.body).toBeDefined();
    expect(data.length).toEqual(2);
  });
});