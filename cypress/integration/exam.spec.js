describe("Input form", () => {
  context("Reset password", () => {
    it("should display login problem page", () => {
      cy.visit("/login");

      cy.get(".forgot")
        .click()
        .location("pathname")
        .should("include", "problem"); // assuming page should be '/login/problem
    });
  });
});
