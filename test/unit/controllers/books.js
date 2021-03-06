import BooksController from '../../../controllers/books';

describe('Controllers: Books', () => {
  describe('Get all books: getAll()', () => {
    it('should return a list of books', () => {
        // mock com testdouble
      const Books = {
        findAll: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2017-07-23T23:15:13.867Z',
        updated_at: '2017-07-23T23:15:13.867Z',
      }];

      td.when(Books.findAll({})).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });

    it('should return statusCode 400 when something bad happens', () => {
      const Books = {
        findAll: td.function(),
      };
      const expectedResponse = { statusCode: 400 };
      const expectedResponseData = { error: 'Random error' };

      td.when(Books.findAll({})).thenReject(new Error('Random error'));

      const booksController = new BooksController(Books);
      return booksController.getAll()
        .then(response => expect(response).to.include(expectedResponse).and.have.property('data').include(expectedResponseData));
    });
  });
});
