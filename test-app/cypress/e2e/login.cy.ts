// Tests Login and Signup
describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('successfully logs in with valid credentials', () => {

    // Type in valid email and password
    cy.get('input#email').type('admin@prisma.io')
    cy.get('input#password').type('password')

    // Click the submit button
    cy.get('button[type="submit"]').click()

    // Assert that we're redirected to the devices page
    cy.url().should('include', '/')
    cy.contains("Devices").should("be.visible");
  })


  it("should display an error message for incorrect credentials", () => {
    cy.get("form").within(() => {
      cy.get('input#email').type("example@example.com");
      cy.get('input#password').type("wrongpassword");
      cy.get('button[type="submit"]').click();
    });

    cy.on('window:alert', (message) => {
      expect(message).to.equal('Invalid email or password')
    })
  });



  it('successfully sign up with valid credentials', () => {
    cy.contains('a', 'Sign Up').click();
    cy.wait(500); // Wait for half a second

    // Renders sign up page
    cy.contains("Sign Up").should("be.visible");
    cy.wait(500); // Wait for half a second
    
    // Type in valid email and password
    cy.get('input#email').type('test@prisma.io')
    cy.get('input#name').type('test')
    cy.get('input#password').type('password')

    cy.wait(500); // Wait for half a second
    // Click the submit button
    cy.get('button[type="submit"]').click()

    // Assert that we're redirected to the login page
    cy.url().should('include', '/')
    cy.contains("Account Login").should("be.visible");
  })

  it('renders the correct page for non-admin user', () => {
    // Login as regular user
    cy.get('input#email').type('regular@prisma.io');
    cy.get('input#password').type('password');
    cy.get('button[type="submit"]').click();


    cy.url().should('include', '/')
    cy.get('table').should('exist')
    cy.get('tbody tr').contains('ID1').click()
    cy.url().should('contain', '/single-device/ID1')

    // Check delete button doesn't exist
    cy.contains('button', 'Delete').should('not.exist');
  })
})
export {};