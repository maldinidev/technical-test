describe('Image Removal', () => {
  beforeEach(() => {
    // Mock API response
    cy.intercept('GET', 'https://picsum.photos/v2/list*', {
      statusCode: 200,
      body: Array(20)
        .fill(0)
        .map((_, i) => ({
          id: i + 1,
          download_url: `https://picsum.photos/id/${i + 1}/200/300`,
          author: `Author ${i + 1}`,
        })),
    }).as('getImages');

    cy.visit('/');
  });

  it('removes an image from the grid when the remove button is clicked', () => {
    cy.wait('@getImages'); // Wait for initial images to load

    // Verify 20 images are rendered initially
    cy.get('img').should('have.length', 20);

    // Click the "remove" button for the first image
    cy.get('.group-hover\\:opacity-85').first().click();

    // Verify one image is removed
    cy.get('img').should('have.length', 19);
  });
});
