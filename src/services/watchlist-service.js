const watchlistService = {
    load: function (id) {
      return fetch(`http://localhost:9999/api/watchlist${id? `?author=${id}`: ''}`).then(res => res.json());
    },
    createWatchlist: function(data){
      return fetch(`http://localhost:9999/api/watchlist`, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      }).then(res => res.text());
    },
    updateWatchlist: function(data,id){
      return fetch(`http://localhost:9999/api/watchlist/${id}`,{
        body: JSON.stringify(data),
        method: 'PUT',
        headers:{
          'Content-type': 'application/json'
        },
        credentials: 'include'
      }).then(res => res.json());
    }
  };
  
  export default watchlistService;