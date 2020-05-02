describe("Forgot password", () => {
  it("clicks forgot username and displays login problem page", () => {
    cy.visit("/login");

    cy.contains("Forgot Username")
      .click()
      .location("pathname")
      .should("eq", "/login/problem");
  });

  it("clicks forgot password and displays login problem page", () => {
    cy.visit("/login");

    cy.contains("Forgot Password")
      .click()
      .location("pathname")
      .should("eq", "/login/problem");
  });

  context("Membership form submission", () => {
    it("clicks forgot password and displays membership form", () => {
      cy.visit("/login");

      cy.contains("Forgot Password")
        .click()
        .location("pathname")
        .should("eq", "/login/problem");

      cy.get("#membershipForm").should("be.visible");
    });

    it("displays username form", () => {
      cy.visit("/login/problem");

      cy.server();

      cy.validMembership("123456");
    });

    it("shows an error message on failed submission", () => {
      cy.visit("/login/problem");

      cy.server();

      cy.invalidMembership("123456");

      cy.get(".error").should("be.visible");
    });
  });

  context("Username form submission", () => {
    beforeEach(() => {
      cy.visit("/login/problem");
      cy.server();
      cy.validMembership("123456");
    });

    it("will be directed to otp page and send otp", () => {
      cy.get("#usernameForm").should("be.visible");

      cy.validUsername("user1");

      cy.location("pathname").should("eq", "/otp");

      cy.sendOtp();
    });

    it("shows an error message on failed submission", () => {
      cy.invalidUsername("user1");

      cy.get(".error").should("be.visible");
    });
  });

  context("redirect to set new password page", () => {
    it.only("submits otp and directed to set new password page", () => {
      cy.visit("/otp");

      cy.get("[data-cy=input-otp").type("0123").should("have.value", "0123");

      cy.get("[data-cy=submit-otp")
        .click()
        .location("pathname")
        .should("eq", "/set-new-password");
    });
  });
});
