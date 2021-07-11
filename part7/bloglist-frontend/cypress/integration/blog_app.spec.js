describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });

  it('Login Form', function() {
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Successful and Failed Login Attempts', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test2');
      cy.get('#password').type('test');
      cy.get('#login').click();
      cy.contains('test2 logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test2');
      cy.get('#password').type('test213123');
      cy.get('#login').click();
      cy.contains('Wrong credentials');
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('test2');
      cy.get('#password').type('test');
      cy.get('#login').click();
    });
    it('A blog can be created', function() {
      cy.get('#createNewBlog').click();
      cy.get('#title').type('Title');
      cy.get('#URL').type('url');
      cy.contains('Create').click();
      cy.contains('Title test');
    });
    it('user can like a blog', function() {
      cy.get('#createNewBlog').click();
      cy.get('#title').type('Title');
      cy.get('#URL').type('url');
      cy.contains('Create').click();
      cy.contains('view').click();
      cy.get('#likeButton').click();
      cy.contains('1');
    });
  });
  describe('Blogs ordered ascending by likes', function() {
    beforeEach(function() {
      cy.get('#username').type('test2');
      cy.get('#password').type('test');
      cy.get('#login').click();

      cy.get('#createNewBlog').click();
      cy.wait(100);
      cy.get('#title').type('Title1');
      cy.get('#URL').type('url');
      cy.contains('Create').click();
      cy.wait(500);
      cy.get('#createNewBlog').click();
      cy.wait(100);
      cy.get('#title').type('Title2');
      cy.get('#URL').type('url');
      cy.contains('Create').click();
      cy.wait(500);
      cy.get('#createNewBlog').click();
      cy.wait(100);
      cy.get('#title').type('Title3');
      cy.get('#URL').type('url');
      cy.contains('Create').click();
      cy.wait(500);
    });

    it('they are ordered by number of likes', function() {
      cy.get('Title1')
        .contains('view')
        .click();
      cy.get('Title2')
        .contains('view')
        .click();
      cy.get('Title3')
        .contains('view')
        .click();
      cy.get('Title1')
        .contains('like')
        .as('like1');
      cy.get('Title2')
        .contains('like')
        .as('like2');
      cy.get('Title3')
        .contains('like')
        .as('like3');
      cy.get('@like2').click();
      cy.get('@like1').click();
      cy.get('@like1').click();
      cy.get('@like3').click();
      cy.get('@like3').click();
      cy.get('@like3').click();
      cy.get('#blogs').then(blogs => {
        cy.wrap(blogs[0]).contains('1');
        cy.wrap(blogs[1]).contains('2');
        cy.wrap(blogs[2]).contains('3');
      });
    });
  });
});
