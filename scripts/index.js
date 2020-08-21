//The bookmark app allows users to pin their favorite website to the app by [INPUT URL], 
//adding a brief [DESCRIPTION] of the pinned website, giving it [TITLE] and a [1-5 RATING].

//when the app first load it will display saved bookmarks and the form for adding new bookmarks
//Form >>[INPUT URL], [TITLE], [DESCRIPTION], [SAVE]

/*Display form information--bookmark
[INPUT URL], --use id to retrieve val $('#url').val();
[TITLE] --use id to retrieve val $('#title').val();
[DESCRIPTION] --use id to retrieve val $('#description').val();
*/

import api from './api.js';
import store from './store.js';

// mark up generators
function generateBookmark(bookmark) {
  return `
    <li class='bookmark-element' data-item-id="${bookmark.id}">
      Title: ${bookmark.title} Author: ${bookmark.author}
      <button class="delete-bookmark">Delete Bookmark</button>
    </li>
  `;
}

function generateBookmarkList() {
  return `
    <ul>
      ${store.bookmarks.map((bookmark) => generateBookmark(bookmark)).join('')}
    </ul>
  `;
}

function generateLoader() {
  return `
    <div>Loading...</div>
  `;
}

function generateForm() {
  $("#main").add(`
    <form class="add-new">
      <label for="bookmark">Bookmark</label><input type="text" id="add-url" placeholder="URL">
      <label for="title">Title</label><input type="text" id="add-title" placeholder="Title" />
      <label for="description">Description</label><input type='text' id="add-description" placeholder='Description'/>
      <button type='submit' class='submit-button'>Submit</button>
    </form>
    <div class="filter-by-type"><select name="FilterBy">
    <option value="0">Filter by Rating</option>
    <option value="5">5-star</option>
    <option value="4">4-star</option>
    <option value="3">3-star</option>
    <option value="2">2-star</option>
    <option value="1">1-star</option>
  </select></div>`);
}

// event handlers
function handleSubmitBookmark() {
  $('#main').on('submit', '.add-new', (e) => {
    e.preventDefault();

    const title = $('#add-title').val();
    const description = $('#add-description').val();
    const bookmark = { title, author };

    api
      .createNewBookmark(bookmark)
      .then((bookmark) => {
        store.setAddedBookmark(book);
        render();
      })
      .catch((err) => {
        console.log(err);
        store.setError(err.message);
        render();
      });
  });
}

function handleDeleteBookmark() {
  $('#root').on('click', '.delete-bookmark', (e) => {
    const id = getIdFromEl(e.currentTarget);
    api
      .deleteBook(id)
      .then(() => {
        store.setDeleteBook(id);
        render();
      })
      .catch((err) => {
        console.log(err);
        store.setError(err.message);
        render();
      });
  });
}

function bindEventListeners() {
  handleSubmitBookmark();
  handleDeleteBookmark();
}

export function render() {
  let html = '';
  if (store.isLoading) {
    html += generateLoader();
  } else {
    html += generateBookmarkList();
    html += generateForm();
  }

  $('#root').html(html);
}

export function start() {
  bindEventListeners();
  api
    .fetchAllBookmarks()
    .then((bookmarks) => {
      store.setAllBookmarks(bookmarks);
      store.setIsLoading(false);
      render();
    })
    .catch((err) => {
      console.log(err);
      store.setError(err.message);
      render();
    });
}

// helper
function getIdFromEl(item) {
  return $(item).closest('.bookmark-element').data('item-id');
}


