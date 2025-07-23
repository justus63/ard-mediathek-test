describe('ARD Mediathek Suche – Tagesschau Flow', () => {
  
  const baseUrl = "https://www.ardmediathek.de";
  const tagesschauSendungUrl = `${baseUrl}/sendung/tagesschau/Y3JpZDovL2Rhc2Vyc3RlLmRlL3RhZ2Vzc2NoYXU`;

  before(() => {
    cy.visit('https://www.ardmediathek.de', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
      },
    });
  });

  it('Öffnet die Suche und prüft Hauptelemente', () => {
    it('Öffnet die Suche - Selektor gezielt eingrenzen', () => {
      // Prüft: Gibt es mehrere Elemente mit href="/suche"?
      cy.get('a[href="/suche"]').then(($elements) => {
        if ($elements.length > 1) {
          cy.log('Es gibt mehrere Elemente. Verwende das erste.');
        }
      });
  
      // Klickt gezielt auf das erste oder spezifische Element
      cy.get('a[href="/suche"]').first().should('be.visible').click();
  
      // Sicherstellen, dass andere Elemente korrekt geladen werden
      cy.get('[data-qa="search-input"]').should('be.visible');
      cy.contains('Sendungen A–Z').should('exist');
      cy.contains('Rubriken').should('exist');
    });

  });
  
});
