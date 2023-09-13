import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js"

import { setActiveLink} from "./utils.js"

import { initAndGetPage as navigatePage } from "./pages/navigate.js"
import { initAndGetPage as showMatchObject } from "./pages/match.js"
import { initAndGetPage as allUsersPage } from "./pages/users.js"
import { initAndGetPage  as findUser } from "./pages/findUser.js"
import { initAndGetPage as aboutPage } from "./pages/about.js"
import { initAndGetPage as notFound } from "./pages/notFound.js"


window.addEventListener("load", async () => {
  
  //const router = new Navigo("/", { hash: true });
  const router = new Navigo("/");
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  window.router = router

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on({
      //For very simple "templates", you can just insert your HTML directly like below
      "/": () => document.getElementById("content").innerHTML =
        `<h2>Home</h2>
      <p style='margin-top:2em'>
      This is the content of the Home Route <br/>
      Observe that since this is so simple  all HTML is added in the on-handler for the route. 
      and not in a separate file.
      </p>
     `,
      "/about": () => aboutPage("content"),
      "/users-navigate": () => allUsersPage("content"),
      "/find-user": (match) => findUser("content",match),
      "/navigate-programatically": (match) => navigatePage("content"),
      "/show-match": (match) => showMatchObject("content",match),
    })
    .notFound(() => {notFound("content")})
    .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' + errorObj);
}