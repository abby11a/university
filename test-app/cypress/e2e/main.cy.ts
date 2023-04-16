// Tests main page table and filtering
describe('Main page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');

        // Login
        cy.get('input#email').type('admin@prisma.io');
        cy.get('input#password').type('password');
        cy.get('button[type="submit"]').click();
    });


    it('successfully logs in with valid credentials', () => {
        cy.contains("Devices").should("be.visible");
    })

    it('renders the table with devices', () => {

        // check that table has been rendered
        cy.get('table').should('exist')

        // check that table has at least one row
        cy.get('tbody tr').should('exist')
    })

    it('navigates to the correct page when a device is clicked', () => {
        // check that clicking on a device item navigates to the correct page
        cy.get('tbody tr').first().click()
        cy.url().should('contain', '/single-device/ID1')
    })

    it('uses the search bar correctly', () => {
        // check that search bar filters the table correctly
        cy.get('input[type="text"]').type('ID1')
        cy.get('tbody tr').should('have.length', 1)
        cy.get('tbody tr td').contains('ID1')

        cy.get('input[type="text"]').clear()
        cy.get('tbody tr').should('have.length', 4)

        // Use the filters
        // Expect there to be 1 item when Location is selected and a location is entered
        cy.get('select').select('Location')
        cy.get('input[type="text"]').type('1291')
        cy.get('tbody tr').should('have.length', 1)

        // Expect there to be 0 items when Location is selected and an invalid location is entered
        cy.get('input[type="text"]').clear()
        cy.get('input[type="text"]').type('ID1')
        cy.get('tbody tr').should('have.length', 0)
    })
})
