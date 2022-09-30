var app = new Vue({
    el: "#app",
    data: {
      username:"",
      arrayData:[],
      password:"",
      userCredentials:[],
      error:false,
      error2:false,
      image:"https://i.ibb.co/vd1kyxW/pngwing-com-1.png",
      logi:'2',
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
              this.logi='2';
              this.image='https://i.ibb.co/vd1kyxW/pngwing-com-1.png';
            },
             updateLocalStorage(){
              localStorage.setItem(
                "data",
                JSON.stringify(this.arrayData)
              )
             },
             login() {
              this.getError();
              if (this.error == true || this.error2 == true) {
              } else {
              }
            },
            validateCredentials(user, key) {
             
              this.login();
              let loguedUser = [];
              let res = this.arrayData.filter(
                (usr) => usr.login.username === user && usr.login.password === key
              );
              loguedUser = [...res];
              console.log(loguedUser)
              console.log(loguedUser[0].picture.large)
              this.logi = '1'
              this.image = loguedUser[0].picture.large
              this.name = loguedUser[0].name.first + loguedUser[0].name.last
              if(loguedUser.length === 0){
                this.message(
                  "Oops",
                  2200,
                  "center",
                  "Verifique que los datos sean correctos",
                  "error"
                );
                }else{
                  this.message(
                    "¡Enhorabuena!",
                    2200,
                    "center",
                    "Ingreso exitoso",
                    "success"
                  ) ;
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
      this.consumir();
    },
  });