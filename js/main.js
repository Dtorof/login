var app = new Vue({
  el: "#app",
  data: {
    username:"",
    arrayData:[],
    password:"",
    userCredentials:[],
    loguedUser:[],
    error:false,
    error2:false,
    image:"https://i.ibb.co/vd1kyxW/pngwing-com-1.png",
   
    name:"",
  },
  methods: {
      async consumir(){
          var url = "https://randomuser.me/api/?results=10";
          await fetch(url)
              .then((response) => response.json())
              .then((data) => (this.arrayData=data.results))
              this.updateLocalStorage();
              console.log(this.arrayData)
              
              
           },

           getError() {
            if (this.username == "") {
              this.error = true;
            } else {
              this.error = false;
            }
    
            if (this.password == "") {
                this.error2 = true;
              } else {
                this.error2 = false;
              }
          },
          logout(){
            
            this.image='https://i.ibb.co/vd1kyxW/pngwing-com-1.png';
          },
           updateLocalStorage(){
            localStorage.setItem("data", JSON.stringify(this.arrayData))
            localStorage.setItem("user", JSON.stringify(this.loguedUser))
           },
           login() {
            this.getError();
            if (this.error == true || this.error2 == true) {
            } else {
            }
          },
          validateCredentials(user, key) {
           let name =this.name;
            let password=this.password;
            let picture=this.image;
            this.login();
            let loguedUser = [];
            let res = this.arrayData.filter(
              (usr) => usr.login.username === user && usr.login.password === key
            );
            loguedUser = [...res];
            this.loguedUser = [...res]
            console.log(this.loguedUser)
           
        
            if(loguedUser.length === 0){
              this.message(
                "Oops",
                2200,
                "center",
                "Verifique que los datos sean correctos",
                "error"
              );
              }else{
                this.updateLocalStorage()
                this.message(
                  "¡Enhorabuena!",
                  2200,
                  "center",
                  "Ingreso exitoso",
                  "success"
                ) ;
               
               
                this.name = loguedUser[0].name.first + loguedUser[0].name.last
                setTimeout(function() {location.href="./views/data.html"}, 2000);
              }
              
           
              
    
                
                
          },
          message(title, timer, position, text, icon) {
            Swal.fire({
              position,
              text,
              icon,
              title,
              showConfirmButton: false,
              timer,
            });},
  },
  computed: {},
  created(){
    if(localStorage.getItem("data") !=null){
      this.arrayData = JSON.parse(localStorage.getItem("data"));
    }else{
      this.consumir();
    
    }
    
  },
});