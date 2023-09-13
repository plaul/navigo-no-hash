const html = /*HTML*/`
<div>
  <h2>Navigate Programmatically</h2>
  <input id="route-to-navigate-to"><button id="btn-navigate">Goto route</button>
</div>
`
function runJavaScript() {
  document.querySelector("#route-to-navigate-to").value = ""
  document.querySelector("#btn-navigate").addEventListener("click", navigateToRoute)
}

export function initAndGetPage(...rest) {
  const [contentId] = rest
  const content = document.getElementById(contentId)
  content.innerHTML = html;
  runJavaScript()
}

function navigateToRoute() {
  const route = document.getElementById("route-to-navigate-to").value
  window.router.navigate(route)
}


