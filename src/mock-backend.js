let albums = [
    {
      "album_title": "Count Bateman",
      "avg_user_rating": 8.786,
      "band_name": "Frog",
      "genres": ["Indie Rock", "Acoustic"],
      "last_listened": 1609528990000,
      "release_date": "2019/08/16",
    },
    {
      "album_title": "Stay Positive",
      "avg_user_rating": 9.234,
      "band_name": "The Hold Steady",
      "genres": ["Rock", "Punk"],
      "last_listened": 1611766459503,
      "release_date": "2008/07/15",
    },
    {
      "album_title": "Courting Strong",
      "avg_user_rating": null,
      "band_name": "Martha",
      "genres": ["Punk", "Indie Rock"],
      "last_listened": 1610471530000,
      "release_date": "2014/05/26"
    },
    {
      "album_title": "Born Like This",
      "avg_user_rating": 7.983,
      "band_name": "MF Doom",
      "genres": ["Hip-hop", "Rap"],
      "last_listened": 1607951459000,
      "release_date": "2009/03/24"
    },
    {
      "album_title": "Giant Steps",
      "avg_user_rating": 8.444,
      "band_name": "John Coltrane",
      "genres": ["Jazz"],
      "last_listened": 1608786659000,
      "release_date": "1960/02/01"
    }
  ];

export function mockFetchHelper(
    isSuccess=true,
    timeoutValue=1000
) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isSuccess) {
                resolve(albums);
            } else {
                reject('Fetching data failed');
            }
        }, timeoutValue);
    });
}