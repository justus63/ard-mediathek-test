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

  
  
});
