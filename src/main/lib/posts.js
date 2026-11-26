'use strict';
/** Сховище публікацій у пам'яті для веб-додатку MyPress. */
function createStore(initial = []) {
  let nextId = initial.length + 1;
  const items = initial.map((p, i) => ({ id: i + 1, ...p }));
  return {
    list(query = '') {
      const q = query.trim().toLowerCase();
      return q ? items.filter((p) => (p.title + ' ' + p.body).toLowerCase().includes(q)) : items.slice();
    },
    create({ title, body }) {
      if (!title || !title.trim()) throw new Error('Заголовок є обов\'язковим');
      const post = { id: nextId++, title: title.trim(), body: (body || '').trim() };
      items.unshift(post);
      return post;
    },
  };
}
module.exports = { createStore };
