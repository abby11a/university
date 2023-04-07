describe('My Next.js App', () => {
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

    // Renders sign up page
    cy.contains("Sign Up").should("be.visible");

    // Type in valid email and password
    cy.get('input#email').type('test@prisma.io')
    cy.get('input#name').type('test')
    cy.get('input#password').type('password')
    
    // Click the submit button
    cy.get('button[type="submit"]').click()
    
    // Assert that we're redirected to the login page
    cy.url().should('include', '/')
    cy.contains("Account Login").should("be.visible");
  })
})
