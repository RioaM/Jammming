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
        return jsonResponse.tracks.items.map(track => {
          const artists = track.artists.map(artist => {
            r eturn artist.name;
          }).join(', ');
          return {
            trackName: track.name,
            artists: artists,
            album: track.album.name,
            trackID: track.id,
            trackURI: track.uri
          };
        });
      });
    },
    savePlaylist: (playlistName, playlist) => {
      const uriArray = playlist.map(track => {
        return `${track.trackURI}`;
      })
      fetch('https://api.spotify.com/v1/me',
      {
        headers: { "Authorization": `Bearer ${token}`},
      }
    ).then(response => {
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse.id;
    }).then(user_id => {
      return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify({"name": `${playlistName}`})
        }
      )}).then(response => {
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
            body: JSON.stringify({uris: uriArray})
          }
        )
      });
    },
    getToken: () => {
      if(token){
        return token;
      } else if(window.location.href.match(/access_token=([^&]*)/)){
          token = window.location.href.match(/access_token=([^&]*)/)[0].split('=')[1];
          let expiration = window.location.href.match(/expires_in=([^&]*)/)[0].split('=')[1];
          window.setTimeout(() => token = '', expiration * 1000);
          window.history.pushState('Access Token', null, '/');
          return token;
      } else {
          window.location='https://accounts.spotify.com/authorize?client_id=9afbcab757f54c6db8ba42e6d8e8a88e&response_type=token&scope=playlist-modify-public&redirect_uri=http://localhost:3000/';
      }
    }
  }
