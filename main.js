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
const audio = document.querySelector('.music-player')

function playTrack (currentTrackDiv) {
  console.log(currentTrackDiv.id)
  audio.src = `${currentTrackDiv.id}?client_id=8538a1744a7fdaa59981232897501e04`
}

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

    // .then(function () {
    //
    //   // for (var i = 0; i < trackDiv.length; i++) {
    //   //   // let trackID = trackDiv[i].id
    //   //   trackDiv[i].addEventListener('click', function () {
    //   //     console.log('clicked')
    //   //     // console.log(trackID)
    //   //   })
    //   // }
    // })

  function pullTracks (selectedName) {
    fetch(`https://api.soundcloud.com/users/${selectedName}/tracks/?client_id=8538a1744a7fdaa59981232897501e04&limit=100`)
        .then(function (response) {
          return response.json()
        })
        .then(function (json) {
          console.log(json)

          while (resultsSection.hasChildNodes()) {
            resultsSection.removeChild(resultsSection.firstChild)
          }

          if (json.length === 0) {
            console.log('failure')
            resultsSection.textContent = 'no tracks available'
          } else {
            console.log('success')
            for (var i = 0; i < json.length; i++) {
              let trackInfo = {}
              trackInfo.id = json[i].stream_url
              trackInfo.picture = json[i].artwork_url
              trackInfo.title = json[i].title

              let trackHTML = `

                <div class="track" id="${trackInfo.id}" onclick="playTrack(this)">
                  <img src="${trackInfo.picture}" alt="Album cover art" class="track-pic">
                  <h3 class="track-title">${trackInfo.title}</h3>
                </div>`

              resultsSection.insertAdjacentHTML('beforeend', trackHTML)
            }
          }
        })
  }
}
