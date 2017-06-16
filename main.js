/*
  Here is a guide for the steps you could take:
*/

// 1. First select and store the elements you'll be working with

// 2. Create your `onSubmit` event for getting the user's search term

// 3. Create your `fetch` request that is called after a submission

// 4. Create a way to append the fetch results to your page

// 5. Create a way to listen for a click that will play the song in the audio play
const searchForm = document.querySelector('.search-form')
const musicSearch = document.querySelector('#music-search')
const resultsSection = document.querySelector('.results')

searchForm.addEventListener('submit', function (event) {
  event.preventDefault()
  var search = musicSearch.value
  console.log(search)
  artistSearch(search)
})

function artistSearch (artist) {
  fetch(`https://api.soundcloud.com/users/?client_id=8538a1744a7fdaa59981232897501e04&q=${artist}`, {
  })
    .then(function (response) {
      return response.json()
    })

    .then(function (json) {
      console.log(json)

      while (resultsSection.hasChildNodes()) {
        resultsSection.removeChild(resultsSection.firstChild)
      }

      for (var i = 0; i < 6; i++) {
        let artistInfo = {}
        artistInfo.id = json[i].id
        artistInfo.name = json[i].username
        artistInfo.picture = json[i].avatar_url
        artistInfo.trackCount = json[i].track_count

        let artistHTML = `
          <div class="artist" id="${artistInfo.id}">
            <img src="${artistInfo.picture}" alt="Picture of artist" class="artist-pic">
            <h3 class="name">${artistInfo.name}</h3>
            <p class="track-count"># of Tracks Avail: ${artistInfo.trackCount}</p>
          </div>`

        resultsSection.insertAdjacentHTML('beforeend', artistHTML)
      }
    })

    .then(function () {
      const artistDiv = document.querySelectorAll('.artist')
      for (var i = 0; i < artistDiv.length; i++) {
        let artistID = artistDiv[i].id
        artistDiv[i].addEventListener('click', function () {
          console.log(artistID)
          pullTracks(artistID)
        })
      }
    })

  function pullTracks (artistName) {
    fetch(`https://api.soundcloud.com/users/${artistName}/tracks/?client_id=8538a1744a7fdaa59981232897501e04`)
        .then(function (response) {
          return response.json()
        })
        .then(function (json) {
          console.log(json)
        })
  }
    //   fetch(`https://api.soundcloud.com/tracks/?client_id=8538a1744a7fdaa59981232897501e04&q=${artistClicked}`, {
    //   })
    //     .then(function (response) {
    //       return response.json()
    //     })
    //     .then(function (json) {
    //       console.log(json)
    //     })
    // })
}
