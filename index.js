console.log("Hello, get ready to Teleport! 👍😎👍")

// When big ol' button is clicked, fetch urban areas from Teleport.
// Add event listener to button
// Write function to fetch urban areas
// Display them

// Let the user see details of each urban area
// Add a "Details" button or link next to each urban area
// When one is clicked, fetch details and display them

const getUrbanAreas = function() {
  const urbanAreas = []
  fetch("https://api.teleport.org/api/urban_areas/")
  .then(response => response.json())
  .then(data => {
    data["_links"]["ua:item"].forEach(element => {
      const ua = document.createElement("li")
      ua.innerText = element.name
      ua.className = "urban-area"
      let slug = element.href.split("/")[5].slice(5)
      ua.id = slug
      ua.addEventListener("click", handleUrbanAreaClick)
      document.querySelector("#urban-areas").appendChild(ua)
    })
    return urbanAreas
  })
}

document.querySelector("#teleport").addEventListener("click", getUrbanAreas)

const handleUrbanAreaClick = function(event) {
  const name = document.querySelector("#name")
  const internet = document.querySelector("#internet")
  const water = document.querySelector("#water")
  const taxi = document.querySelector("#taxi")
  const guns = document.querySelector("#guns")
  name.innerText = event.srcElement.innerText
  const slug = event.target.id
  console.log(`Urban area ${slug} has been clicked!`)
  fetch(`https://api.teleport.org/api/urban_areas/slug%3A${slug}/details/`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    internet.innerText = "populated in function"
    water.innerText = "populated in function"
    taxi.innerText = "populated in function"
    guns.innerText = "populated in function"
  })
}
