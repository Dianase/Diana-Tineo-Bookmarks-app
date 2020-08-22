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
import $ from 'jquery';




export function generateBookmark(bookmark) {
  return`
    <li class="bookmark-element" data-item-id="${bookmark.id}">
      <a href="${bookmark.url}">Title:${bookmark.title} Rating:${bookmark.rating}<a/>
      <br>
      <button class="delete-bookmark">Delete Bookmark</button>
    </li>
  `;

}


export function generateBookmarkList() {
  return`
    <ul>
      ${store.bookmarks.map((bookmark) => generateBookmark(bookmark)).join('')}
    </ul>
  `;
}



//the content that will be displayed at the start 
function generateForm() {
  return`
    <form class="add-new">
      <label for="bookmark">Bookmark</label><input type="text" id="url" placeholder="URL">
      <label for="title">Title</label><input type="text" id="title" placeholder="Title" />
      <label for="description">Description</label><input type='text' id="add-description" placeholder='Description'/>
      <label for="rating">Rating</label>
        <input type="radio" id="star1-rating" name="star" value="1"><label for="star1">1</label>
        <input type="radio" id="star2-rating" name="star" value="2"><label for="star2">2</label>
        <input type="radio" id="star3-rating" name="star" value="3"><label for="star3">3</label>
        <input type="radio" id="star4-rating" name="star" value="4"><label for="star4">4</label>
        <input type="radio" id="star5-rating" name="star" value="5"><label for="star5">5</label>
      <button type='submit' class='submit-button'>Submit</button> 
    </form>
    <div class="filter-by-rating"><select name="filter-by-rating">
    <option value="0">Filter by Rating</option>
    <option value="5">5-star</option>
    <option value="4">4-star</option>
    <option value="3">3-star</option>
    <option value="2">2-star</option>
    <option value="1">1-star</option>
  </select></div>`;
}

// event handlers
//when a new bookmark is submitted, retrieves the user's data and creates an object for the bookmark
export function handleSubmitBookmark() {
  $('.add-new').on('submit', '.submit-button', (e) => {
    e.preventDefault();
    const url = $('#url').val();
    const title = $('#title').val();
    const description = $('#description').val();
    const rating = $('input [type="radio"]').val();
    const bookmark= { url, title, description, rating };
    

    api
      .createNewBookmark(bookmark)
      .then((bookmark) => {
        store.setAddedBookmark(bookmark);
        render();
        console.log(bookmark);
      })
      .catch((err) => {
        console.log(err);
        store.setError(err.message);
        render();
      });
  });
}


// helper for delete --retrieves the id of the item
function getIdFromEl(item) {
  return $(item).closest('.bookmark-element').data('item-id');
}

function handleDeleteBookmark() {
  $('.bookmark-element').on('click', '.delete-bookmark', (e) => {
    const id = getIdFromEl(e.currentTarget);
    api
      .deleteBookmark(id)
      .then(() => {
        store.setDeleteBookmark(id);
        render();
      })
      .catch((err) => {
        console.log(err);
        store.setError(err.message);
        render();
      });
  });
}



// function handleRating(){
//   $('input [type="radio"]').on('click', function(){
//     const ratingValue = $('input[name="star"]:checked').val();
//   })}

function bindEventListeners() {
  handleSubmitBookmark();
  handleDeleteBookmark();
}
//dynamically add content 
function render() {
  let html = '';
  html += generateBookmarkList();
  $('.bookmarks').append(html);
}

function start() {
  bindEventListeners();
  api
    .fetchAllBookmarks()
    .then((bookmarks) => {
      store.setAllBookmarks(bookmarks);
    render();
    })
    .catch((err) => {
      console.log(err);
      store.setError(err.message);
      render();
    });
}


function main() {
  render();
  start();
  let form ='';
  form += generateForm();
  $('.main').html(form);
}

$(main());
