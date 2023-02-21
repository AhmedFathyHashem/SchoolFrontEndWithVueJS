<template>
  <div
    class="d-flex align-items-center justify-content-center container mt-3 row"
  >
    <h1 class="d-flex align-items-center justify-content-center">Sign Up</h1>
    <form class="col-4" @click.prevent>
      <div>
        <label for="FirstName" class="form-label">First Name:</label>
        <input
          type="text"
          class="form-control"
          id="FirstName"
          placeholder="Enter First Name"
          name="FirstName"
          v-model="state.FirstName"
        />
        <span class="error-feedback" v-if="v$.FirstName.$error">{{
          v$.FirstName.$errors[0].$message
        }}</span>
      </div>

      <div class="mb-3 mt-3">
        <label for="LastName" class="form-label">Last Name:</label>
        <input
          type="text"
          class="form-control"
          id="LastName"
          placeholder="Enter Last Name"
          name="LastName"
          v-model="state.LastName"
        />
        <span class="error-feedback" v-if="v$.LastName.$error">{{
          v$.LastName.$errors[0].$message
        }}</span>
      </div>

      <div class="mb-3 mt-3">
        <label for="UserName" class="form-label">User Name:</label>
        <input
          type="text"
          class="form-control"
          id="UserName"
          placeholder="Enter User Name"
          name="UserName"
          v-model="state.UserName"
        />
        <span class="error-feedback" v-if="v$.UserName.$error">{{
          v$.UserName.$errors[0].$message
        }}</span>
      </div>
      <div class="mb-3 mt-3">
        <label for="email" class="form-label">Email:</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="Enter email"
          name="email"
          v-model="state.Email"
        />
        <span class="error-feedback" v-if="v$.Email.$error">{{
          v$.Email.$errors[0].$message
        }}</span>
      </div>
      <div class="mb-3 mt-3">
        <label for="UserCategory" class="form-label">User Category:</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="state.UserCategory"
          placeholder="PLease Select User Catogery"
        >
          <option value="0">Student</option>
          <option value="1">Teacher</option>
        </select>
        <span class="error-feedback" v-if="v$.UserCategory.$error">{{
          v$.UserCategory.$errors[0].$message
        }}</span>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Enter password"
          name="password"
          v-model="state.Password"
        />
        <span class="error-feedback" v-if="v$.Password.$error">{{
          v$.Password.$errors[0].$message
        }}</span>
      </div>

      <button type="submit" @click="SignUpClick()" class="btn btn-primary">
        Sign Up
      </button>
      &nbsp;&nbsp;&nbsp;
      <button
        type="button"
        @click="redirectTo({ val: 'SignIn' })"
        class="btn btn-primary"
      >
        Sign In
      </button>
    </form>
  </div>
</template>
<script>
import _default, { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";
export default {
  name: "SignUpForm",
  setup() {
    const state = reactive({
      FirstName: "",
      LastName: "",
      UserName: "",
      Email: "",
      UserCategory: "",
      Password: "",
    });
    const rules = computed(() => {
      return {
        FirstName: { required },
        LastName: { required },
        UserName: { required },
        Email: { required, email },
        Password: { required },
        UserCategory: { required },
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
    };
  },
  mounted(){
    let user = localStorage.getItem("UserDate");
    if(user){
      this.$router.push({name:"Student"});
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async SignUpClick() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios
          .post("https://localhost:7037/api/Auth/register", {
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            UserName: this.state.UserName,
            Email: this.state.Email,
            Password: this.state.Password,
            UserType: this.state.UserCategory,
          });
        if (result.status == 200) {
          localStorage.setItem("UserDate",JSON.stringify(result.data));
          this.redirectTo({ val: 'home' });
        } else if(result.status == 400){
          console.log(JSON.stringify(result.data));
        }
      } else {
        console.log("failed");
      }
    },
  },
  components: { _default },
};
</script>

<style>
.error-feedback {
  color: red;
  font-size: 0.85;
}
</style>
