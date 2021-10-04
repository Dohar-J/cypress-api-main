describe('Test STORE', () => {
  const ORDER = {
    "id": 10,
    "petId": 99,
    "quantity": 1,
    "shipDate": "2021-10-04T09:41:49.446Z",
    "status": "placed",
    "complete": true
  };

  it('Create Order', () => {
    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/store/order',
      body: ORDER})
      .then((response) => {
      expect(response.status).to.equal(200);
    });
  });


  it('Get pet inventories', () => {
    cy.request('https://petstore.swagger.io/v2/store/inventory')
      .should((response) => {
      expect(response.status).to.eq(200)
      });
  });

  it('Return 500 when a new order is invalid ', () => {
    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/store/order',
      body: { "id": 'abcd',
      "petId": 99,
      "quantity": 1,
      "shipDate": "2021-10-04T09:41:49.446Z",
      "status": "placed",
      "complete": true },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(500);
    });
  });
    
  it('Find order order by Id', () => {
    cy.request({
           method: 'GET',
           url: 'https://petstore.swagger.io/v2/store/order/'+ORDER.id
    })
    .should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(ORDER.id)
    })
  })

  it('Return 404 when delete with invalid orderId', () => {
    cy.request({
      method: 'DELETE',
      url: `https://petstore.swagger.io/v2/store/order/abc`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });

  it('Delete order by id', () => {
    cy.request({
      method:'DELETE',
      url: 'https://petstore.swagger.io/v2/store/order/'+ORDER.id
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('Return 404 when the orderId is not found', () => {
    cy.request({
      method: 'GET',
      url: `https://petstore.swagger.io/v2/store/order/${ORDER.id}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });

});