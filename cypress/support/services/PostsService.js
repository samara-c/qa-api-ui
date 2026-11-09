class PostsService {
  getPost(id, options = {}) {
    return cy.request({
      method: "GET",
      url: `${Cypress.expose("apiUrl")}/posts/${id}`,
      ...options,
    });
  }

  createPost(post) {
    return cy.request({
      method: "POST",
      url: `${Cypress.expose("apiUrl")}/posts`,
      body: post,
    });
  }

  updatePost(id, post) {
    return cy.request({
      method: "PUT",
      url: `${Cypress.expose("apiUrl")}/posts/${id}`,
      body: post,
    });
  }

  deletePost(id) {
    return cy.request({
      method: "DELETE",
      url: `${Cypress.expose("apiUrl")}/posts/${id}`,
    });
  }
}

module.exports = new PostsService();