const request = require('supertest')("http://127.0.0.1:8000");
const expect = require('chai').expect;


describe("GET /api/songs/random", ()=>{
  it("Should respond with 404 for a persona that doesn't exist", async ()=>{
    const response = await request.get("/api/songs/random?persona=LilWhateverSourPuss");
    expect(response.status).to.eql(404);
  });
  
  it("Should respond with 200 and a non-empty json with a valid persona as query parameter", async ()=>{
    const response = await request.get("/api/songs/random?persona=Eminem");
    expect(response.status).to.eql(200);
    expect(response.body).to.not.be.empty;
  });
});