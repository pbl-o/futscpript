import request from "supertest";
import app from "../index.js";

const adminName = process.env.ADM_USERNAME;
const adminPassword = process.env.ADM_PASSWORD;

describe("Tests de request payload y stauts code", () => {
  it("TEST:1 Se obtiene un Array y un status code 200 como respuesta de la ruta GET /equipos", async () => {
    //Check token

    const { body: loginBody } = await request(app)
      .post(`/login`)
      .send({ name: adminName, password: adminPassword });

    const token = loginBody.token;

    const { body: equipos, statusCode } = await request(app)
      .get("/equipos")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(statusCode).toBe(200);
    expect(equipos).toBeInstanceOf(Array);
  });
  it("TEST 2: Al enviar las credenciales correctas en la ruta POST /login se obtiene un Object", async () => {
    const credenciales = { name: adminName, password: adminPassword };
    const { body: acceso } = await request(app)
      .post("/login")
      .send(credenciales);

    expect(acceso).toBeInstanceOf(Object);
  });

  it("TEST 3: Al enviar credenciales incorrectas en la ruta POST /login se obtiene un status code 400", async () => {
    const credenciales = { name: "Waldo", password: "My name is Waldo" };
    const { body: acceso, statusCode } = await request(app)
      .post("/login")
      .send(credenciales);

    expect(statusCode).toBe(400);
  });

  it("TEST 4: Al enviar un nuevo jugador en la ruta POST /equipos/:teamID/jugadores junto a un token válido en las cabeceras se obtiene un status code 201.", async () => {
    //Check token

    const { body: loginBody } = await request(app)
      .post(`/login`)
      .send({ name: adminName, password: adminPassword });

    const token = loginBody.token;

    let numPos = Math.floor(Math.random() * 4 + 1);
    const jugador = { name: "lelo", position: `${numPos}` };
    const id = 1;

    const { body: jugadores, statusCode } = await request(app)
      .post(`/equipos/${id}/jugadores`)
      .set("Authorization", `Bearer ${token}`)
      .send(jugador);

    expect(statusCode).toBe(201);
  });
});
