require('dotenv').config();

const clientId = process.env.SPOTIFY_CLIENT_ID;

export const SpotifyAPI = {
  search: (songName) => {
    return fetch(`https://api.spotify.com/v1/search?q=name:${songName}&type=track`,
    {headers: {Authorization: `Bearer ${clientId}`}
  }).then(response => {
    return response.json();
  }).then(jsonResponse => {
      if(jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => {
          const artists = track.artists.map(artist => {
            return artist.name;
          }).join(', ');
          return {
            songName: track.name,
            artists: artists,
            album: track.album.name
          };
        });
      } else {
        const str = JSON.stringify(jsonResponse, null, 4); // (Optional) beautiful indented output.
        console.log('Response:' + str);
        return [];
      }
    });
  },
  authorization: () => {
    fetch(`https://accounts.spotify.com/authorize/?client_id=9afbcab757f54c6db8ba42e6d8e8a88e&redirect_uri=http%3A%2F%2Flocalhost%3A300&scope=playlist-modify-private&response_type=token`, {mode: 'cors'}).then(response => {
      return response.json();
    }).then(jsonResponse => {
      const str = JSON.stringify(jsonResponse, null, 4); // (Optional) beautiful indented output.
      console.log('Response:' + str);
      return str;
    });
  }
}
