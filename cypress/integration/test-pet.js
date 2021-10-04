describe('Test PET', () => {
    
    const PET = {
      "id": 99,
      "category": {
        "id": 1,
        "name": "Dogs"
      },
      "name": "doggie",
      "photoUrls": [
        "string"
      ],
      "tags": [
        {
          "id": 1,
          "name": "dog"
        }
      ],
      "status": "available"
    }

    const PET_UPDATED = {
      "id": 99,
      "category": {
        "id": 1,
        "name": "Cats"
      },
      "name": "kitten",
      "photoUrls": [
        "string"
      ],
      "tags": [
        {
          "id": 1,
          "name": "cat"
        }
      ],
      "status": "available"
    }

    it('Create PET', () => {
          cy.request({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/pet/',
            body: PET
          })
          .then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.deep.equal(PET);
          })
        })

    it('Return 404 when get pet with invalid Id', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/pet/abc',
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.equal(404);
          })
        })

    it('Get pet by Id and Check body', () => {
      cy.wait(3000).request({
        method: 'GET',
        url: 'https://petstore.swagger.io/v2/pet/'+PET.id})
        .then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.deep.equal(PET);
      })
    })

    it('Update pet', () => {
      cy.request({
        method:'PUT',
        url: 'https://petstore.swagger.io/v2/pet',
        body: PET_UPDATED
      }).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.deep.equal(PET_UPDATED);
      });
    });

    it('Get updated pet by Id and Check body', () => {
      cy.wait(3000).request({
        method: 'GET',
        url: 'https://petstore.swagger.io/v2/pet/'+PET_UPDATED.id})
        .then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.deep.equal(PET_UPDATED);
      })
    })

    it('Delete pet with invalid Id', () => {
      cy.request({
        method: 'DELETE',
        url: 'https://petstore.swagger.io/v2/pet/abc',
        failOnStatusCode: false})
        .then((response) => {
        expect(response.status).to.equal(404);
      })
    })

    it('Delete pet with id', () => {
      cy.request({
        method: 'DELETE',
        url: 'https://petstore.swagger.io/v2/pet/'+PET.id
      }).then((response) => {
        expect(response.status).to.equal(200);
      })
    })

    it('Return 404 when the petId is invalid', () => {
      cy.request({
        method: 'GET',
        url: 'https://petstore.swagger.io/v2/pet/abc',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });

    it('Return 404 when get petId does not exist', () => {
      cy.wait(5000)
      cy.request({
        method: 'GET',
        url: 'https://petstore.swagger.io/v2/pet/'+PET.id,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });

    it('Return 404 when update petId does not exist', () => {
      cy.request({
        method:'PUT',
        url: 'https://petstore.swagger.io/v2/pet',
        body: PET_UPDATED,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });
    
     
});