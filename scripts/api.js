const BASE_URL = `https://thinkful-list-api.herokuapp.com/diana/bookmarks`;

//response from api convert to json
function fetchAllBookmarks() {
  return fetch(`${BASE_URL}`).then((res) => res.json());
  }

//request to POST newBookmark to api
function createNewBookmark(bookmark) {
    const newBookmark = JSON.stringify(bookmark);
    console.log(newBookmark);
    return fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: newBookmark,
  })
  .then((res) => res.json());
 
}

//request to DELETE bookmark from server
function deleteBookmark(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}


export default { fetchAllBookmarks, createNewBookmark, deleteBookmark };