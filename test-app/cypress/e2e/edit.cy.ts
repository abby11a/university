// Tests edit component
describe('Edit component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');

        // Login
        cy.get('input#email').type('admin@prisma.io');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();

        // Single device view
        cy.get('tbody tr').contains('ID1').click()
        cy.url().should('contain', '/single-device/ID1')

        // Edit device view
        cy.contains('button', 'Edit').click()
    });


    it('renders the form', () => {
        cy.contains("Edit Device ID1").should("be.visible");
        cy.get('form').should('exist');
        cy.url().should('contain', '/single-device/ID1');
    })

    it('should submit the form', () => {
        // ID field should be disabled
        cy.get('input[name="id"]').should('be.disabled');

        cy.get('input[name="make"]').clear();
        cy.get('input[name="make"]').type('Apple');

        cy.get('input[name="status"]').clear();
        cy.get('input[name="status"]').type('Unavailable');
        cy.get('input[type="submit"]').click();

        // check it returns back to main page
        cy.get('table').should('exist')
        // check it's edited a device
        cy.get('tbody tr').contains('td', 'ID1').parent('tr').within(() => {
            cy.get('td').should('contain', 'Apple');
        });
        cy.get('tbody tr').contains('td', 'ID1').parent('tr').within(() => {
            cy.get('td').should('contain', 'Unavailable');
        });
    })
})

export { };