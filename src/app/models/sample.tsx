export default class Sample {
  id: string
  title: string
  artist: string
  year: string
  imgUrl: string

  constructor(id: string, title: string, artist: string, year: string, imgUrl: string) {
    this.id = id
    this.title = title
    this.artist = artist
    this.year = year
    this.imgUrl = imgUrl
  }
}