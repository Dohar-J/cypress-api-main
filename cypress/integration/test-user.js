describe('USER', () => {
    it('Get user by Username', () => {
       cy.request('https://petstore.swagger.io/v2/user/string')
       .should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.username).to.eq('string')
        Cypress._.each(response, (body) => {
            expect(body.id).to.not.be.null
            expect(body).to.have.all.keys('id', 'username', 'firstName', 'lastName', 'email', 'password', 'phone', 'userStatus')
          })
          });
        })
    
});