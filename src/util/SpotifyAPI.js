require('dotenv').config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
let token = "";

export const SpotifyAPI = {
  search: (keywords) => {
  return fetch(`https://api.spotify.com/v1/search?q=${keywords}&type=track`,
    {
      headers: {"Authorization": `Bearer ${token}`}
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
            trackID: track.id,
            trackURI: track.uri
          };
        });
      } else {
        const str = JSON.stringify(jsonResponse, null, 4); // (Optional) beautiful indented output.
        console.log('Response:' + str);
        return [];
      }
    });
  },
  savePlaylist: (playlistName, playlist) => {
    const uriArray = playlist.map(track => {
      return `spotify:track:${track.trackURI}`;
    })
    fetch('https://api.spotify.com/v1/me',
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    ).then(response => {
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse.id;
    }).then(user_id => {
      fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          "name": `${playlistName}`})
        }
    )}).then(response => {
      console.log('server response :', response);
      console.log('another', JSON.parse(response.body).data);
      return response.json();
    }).then(jsonResponse => {
        return jsonResponse.id;
    }).then((playlist_id) => {
      fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify({uriArray})
      })
    });
  },
  getToken: () => {
    if(token){
      return token;
    } else if(window.location.href.match(/access_token=([^&]*)/)){
      token = window.location.href.match(/access_token=([^&]*)/)[0].split('=')[1];
      let expiration = window.location.href.match(/expires_in=([^&]*)/)[0].split('=')[1];
      //setTimeout(()=>{ token = ""}, expiration * 1000);
      console.log('experation:' + expiration, token);
      window.setTimeout(() => token = '', expiration * 1000);
      window.history.pushState('Access Token', null, '/');
      return token;
    } else {
      window.location='https://accounts.spotify.com/authorize?client_id=9afbcab757f54c6db8ba42e6d8e8a88e&response_type=token&scope=playlist-modify-public&redirect_uri=http://localhost:3000/';
    }
  }
}
