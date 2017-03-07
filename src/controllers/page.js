import Page from '../models/page';

/*
 * GET /pages
 */
// eslint-disable-next-line import/prefer-default-export, consistent-return
export async function getAll(req, res, next) {
  let pages;

  // Запрашиваем данные, в случае ошибки вернем error 500
  try {
    pages = await Page.find();
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  // Если вывод дополнительно обернуть {}, то /api/pages будет иметь структуру с ключом "pages" - { "pages": [] }
  res.json({ pages });
}

/*
 * POST /pages
 */
// eslint-disable-next-line import/prefer-default-export, consistent-return
export async function create(req, res, next) {
  let pages;
  // Получаем тело запроса в котором находятся данные о записях
  const pageData = req.body;

  // Создаём запись, в случае ошибки вернем error 400
  try {
    pages = await Page.create(pageData);
  } catch ({ message }) {
    return next({
      status: 400,
      message,
    });
  }

  // Вернем запись пользователю
  res.json({ message: 'success', pages });
}

/*
 * GET /pages/:id
 */
// eslint-disable-next-line import/prefer-default-export, consistent-return
export async function getPage(req, res, next) {
  // Получаем id записи из параметров запроса
  // eslint-disable-next-line no-underscore-dangle
  const _id = req.params.id;
  let page;

  // Получаем запись по её ID
  try {
    page = await Page.findOne({ _id });
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  // Если звпись не найдена то вернём ошибку
  if (!page) {
    return next({
      status: 404,
      message: 'Page not found',
    });
  }

  // Вернем запись пользователю
  return res.json(page);
}

/*
 * PUT /pages/:id
 */
// eslint-disable-next-line import/prefer-default-export, consistent-return
export async function editPage(req, res, next) {
  // Получаем тело запроса в котором находятся данные о записях
  const pageData = req.body;
  // Получаем id записи из параметров запроса
  // eslint-disable-next-line no-underscore-dangle
  const _id = req.params.id;
  let page;

  // Получаем запись по её ID
  try {
    page = await Page.findOne({ _id });
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  // Если звпись не найдена то вернём ошибку
  if (!page) {
    return next({
      status: 404,
      message: 'Page not found',
    });
  }

  // Добавляем данные из pageData
  // ES6 функция Object.assign получает список объектов и копирует в первый параметр (page) свойства из остальных (pageData, etc, etc)
  // Примеры работы Object.assign - https://learn.javascript.ru/es-object
  try {
    Object.assign(page, pageData).save();
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  // Вернем сообщение об успешном обновлении записи
  return res.json({ message: 'success', page });
}

/*
 * DELETE /pages/:id
 */
// eslint-disable-next-line import/prefer-default-export, consistent-return
export async function deletePage(req, res, next) {
  // Получаем id записи из параметров запроса
  // eslint-disable-next-line no-underscore-dangle
  const _id = req.params.id;
  let page;

  // Получаем запись по её ID
  try {
    page = await Page.findOne({ _id });
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  // Если звпись не найдена то вернём ошибку
  if (!page) {
    return next({
      status: 404,
      message: 'Page not found',
    });
  }

  // Вернем сообщение об успешном удалении записи
  return res.json({ message: 'success' });
}
