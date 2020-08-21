const BASE_URL = 'https://thinkful-list-api.herokuapp.com/diana/bookmarks';


function fetchAllBookmarks() {
  return fetch(`${BASE_URL}/api/bookmarks`).then((res) => res.json());
}


function createNewBookmark(bookmark) {
  const newBookmark = JSON.stringify(bookmark);
  return fetch(`${BASE_URL}/api/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: newBookmark,
  }).then((res) => res.json());
}


function deleteBookmark(id) {
  return fetch(`${BASE_URL}/api/bookmarks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default { fetchAllBookmarks, createNewBookmark, deleteBookmark };