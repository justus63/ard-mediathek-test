describe('ARD Mediathek Suche – Tagesschau Flow', () => {
  
  const baseUrl = "https://www.ardmediathek.de";
  const tagesschauSendungUrl = `${baseUrl}/sendung/tagesschau/Y3JpZDovL2Rhc2Vyc3RlLmRlL3RhZ2Vzc2NoYXU`;

  beforeEach(() => {
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

  it('Führt eine Suche nach "Tagesschau" aus und prüft die Ergebnisse', () => {
    // 1. Klicke auf das Suche-Icon, um die Suchleiste zu öffnen
    cy.get('.bca1xh0 > .b1fv93sw > .bk8qx87 > .b11y8swf > :nth-child(1)') // Selektor für die Suche, basierend auf `href`
      .should('be.visible') // Sicherstellen, dass der Button sichtbar ist
      .click(); // Button anklicken, um die Suche zu öffnen

    // 2. Gib "Tagesschau" in die Suchleiste ein
    cy.get('[style="justify-content:center"] > .b1y4zfs4') // Selektor für die Suchleiste
      .should('be.visible') // Sicherstellen, dass die Suchleiste sichtbar ist
      .type('Tagesschau') // Eingabe des Begriffs "Tagesschau"

    // 3. Prüfe, ob Suchvorschläge unter der Suchleiste angezeigt werden
    cy.get('[role="option"] > .tjc6vv9') // Selektor für Suchvorschläge
      .should('exist') // Sicherstellen, dass Suchvorschläge existieren
      .should('be.visible') // Sicherstellen, dass sie sichtbar sind

    // 4. Warte auf die automatische Ausführung der Suche (wenige Sekunden)
    cy.wait(3000); // Wartezeit von 3 Sekunden für die automatische Suche

    cy.get('[style="justify-content:center"] > .b1y4zfs4') 
    .type('{enter}');

    // 5. Prüfe, ob die Sections „Sendungen, Themen, Livestreams“ und „Videos“ angezeigt werden
    cy.contains('Sendungen, Themen, Livestreams') // Sucht nach der Section „Sendungen“
      .should('be.visible'); // Sicherstellen, dass diese sichtbar ist
      cy.get('.b3kngge > .h40bp0e') // Sucht nach der Section „Videos“
      .should('be.visible'); // Sicherstellen, dass diese sichtbar ist

    // 6. Prüfe, ob Teaser in diesen Sections angezeigt werden
    cy.get('.b3kngge') // Selektor oder Klasse für Teaser
      .should('exist') // Sicherstellen, dass Teaser existieren
      .and('have.length.at.least', 1); // Sicherstellen, dass mindestens 1 Teaser angezeigt wird
  });
  
});
