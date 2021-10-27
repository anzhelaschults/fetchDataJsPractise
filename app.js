/**
 * https://jsonplaceholder.typicode.com/photos

 1) Fetch albums
 2) Render albums
 3) Outcome after clicking Album
 4) Fetch Photo URL
 5) Render Photo URL
 */

const albums = document.querySelector('#album')
const photos = document.querySelector('#photo')

let albumList = []
let photoList = []

/**
 * we asynchronously request data
 * @returns {Promise<void>}
 */

const fetchAlbums = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos')
    albumList = await response.json()

  } catch (e) {
    console.log(e.message)
  } finally {
    /// ?
    renderAlbums()
  }
}

/**
 * we show *output in the browser
 */

const renderAlbums = () => {
  albumList.forEach((album) => {
    const albumEle = document.createElement('div')
   albumEle.className = 'list-group-item p-3'
    if (album.albumId) {
      albumEle.classList.add ('list-group-item-primary')
    }

    console.log(album)
    albumEle.textContent = album.title

    albumEle.addEventListener('click', () => {
      getPhotos(album.url)

      // highlight the mouseenter target https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event
      event.target.style.color = "purple"
    })

    albums.append(albumEle)
  })
}


const getPhotos = (albumId) => {
  fetchPhoto(albumId)
}
const fetchPhoto = async (albumId) => {
  try {
    const response = await fetch (
        "https://jsonplaceholder.typicode.com/photos/?url=" + albumId
    )
    console.log('resp', response)
    const data = await response.json()
    console.log(data)
    photoList = data
  } catch (e) {
    console.log(e.message)
  } finally {
    renderPhotos()
  }
}

const renderPhotos = () => {
  photo.innerHTML =''
  photoList.forEach(photo => {
    const photoEle = document.createElement('img')
    photoEle.className = 'list-group-item p-3'
    if (photo.thumbnailUrl) {
      photoEle.classList.add ('list-group-item-primary')
    }
    photoEle.src = photo.thumbnailUrl
    photos.append(photoEle)
  })
}
const main = () => {
  fetchAlbums();

}
main ()

