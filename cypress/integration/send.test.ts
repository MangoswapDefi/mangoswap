describe('Send', () => {
  it('should redirect', () => {
    cy.visit('/send')
    cy.url().should('include', '/swap')
  })

  it('should redirect with url params', () => {
    cy.visit('/send?outputCurrency=OKT&recipient=bob.argent.xyz')
    cy.url().should('contain', '/swap?outputCurrency=OKT&recipient=bob.argent.xyz')
  })
})
