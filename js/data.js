var app = new Vue({
    el: "#app",
    data: {
      array:[],
      user:[],
      filter:[],
      photo:"",
      fullName:"",
      index:""
     
    },
    methods: {
      recibir(){
        this.array = JSON.parse(localStorage.getItem("data") || '[]')
        this.user = JSON.parse(localStorage.getItem("user") || '[]')
      },
      logedUser(){

      },

      deleteRegister(data, index) {
       
        
        Swal.fire({
            title: `¿Está seguro de eliminar a ${data.name.first} ${data.name.last}"?`,
            text: "¡Este proceso es irreversible!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "SI",
            cancelButtonText: "NO",
          }).then((result) => {
            if (result.isConfirmed) {
              this.array.splice(index,1);
              this.updateLocalStorage()
              this.message(
                "Se eliminó correctamente",
                3000,
                "center",
                "¡Este proceso es irreversible!"
              );
          }
        });
    },
    logout(){
      
          
      Swal.fire({
        title: `¿Está seguro de cerrar sesión?`,
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
      }).then((result) => {
        if (result.isConfirmed) {
          this.message(
            "Se ha cerrado su sesión correctamente",
            3000,
            "center",
            "Esperamos verlo pronto"
            
          );
          
          setTimeout(function() {location.href="../index.html"}, 2000);
          this.array.push(this.user[0])
          this.updateLocalStorage()
      }
    });
    },
    updateLocalStorage(){
      localStorage.setItem("data", JSON.stringify(this.array))
      localStorage.setItem("user", JSON.stringify(this.user))
     },
     message(msj,time,position,text){
      Swal.fire({
        position: position,
        text: text,
        icon: "success",
        title: msj,
        showConfirmButton: false,
        timer: time,
      });
  },  filterUser(){
      
      this.array = this.array.filter(usr => usr.login.username != this.user[0].login.username);

      console.log(this.filter)
  },
      
      mostrar(){
        this.photo=this.user[0].picture.thumbnail
        console.log(this.user)
        this.fullName = `${this.user[0].name.first} ${this.user[0].name.last}`
      },
      getIndex(evt) {
        this.index = evt.target.selectedIndex;
        },
        
    },
   
    computed: {},
    created(){
      
      this.recibir()
      this.mostrar()
      this.filterUser()
      
    },
  });