const movieService = {
    load: function (id) {
      return fetch(`http://localhost:9999/api/movie${id? `?author=${id}`: ''}`).then(res => res.json());
    },
    loadOne:function (id) {
      
      return fetch(`http://localhost:9999/api/movie/${id}`).then(res => res.json());
    },
    createMovie: function(data){
      return fetch(`http://localhost:9999/api/movie`, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      }).then(res => res.text());
    }
  };
  
  export default movieService;