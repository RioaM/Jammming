require('dotenv').config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
let token = "";

export const SpotifyAPI = {
  search: (keywords) => {
  return fetch(`https://api.spotify.com/v1/search?q=${keywords}&type=track`,
    {headers: {'Authorization': `Bearer BQBa40HTqN_gCIhU1zIHubE54SfU7yGtJsdQ9S_ZOCqo8DRVgLIwPGTvkCvb7l77tUGCjCUiFs5ZiSwgecXYf_HMkeMc9VKzY0KK1myZl5SpNF8NWF5Z8_usi4qFZxy1Gg4sgzwyqgFflc7arfuawS6URTD4_OnOdFngpBIXGvzVxeuOYcA`}
  }).then(response => {
    return response.json();
  }).then(jsonResponse => {
      if(jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => {
          const artists = track.artists.map(artist => {
            return artist.name;
          }).join(', ');
          return {
            trackName: track.name,
            artists: artists,
            album: track.album.name,
            trackID: track.id
          };
        });
      } else {
        const str = JSON.stringify(jsonResponse, null, 4); // (Optional) beautiful indented output.
        console.log('Response:' + str);
        return [];
      }
    });
    /*return [
      {
        songName: 'Tiny Dancer',
        artists: 'Elton John',
        album: 'Madman Across The Water'
      },
      {
        songName: 'Tiny Dancer',
        artists: 'Tim McGraw',
        album: 'Love Story'
      },
      {
        songName: 'Tiny Dancer',
        artists: 'Rockabye Baby!',
        album: 'Lullaby Renditions of Elton John'
      }
    ]*/
  },
  getToken: () => {
    if(token){
      return token;
    } else if(window.location.href.match(/access_token=([^&]*)/)){
      token = window.location.href.match(/access_token=([^&]*)/)[0];
      let expiration = window.location.href.match(/expires_in=([^&]*)/)[0];
      //setTimeout(()=>{ token = ""}, expiration * 1000);
      console.log('experation:' + expiration);
      window.setTimeout(() => token = '', expiration * 1000);
      window.history.pushState('Access Token', null, '/');
      return token;
    } else {
      window.location='https://accounts.spotify.com/authorize?client_id=9afbcab757f54c6db8ba42e6d8e8a88e&response_type=token&scope=playlist-modify-public&redirect_uri=http://localhost:3000/';
    }
  }
}
