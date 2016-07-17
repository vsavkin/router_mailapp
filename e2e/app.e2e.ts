import { BookPage } from './app.po';

describe('book App', function() {
  let page: BookPage;

  beforeEach(() => {
    page = new BookPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('book works!');
  });
});
