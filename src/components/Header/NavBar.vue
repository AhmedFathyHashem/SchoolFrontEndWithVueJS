<template>
    <header class="bg-light container fixed-top" style="margin-bottom: 10%;">
        <nav class="navbar navbar-expand-sm bg-light justify-content-center">
          <div class="container-fluid ">
            <ul class="navbar-nav ">
              <li class="nav-item">
                <router-link class="nav-link active" to="/SignIn">Sign In</router-link>
              </li>
              <li>
                <router-link class="nav-link active" to="/SignUp">Sign Up</router-link>
              </li>
            </ul>
          </div>
          <p class="info">
            Welcome {{ UserName }}
          </p>
          <br/>
          <br/>
          <br/>
          <button
        type="button"
        @click="LogOutClick()"
        class="btn btn-primary"
      >
        LogOut
      </button>

        </nav>
        
      </header>
</template>

<script>
export default {
name:"NavBar",
methods:{
    LogOutClick(){
        localStorage.clear();
        this.$router.push({name:"SignIn"});
    }
},
data() {
    return {
      UserName: "",
    };
  },
mounted(){
    let user = localStorage.getItem("UserDate");
    this.UserName = JSON.parse(user).username;
},
}
</script>

<style>

</style>