import { BooknewPage } from './app.po';

describe('booknew App', function() {
  let page: BooknewPage;

  beforeEach(() => {
    page = new BooknewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
