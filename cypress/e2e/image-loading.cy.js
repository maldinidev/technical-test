describe('Image Loading', () => {
  beforeEach(() => {
    // Mock initial API response
    cy.intercept('GET', 'https://picsum.photos/v2/list?page=1&limit=20', {
      statusCode: 200,
      body: Array(20)
        .fill(0)
        .map((_, i) => ({
          id: i + 1,
          download_url: `https://picsum.photos/id/${i + 1}/200/300`,
          author: `Author ${i + 1}`,
        })),
    }).as('getImages');

    // Visit the page
    cy.visit('/');
  });

  it('displays loading indicator while fetching images', () => {
    // Verify loading indicator is visible
    cy.contains('Cargando imágenes...').should('be.visible');

    // Wait for the images to load
    cy.wait('@getImages');

    // Verify loading indicator disappears
    cy.contains('Cargando imágenes...').should('not.exist');
  });

  it('displays images correctly after loading', () => {
    cy.wait('@getImages'); // Wait for images to load

    // Verify 20 images are rendered
    cy.get('img').should('have.length', 20);

    // Verify the attributes of the first image
    cy.get('img')
      .first()
      .should('have.attr', 'src', 'https://picsum.photos/id/1/200/300')
      .and('have.attr', 'alt', 'Author 1');
  });
});
