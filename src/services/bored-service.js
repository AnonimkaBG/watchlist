const boredService={
    load:function(){
        return fetch(`https://www.boredapi.com/api/activity`).then(res=>res.json());
    }
}
export default boredService;