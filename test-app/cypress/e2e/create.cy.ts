// Tests create, delete and navigate to home
describe('My Next.js App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');

        // Login
        cy.get('input#email').type('admin@prisma.io');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        // Create view
        cy.contains('button', 'Create Device').click()
    });


    it('renders the form', () => {
        cy.contains("Create Device").should("be.visible");
        cy.get('form').should('exist');
        cy.url().should('contain', '/create');
    })

    it('should submit the form', () => {
        cy.get('input[name="id"]').type('ID5');
        cy.get('input[name="make"]').type('Sony');
        cy.get('input[name="model"]').type('123');
        cy.get('input[name="status"]').type('Available');
        cy.get('input[name="chipset"]').type('123');
        cy.get('input[name="location"]').type('1209');
        cy.get('select').select('1: Floor 3')
        cy.get('input[type="submit"]').click();

        cy.wait(500); // Wait for half a second

        // check it returns back to main page
        cy.get('table').should('exist')
        // check it's added a device
        cy.get('tbody tr').should('have.length', 5)
    })

    it('should not be able to submit the form if fields are not completed', () => {
        cy.get('input[name="id"]').type('ID5');
        cy.get('input[name="make"]').type('Sony');
        cy.get('input[name="model"]').type('123');
        cy.get('input[type="submit"]').should('be.disabled');
    })

    it('can navigate home and delete a device', () => {
        // Navigate to home

        cy.contains('a', 'Device List').click()

        // Get individual device we just created
        cy.get('tbody tr').contains('ID5').click()

        // Click delete
        cy.contains('button', 'Delete').click()

        // Expect pop up to display
        cy.on('window:alert', (message) => {
            expect(message).to.equal('Are you sure you want to delete this item?')
        })

        // Expect item to delete and return to main page
        cy.get('table').should('exist')
        cy.get('tbody tr').should('have.length', 4)
    })
})
export {};