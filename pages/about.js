
const html =/*HTML*/`
  <h2>About</h2>
  <p>How to create an almost <em>Single Page Application</em> using the vanilla JS Router 
  <a href="https://github.com/krasimir/navigo/blob/master/DOCUMENTATION.md">Navigo</a> + JavaScript Modules
  <p> Getting Started example with the Navigo Router, supplemented with a suggestion for how to modularize your 
HTML + JavaScript pages into a single JavaScript-module, pr "view" </p>
<p>Also, provides an example on how to share data between JavaScript Modules</p>

  <p>See <a href="https://getbootstrap.com/docs/5.0/components/navbar/" target="_blank">here</a> for details about the
    responsive Bootstrap navbar used in this example</p>
`
export function initAndGetPage(...rest) {
  const [contentId] = rest
  const content = document.getElementById(contentId)
  content.innerHTML = html;
}