const html =/*HTML*/
`
<div>
  <h2>What you can get from the match object</h2>
  <p>Match object, stringified into a string</p>
  <p id="p-match"></p>
</div>
`

function runJavaScript(match) {
  document.getElementById("p-match").innerHTML = `<pre>${JSON.stringify(match, null, 2)}</pre>`
}

export function initAndGetPage(...rest) {
  const [contentId,match] = rest
  const content = document.getElementById(contentId)
  content.innerHTML = html;
  runJavaScript(match)
}