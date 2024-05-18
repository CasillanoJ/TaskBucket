const GetCookie = (key)=>{
        let x = document.cookie.split(";");
        let value = ""
    for (let index = 0; index < x.length; index++) {
        const name = x[index].split("=")[0]
        if (name.trim() === key){
          value = x[index].split("=")[1]
          return value;
        }
        
      }
      
}