export default class AlbumAppearance {
  id: string;
  title: string;
  artist: string;

  constructor(id: string, title: string, artist: string) {
    this.id = id;
    this.title = title;
    this.artist = artist;
  }
}
