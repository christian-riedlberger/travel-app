import moment from 'moment';

describe('TRAVEL_PAGE', () => {

    context('TRAVEL_PAGE', () => {

        beforeEach(() => {
            cy.visit('http://localhost:3000');
        });

        const firstDay = moment().format('ddd')
        const secondDay = moment().add(1,'days').format('ddd')

        it('should get weather for location', () => {
            cy.server()
                .get('[data-cy="selectCity"]')
                .should('exist')
                .click()
                .get('[data-cy="Montreal"]')
                .should('exist')
                .click()
                .get('[data-cy="description"]')
                .should('contain', 'Montreal')
                .get('[data-cy="selectForecast"]')
                .should('exist')
                .click()
                .get('[data-cy="Two Day"]')
                .should('exist')
                .click()
                .get('[data-cy="forecast0"]')
                .should('contain', firstDay)
                .get('[data-cy="forecast1"]')
                .should('contain', secondDay)
        })        
    });
});