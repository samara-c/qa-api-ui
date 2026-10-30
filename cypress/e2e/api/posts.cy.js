
const API_URL = "https://jsonplaceholder.typicode.com";

describe("Posts API - CRUD operations", () => {
  it("GET - should retrieve a post successfully", () => {
    cy.request("GET", `${API_URL}/posts/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body).to.have.property("id", 1);
      expect(response.body.title).to.be.a("string").and.not.be.empty;
    });
  });

  it("GET - should return 404 for a nonexistent post", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}/posts/999999`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it("POST - should create a post", () => {
    const newPost = {
      title: "QA Automation",
      body: "Testing POST requests with Cypress",
      userId: 1,
    };

    cy.request("POST", `${API_URL}/posts`, newPost).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body).to.include(newPost);
      expect(response.body.id).to.exist;
    });
  });

  it("PUT - should update an existing post", () => {
    const updatedPost = {
      id: 1,
      title: "Updated title",
      body: "Updated post content",
      userId: 1,
    };

    cy.request("PUT", `${API_URL}/posts/1`, updatedPost).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body).to.include(updatedPost);
    });
  });

  it("DELETE - should delete a post successfully", () => {
    cy.request("DELETE", `${API_URL}/posts/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.equal({});
    });
  });
});
