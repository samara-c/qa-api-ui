const Ajv = require("ajv");
const PostsService = require("../../support/services/PostsService");
const postSchema = require("./schemas/post.schema.json");

const ajv = new Ajv({ allErrors: true });
const validatePost = ajv.compile(postSchema);

const assertPostSchema = (body) => {
  const isValid = validatePost(body);

  expect(
    isValid,
    `Schema validation errors: ${JSON.stringify(validatePost.errors)}`
  ).to.be.true;
};

describe("Posts API - CRUD operations", () => {
  it("GET - should retrieve a post and validate its schema", () => {
    PostsService.getPost(1).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body.id).to.eq(1);

      assertPostSchema(response.body);
    });
  });

  it("GET - should return 404 for a nonexistent post", () => {
    PostsService.getPost(999999, {
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it("POST - should create a post and validate its schema", () => {
    const newPost = {
      title: "QA Automation",
      body: "Testing POST requests with Cypress",
      userId: 1,
    };

    PostsService.createPost(newPost).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.include(newPost);
      expect(response.body.id).to.be.a("number");

      assertPostSchema(response.body);
    });
  });

  it("PUT - should update an existing post and validate its schema", () => {
    const updatedPost = {
      id: 1,
      title: "Updated title",
      body: "Updated post content",
      userId: 1,
    };

    PostsService.updatePost(1, updatedPost).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include(updatedPost);

      assertPostSchema(response.body);
    });
  });

  it("DELETE - should delete a post successfully", () => {
    PostsService.deletePost(1).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.equal({});
    });
  });
});