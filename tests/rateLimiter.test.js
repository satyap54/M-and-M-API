const request = require('supertest')("http://rpi4me.duckdns.org:8001");
const expect = require('chai').expect;
const requestsPerMinute = 60;


describe("GET /song rateLimit", ()=>{
  it("should give status 429 response when > 60 requests are made in a window", async ()=>{
    for(let i = 1; i <= requestsPerMinute; i++){
      const prevResponse =  await request.get("/api/songs/1");
      expect(prevResponse.status).to.eql(200);
    }
    
    // The (requestsPerMinute + 1)th request should give status = 429
    const finalResponse = await request.get("/api/songs/1");
    expect(finalResponse.status).to.eql(429);
  });
});