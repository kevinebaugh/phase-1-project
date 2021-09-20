console.log("Hello, get ready to Teleport! 👍😎👍")

// When big ol' button is clicked, fetch urban areas from Teleport.
// Add event listener to button
// Write function to fetch urban areas
// Display them

// Let the user see details of each urban area
// Add a "Details" button or link next to each urban area
// When one is clicked, fetch details and display them

const getUrbanAreas = function() {
  document.querySelector("#teleport").style.display = "none"
  const urbanAreas = []
  fetch("https://api.teleport.org/api/urban_areas/")
  .then(response => response.json())
  .then(data => {
    data["_links"]["ua:item"].forEach(element => {
      const ua = document.createElement("div")
      ua.innerText = element.name
      ua.className = "urban-area"
      let slug = element.href.split("/")[5].slice(5)
      ua.id = slug
      ua.addEventListener("click", handleUrbanAreaClick)
      ua.addEventListener("dblclick", handleUrbanAreaDoubleClick)
      document.querySelector("#urban-areas").appendChild(ua)
    })
    return urbanAreas
  })
}

document.querySelector("#teleport").addEventListener("click", getUrbanAreas)

const showcase = document.querySelector("#showcase")

const handleUrbanAreaClick = function(event) {
  showcase.style.display = "inherit"
  const name = document.querySelector("#name")
  const taxi = document.querySelector("#taxi")
  const internetMeter = document.querySelector("#internet-meter")
  const waterMeter = document.querySelector("#water-meter")
  const gunsMeter = document.querySelector("#guns-meter")
  name.innerText = event.srcElement.innerText
  const slug = event.target.id

  fetch(`https://api.teleport.org/api/urban_areas/slug%3A${slug}/details/`)
  .then(response => response.json())
  .then(data => {
    const internetData = data.categories.find(e => e.id == "NETWORK").data.find(e => e.id == "NETWORK-DOWNLOAD-TELESCORE").float_value
    const waterData = data.categories.find(e => e.id == "POLLUTION").data.find(e => e.id == "DRINKING-WATER-QUALITY-TELESCORE").float_value
    const taxiData = data.categories.find(e => e.id == "COST-OF-LIVING").data.find(e => e.id == "COST-TAXI").currency_dollar_value.toFixed(2)
    const gunsData = data.categories.find(e => e.id == "SAFETY").data.find(e => e.id == "GUN-SCORE-TELESCORE").float_value
    internetMeter.value = internetData
    waterMeter.value = waterData
    gunsMeter.value = gunsData
    taxi.innerText = `$${taxiData}`
  })
}

const handleUrbanAreaDoubleClick = function(event) {
  const targetDiv = document.querySelector(`#${event.target.id}`)
  targetDiv.style.display = "none"
}
