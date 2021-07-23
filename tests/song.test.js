const request = require('supertest')("http://rpi4me.duckdns.org:8001");
const expect = require('chai').expect;


describe("GET /api/songs/random", ()=>{
  it("Should respond with 404 for a persona that doesn't exist", async ()=>{
    const response = await request.get("/api/songs/random?persona=LilWhateverSourPuss")
      .trustLocalhost();
    //console.log(response);
    expect(response.status).to.eql(404);
  });
  
  it("Should respond with 200 and a non-empty json with a valid persona as query parameter", async ()=>{
    const response = await request.get("/api/songs/random?persona=Eminem")
      .trustLocalhost();
    expect(response.status).to.eql(200);
    expect(response.body).to.not.be.empty;
  });
});