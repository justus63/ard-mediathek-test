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
//-----------------------------------TEST 1-------------------------------------------
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
//------------------------------------TEST 2------------------------------------------
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
//---------------------------TEST 3-----------------------------------------------------------------------
      // Schließe das Suchvorschlagsfenster durch Klick außerhalb
cy.get('body').click(0, 0); // Klick links oben auf die Seite

       // 7. Suche die Sendungsseite der Tagesschau und klicke darauf
       cy.get('.swiper-slide-next > .bt0tp5a > [style="height: 100%;"]') // Direkt das <a>-Element für die Tagesschau-Sendungsseite
  .should('be.visible') // Sicherstellen, dass der Link sichtbar ist
  .click(); // Klick auf die Tagesschau-Sendungsseite

// 8. Prüfen, ob die Sendungsseite geöffnet wurde
cy.url().should('include', '/sendung/tagesschau/Y3JpZDovL2Rhc2Vyc3RlLmRlL3RhZ2Vzc2NoYXU'); // Sicherstellen, dass die URL korrekt ist

// 9. Auf der Sendungsseite: Prüfen, ob ein Bild-Banner vorhanden ist
cy.get('.brvzu8x > .bt3d8jq > img') 
  .should('exist') // Sicherstellen, dass der Bild-Banner existiert
  .and('be.visible'); // Sicherstellen, dass er sichtbar ist

// 10. Auf der Sendungsseite: Prüfen, ob der Titel und die Beschreibung sichtbar sind
cy.get('.h1rjbq0o') // Selektor für den Titel der Tagesschau
  .should('exist') // Sicherstellen, dass der Titel existiert
  .and('be.visible'); // Sicherstellen, dass der Titel sichtbar ist

  cy.get('._1quztox > .b1ja19fa') // Selektor für die Beschreibung
  .should('exist') // Sicherstellen, dass die Beschreibung existiert
  .and('be.visible'); // Sicherstellen, dass die Beschreibung sichtbar ist

// 11. Prüfen, ob die Section „Alle Videos“ mit Teasern angezeigt wird
cy.contains('Alle Videos') // Text „Alle Videos“ als Abschnittstitel verwenden
  .should('exist') // Sicherstellen, dass die Section vorhanden ist
  .and('be.visible'); // Sicherstellen, dass sie sichtbar ist

  cy.get('#goToContent > :nth-child(3)') // Selektor für die Teaser
  .should('exist') // Sicherstellen, dass Teaser vorhanden sind
  .and('have.length.at.least', 1); // Sicherstellen, dass mindestens 1 Teaser angezeigt wird

//--------------------------------TEST 4-----------------------------------------------------
// 1. Navigiere zurück zur vorherigen Seite (Suche)
cy.go('back'); // Zurücknavigieren

// 2. Sicherstellen, dass die Suchseite erneut geladen wird
cy.url().should('include', '/suche'); // Prüfen, ob die URL erneut „/suche“ enthält

// 3. Sicherstellen, dass der Suchbegriff „Tagesschau“ noch in der Suchleiste vorhanden ist
cy.get(':nth-child(2) > .b1y4zfs4')
.click();
cy.focused()
  .should('have.value', 'Tagesschau'); // Prüfen, dass der vorherige Suchbegriff erhalten bleibt


//--------------------------------TEST 5-----------------------------------------------------
 // 1. Sicherstellen, dass die Ergebnisse/Section „Videos“ angezeigt wird
 cy.get('body').click(0, 0); // Klick links oben auf die Seite
 cy.get('.b3kngge').should('be.visible'); // Die Section „Videos“ laden

 // 2. Speichere den Titel eines beliebigen Video-Teasers in einer Variablen
 cy.get(':nth-child(1) > .bb65sj8') // Selektor für ein Teaser-Element im Bereich „Videos“
   .first() // Wähle das erste Video aus der Liste (oder verwende `.eq(index)`, um ein bestimmtes auszuwählen)
   .find('h3') // Der Selektor für den Titel-Text des Videos
   .invoke('text') // Hol den sichtbaren Text (Titel des Videos)
   .then((teaserTitle) => {
     cy.log(`Gefundener Teaser-Titel: ${teaserTitle}`); // Logge den Titel in der Cypress-Konsole

     // 3. Klicke auf das ausgewählte Teaser/Video
     cy.get(':nth-child(1) > .bb65sj8').first().click();

     

     // 4. Vergleiche den Titel auf der Playerseite mit dem gespeicherten Teaser-Titel
     cy.get('.h1rjbq0o') // Selektor für den Titel auf der Player-Seite
       .should('be.visible') // Sicherstellen, dass der Titel sichtbar ist
       .invoke('text') // Den sichtbaren Text (Titel) aus dem HTML holen
       .should('eq', teaserTitle); // Sicherstellen, dass der Titel mit dem gespeicherten Teaser-Titel übereinstimmt

     // 5. Prüfen, ob das Video im Player abgespielt wird
     cy.get('video')
  .should('have.attr', 'src') // Prüfen, ob das `src`-Attribut vorhanden ist
  .and('match', /blob:/); // Sicherstellen, dass es sich um eine blob-Quelle handelt


  
});


  });
});