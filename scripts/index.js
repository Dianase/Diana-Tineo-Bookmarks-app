//The bookmark app allows users to pin their favorite website to the app by [INPUT URL], 
//adding a brief [DESCRIPTION] of the pinned website, giving it [TITLE] and a [1-5 RATING].

//when the app first load it will display saved bookmarks and the form for adding new bookmarks
//Form >>[INPUT URL], [TITLE], [DESCRIPTION], [SAVE]

/*Display form information--bookmark
[INPUT URL], --use id to retrieve val $('#url').val();
[TITLE] --use id to retrieve val $('#title').val();
[DESCRIPTION] --use id to retrieve val $('#description').val();
*/
import STORE from './store'
import $ from 'jquery'

//doc-ready callback
$(submitBookmark);

function submitBookmark() {
  $('form').submit(function (e) {
    e.preventDefault();
    renderBookmark();
  })
}

function renderBookmark() {
  let url = $('#url').val();
  let title = $('#title').val();
  let description = $('#description').val();

  let bookmarkInfo = { url: url, title: title, description: description };

  STORE.push(bookmarkInfo);

  console.log(STORE);

  for(let i=0; i < STORE.length; i++){

    $('.bookmark-holder').append(`<li>${url} ${title} ${description}</li>`);

  }
  

}






