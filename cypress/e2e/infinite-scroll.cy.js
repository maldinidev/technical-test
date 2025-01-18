describe('Infinite Scroll', () => {
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

    // Mock subsequent API responses
    cy.intercept('GET', 'https://picsum.photos/v2/list?page=2&limit=20', {
      statusCode: 200,
      body: Array(10)
        .fill(0)
        .map((_, i) => ({
          id: i + 21,
          download_url: `https://picsum.photos/id/${i + 21}/200/300`,
          author: `Author ${i + 21}`,
        })),
    }).as('getMoreImages');

    cy.visit('/');
  });

  it('loads more images when scrolling to the bottom', () => {
    cy.wait('@getImages'); // Wait for initial images to load

    // Verify 20 images are rendered initially
    cy.get('img').should('have.length', 20);

    // Scroll to the bottom of the page
    cy.scrollTo('bottom');

    // Wait for the second batch of images to load
    cy.wait('@getMoreImages');

    // Verify 30 images are now rendered
    cy.get('img').should('have.length', 30);
  });
});
