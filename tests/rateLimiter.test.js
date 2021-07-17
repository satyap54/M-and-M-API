const request = require('supertest')("http://127.0.0.1:8000");
const expect = require('chai').expect;
const requestsPerMinute = 60;


describe("GET /song rateLimit", ()=>{
  it("should give status 429 response when > 60 requests are made in a window", async ()=>{
    for(let i = 1; i <= requestsPerMinute; i++){
      const prevResponse =  await request.get("/api/songs/60f1c45d7b406937167a9fdf");
      expect(prevResponse.status).to.eql(200);
    }
    
    // The (requestsPerMinute + 1)th request should give status = 429
    const finalResponse = await request.get("/api/songs/60f1c45d7b406937167a9fdf");
    expect(finalResponse.status).to.eql(429);
  });
});