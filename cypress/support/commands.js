// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("validMembership", (membershipNo) => {
  cy.route({
    url: "/api/users/verify",
    method: "POST",
    status: 200,
    response: {},
  });

  cy.get(".membership-input")
    .type(membershipNo)
    .should("have.value", membershipNo);

  cy.get(".btn-continue").click();
});

Cypress.Commands.add("invalidMembership", (membershipNo) => {
  cy.route({
    url: "/api/users/verify",
    method: "POST",
    status: 500,
    response: {},
  });

  cy.get(".membership-input")
    .type("123456789")
    .should("have.value", "123456789");

  cy.get(".btn-continue").click();
});

Cypress.Commands.add("validUsername", (username) => {
  cy.route({
    url: "/api/users/verify",
    method: "POST",
    status: 200,
    response: {},
  });

  cy.get(".username-input").type(username).should("have.value", username);

  cy.get(".btn-username-submit").click();
});

Cypress.Commands.add("invalidUsername", (username) => {
  cy.route({
    url: "/api/users/verify",
    method: "POST",
    status: 500,
    response: {},
  });

  cy.get(".username-input").type(username).should("have.value", username);

  cy.get(".btn-username-submit").click();
});

Cypress.Commands.add("sendOtp", () => {
  cy.route({
    url: "/api/users/otp",
    method: "POST",
    status: 200,
    respsonse: {},
  });
});
