const URL = "https://jsonplaceholder.typicode.com/users/"
import { sanitizeStringWithTableRows } from "../utils.js"

const html = /*HTML*/`
<div>
  <h3>Get all users</h3> <button id="btn-reload" class="btn btn-sm btn-secondary">Reload</button>
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Street</th>
        <th>City</th>
        <th>&nbsp</th>
      </tr>
    </thead>
    <tbody id="tbl-body">
    </tbody>
  </table>
  <image src="../../images/Spin-1s-200px.gif" id="spinner" style="display: block;" />
</div>
`
let selectedUser = null
let usersFromServer = []

function runJavaScript() {
  document.querySelector("#tbl-body").addEventListener("click", showUserDetails)
  getAndRenderUsers()
}

export function initAndGetPage(content_id) {
  const contentId = content_id
  const content = document.getElementById(contentId)
  content.innerHTML = html;
  //usersFromServer=[]  //This will reload data, each time the pages is visited
  runJavaScript()
}

//Used to cache data from server

async function getAndRenderUsers() {
  try {
    document.querySelector("#spinner").style.display = "block"
    usersFromServer = usersFromServer.length>0 ? usersFromServer:  await fetch(URL).then(res => res.json())
    renderAllData(usersFromServer)
  }
  catch (err) {
    console.error("UPS: " + err) //This can be done better - do it
  }
  finally{
    document.querySelector("#spinner").style.display = "none"
  }
}

export async function getSelectedUser(id) {
  return selectedUser ? selectedUser : await fetch(URL + id).then(res => res.json())
}
async function setSelectedUser(id) {
  selectedUser = usersFromServer.find(user => user.id == id)
}

function renderAllData(data) {
  const tableRowsArray = data.map(user => `
  <tr>                                
    <td>${user.id} </td>              
    <td>${user.name} </td>                     
    <td>${user.address.street} </td>  
    <td>${user.address.city} </td>
    <td>
    <button id="row-btn_${user.id}" class="btn btn-sm btn-secondary">Details</button> </td>      
  </tr>`)
  const tableRowsString = tableRowsArray.join("\n")
  document.querySelector("#tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)
}

async function showUserDetails(evt) {
  const target = evt.target
  if (!target.id.startsWith("row-btn_")) {
    return
  }
  const id = target.id.replace("row-btn_", "")
  //So the findUser page can use the same data without fetching again
  //Often it will probably make more sense to reload again if this page only loaded a fraction of data
  //available for each user. If this is the case, findUser can load all details for only this user
  setSelectedUser(id)

  // @ts-ignore
  window.router.navigate("find-user?id=" + id)
}



/*
let template
export function initAndGetPage(...rest) {
  const [contentId] = rest
  if(template){
    document.getElementById(contentId).innerHTML = ""
    document.getElementById(contentId).append(...template)
    //getAndRenderUsers()
    return 
  }
  const content = document.getElementById(contentId)
  content.innerHTML = html;
  usersFromServer=[]
  runJavaScript()
  //template = Array.from(content.childNodes)
  template = Array.from(content.childNodes)
}
*/
