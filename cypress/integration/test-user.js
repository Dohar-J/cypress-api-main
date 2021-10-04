describe('Test USER', () => {

  const USERNAME = Math.random().toString(36).substr(2, 9);


  const USER_OBJECT = 
    {
      "id": 99,
      "username": USERNAME,
      "firstName": USERNAME+"-first",
      "lastName": USERNAME+"-last",
      "email": USERNAME+"@email.com",
      "password": "12345",
      "phone": "12345",
      "userStatus": 1
    }

    const USER_UPDATED = 
    {
      "id": 99,
      "username": USERNAME+"_UPDATED",
      "firstName": USERNAME+"-first_UPDATED",
      "lastName": USERNAME+"-last_UPDATED",
      "email": USERNAME+"_UPDATED@email.com",
      "password": "12345",
      "phone": "12345",
      "userStatus": 1
    }

  const USER_OBJECT_LIST = 
    [
      {
        USER_OBJECT
      }
    ]

    it('Create User', () => {
      cy.request({
        method: 'POST',
        url: 'https://petstore.swagger.io/v2/user', 
        body: USER_OBJECT}).then((response) => {
        expect(response.status).to.equal(200);
      });
    });

    it('Create User with list', () => {
      cy.request({
        method: 'POST',
        url:  'https://petstore.swagger.io/v2/user/createWithList',
        body: USER_OBJECT_LIST}).then(
        (response) => {
          expect(response.status).to.equal(200);
        },
      );
    });

    it('Get User by USERNAME and check response body', () => {
      cy.request({
        method: 'GET',
        url:  'https://petstore.swagger.io/v2/user/'+USERNAME})
        .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(USER_OBJECT);
      });
    });

  it('Update User', () => {
    cy.request({
      method:'PUT',
      url: 'https://petstore.swagger.io/v2/user/'+USERNAME,
      body: USER_UPDATED}).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('Get updated User by USERNAME and check response body', () => {
    cy.request({
      method: 'GET',
      url:  'https://petstore.swagger.io/v2/user/'+USERNAME})
      .then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(USER_UPDATED);
    });
  });

  it('User login', () => {
    cy.request({
      method: 'GET',
      url:'https://petstore.swagger.io/v2/user/login?username='+USER_OBJECT.username+'&password='+USER_OBJECT.password
    }).then(
      (response) => {
        expect(response.status).to.equal(200);
      },
    );
  });

  it('User logout', () => {
    cy.request({
      method:'GET',
      url: 'https://petstore.swagger.io/v2/user/logout'
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('User login with wrong password return 400', () => {
    cy.request({
      method: 'GET',
      url:'https://petstore.swagger.io/v2/user/login?username='+USER_OBJECT.username+'&password=zzz'
    }).then(
      (response) => {
        expect(response.status).to.equal(400);
      },
    );
  });

  it('User login with unregistered username return 400', () => {
    cy.request({
      method: 'GET',
      url:'https://petstore.swagger.io/v2/user/login?username='+Math.random().toString(36).substr(2, 9)+'&password='+USER_OBJECT.password
    }).then(
      (response) => {
        expect(response.status).to.equal(400);
      },
    );
  });

  it('Delete user', () => {
    cy.request({
      method: 'DELETE', 
      url: 'https://petstore.swagger.io/v2/user/'+USERNAME
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

    
    it('Return 404 get user by unregistered username', () => {
      cy.request({
        method: 'GET',
        url: 'https://petstore.swagger.io/v2/user/'+USERNAME,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });

    it('Return 404 update user by unregistered username', () => {
      cy.request({
        method: 'PUT',
        url: 'https://petstore.swagger.io/v2/user/'+USERNAME,
        body: USER_UPDATED,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });
    
});