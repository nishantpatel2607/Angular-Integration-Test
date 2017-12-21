import { A4IntegrationTestingPage } from './app.po';

describe('a4-integration-testing App', () => {
  let page: A4IntegrationTestingPage;

  beforeEach(() => {
    page = new A4IntegrationTestingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
