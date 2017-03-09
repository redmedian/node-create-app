import Book from '../models/book';

/*
 * GET /books
 */
// eslint-disable-next-line import/prefer-default-export, consistent-return
export async function getAll(req, res, next) {
  let books;

  // Запрашиваем данные, в случае ошибки вернем error 500
  try {
    books = await Book.find();
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  // Если вывод дополнительно обернуть {}, то /api/books будет иметь структуру с ключом "books" - { "books": [] }
  res.json({ books });
}

/*
 * POST /books
 */
// eslint-disable-next-line import/prefer-default-export, consistent-return
export async function create(req, res, next) {
  let books;
  // Получаем тело запроса в котором находятся данные о записях
  const bookData = req.body;

  // Создаём запись, в случае ошибки вернем error 400
  try {
    books = await Book.create(bookData);
  } catch ({ message }) {
    return next({
      status: 400,
      message,
    });
  }

  // Вернем запись пользователю
  res.json({ message: 'success', books });
}

/*
 * GET /books/:id
 */
// eslint-disable-next-line import/prefer-default-export, consistent-return
export async function getBook(req, res, next) {
  // Получаем id записи из параметров запроса
  // eslint-disable-next-line no-underscore-dangle
  const _id = req.params.id;
  let book;

  // Получаем запись по её ID
  try {
    book = await Book.findOne({ _id });
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  // Если звпись не найдена то вернём ошибку
  if (!book) {
    return next({
      status: 404,
      message: 'Book not found',
    });
  }

  // Вернем запись пользователю
  return res.json(book);
}

/*
 * PUT /books/:id
 */
// eslint-disable-next-line import/prefer-default-export, consistent-return
export async function editBook(req, res, next) {
  // Получаем тело запроса в котором находятся данные о записях
  const bookData = req.body;
  // Получаем id записи из параметров запроса
  // eslint-disable-next-line no-underscore-dangle
  const _id = req.params.id;
  let book;

  // Получаем запись по её ID
  try {
    book = await Book.findOne({ _id });
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  // Если звпись не найдена то вернём ошибку
  if (!book) {
    return next({
      status: 404,
      message: 'Book not found',
    });
  }

  // Добавляем данные из bookData
  // ES6 функция Object.assign получает список объектов и копирует в первый параметр (book) свойства из остальных (bookData, etc, etc)
  // Примеры работы Object.assign - https://learn.javascript.ru/es-object
  try {
    Object.assign(book, bookData).save();
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  // Вернем сообщение об успешном обновлении записи
  return res.json({ message: 'success', book });
}

/*
 * DELETE /books/:id
 */
// eslint-disable-next-line import/prefer-default-export, consistent-return
export async function deleteBook(req, res, next) {
  // Получаем id записи из параметров запроса
  // eslint-disable-next-line no-underscore-dangle
  const _id = req.params.id;
  let book;

  // Получаем запись по её ID
  try {
    book = await Book.findOne({ _id });
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  // Если звпись не найдена то вернём ошибку
  if (!book) {
    return next({
      status: 404,
      message: 'Book not found',
    });
  }

  // Вернем сообщение об успешном удалении записи
  return res.json({ message: 'success' });
}
