describe('PET', () => {
    it('Return pet inventories', () => {
       cy.request('https://petstore.swagger.io/v2/store/inventory')
       .should((response) => {
        expect(response.status).to.eq(200)
          })
        })
    
    it('Find purchase order by Id', () => {
       cy.request({
           method: 'GET',
           url: 'https://petstore.swagger.io/v2/store/order/2'
       })
       .should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.id).to.eq(2)
          })
        })

    it('Place an Order', () => {
       cy.request({
           method: 'POST',
           url: 'https://petstore.swagger.io/v2/store/order',
           body: {
            "id": 0,
            "petId": 0,
            "quantity": 0,
            "shipDate": "2021-10-02T05:10:30.839Z",
            "status": "placed",
            "complete": true
          }
       })
       .should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.id).to.eq(9223372036854776000)
          })
        })     
});