/// <reference types="cypress"/>

describe('Sign Up Test', () => {
    let r = (Math.random() + 1).toString(36).substring(7);
    var email = r + '@gmail.com';
    var password = 'Admin123@';
    var answer = 'putem'

    describe('UI Test', () => {

        beforeEach(() => {
            cy.visit('http://localhost:3000')
            cy.get('.cdk-overlay-backdrop').click('topRight', { force: true })
            cy.get('.mat-button-wrapper').contains('Account').click()
            cy.get('#navbarLoginButton').click()
        })

        it('Sign up and validate', () => {
            cy.get(".primary-link[routerlink='/register']").click()
            cy.get('#emailControl').type(email);
            cy.get('#passwordControl').type(password)
            cy.get('#repeatPasswordControl').type(password)
            cy.get('.mat-slide-toggle-bar').click()
            cy.get('.mat-select-arrow').click()
            cy.get('.mat-option-text').contains('Name of your favorite pet?').click()
            cy.get('#securityAnswerControl').type(answer)
            cy.get('#registerButton').click()
            cy.get('.mat-simple-snack-bar-content').should('contain.text', 'Registration completed successfully. You can now log in.')
        })

        it('Sign in', () => {
            cy.get('#email').type(email)
            cy.get('#password').type(password)
            cy.get('#loginButton').click()
            cy.get('.fa-layers-counter').should('contain', 0)
        })
    })


    describe('API Test', () => {
        it('POST API and validate status response', () => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/rest/user/login',
                body: {
                    "email": email,
                    "password": password
                }
            }).then((response) => {
                expect(response.status).is.eq(200)
            })
        })

        it('Login via inject token', () => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/rest/user/login',
                body: {
                    "email": email,
                    "password": password
                }
            }).its('body').then((body) => {
                const token = body.authentication.token
                cy.wrap(token).as('userToken')

                const userToken = cy.get('@userToken')
                cy.visit('http://localhost:3000', {
                    onBeforeLoad(browser) {
                        browser.localStorage.setItem('token', userToken)
                    }
                })
                cy.wait(2000)
                cy.get('.cdk-overlay-backdrop').click('topRight', { force: true })
                cy.get('.fa-layers-counter').should('contain', 0)
            })
        })
    })


})


//v033@gmail.com
//Admin123@