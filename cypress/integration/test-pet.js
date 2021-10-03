describe('STORE', () => {
    it('GET pet by Id', () => {
       cy.request('https://petstore.swagger.io/v2/pet/1')
       .should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.id).to.eq(1)
          })
        })
    
    it('POST pet by Id', () => {
       cy.request({
           method: 'POST',
           url: 'https://petstore.swagger.io/v2/pet/3'
       })
       .should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('3')
          })
        })

    it('DELETE pet by Id', () => {
       cy.request({
           method: 'DELETE',
           url: 'https://petstore.swagger.io/v2/pet/2'
       })
       .should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('2')
          })
        })

    it('UPDATE pet', () => {
       cy.request({
           method: 'PUT',
           url: 'https://petstore.swagger.io/v2/pet',
           body: {
            "id": 1,
            "category": {
              "id": 0,
              "name": "string"
            },
            "name": "doggie",
            "photoUrls": [
              "string"
            ],
            "tags": [
              {
                "id": 0,
                "name": "string"
              }
            ],
            "status": "available"
          }
       })
       .should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.category.id).to.eq(0)
          })
        })     
});