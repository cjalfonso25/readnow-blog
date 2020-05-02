describe("Login form", () => {
  it("Logins successfully", () => {
    cy.visit("/login");

    cy.get("input[type=email]").type("admin@readnow.com");

    cy.get("input[type=password]").type("1234567");

    cy.get(".btn-login")
      .click()
      .location("pathname")
      .should("eq", "/dashboard");
  });

  it("Displays error on failure to login", () => {
    cy.visit("/login");
    cy.server();
    cy.route({
      url: "/api/users/login",
      method: "POST",
      status: 500,
      response: {},
    });

    cy.get("input[type=email]").type("abc@domain.com");

    cy.get("input[type=password").type("123456");

    cy.get(".btn-login").click();

    cy.get(".alert-danger").should("be.visible");
  });
});
