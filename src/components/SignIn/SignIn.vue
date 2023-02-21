<template>
  <div
    class="d-flex align-items-center justify-content-center container mt-3 row"
  >
    <h1 class="d-flex align-items-center justify-content-center">Sign In</h1>
    <form class="col-4" @click.prevent>
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
        <span class="error-feedback" v-if="v$.UserName.$error">{{
          v$.Password.$errors[0].$message
        }}</span>
      </div>
      <button type="submit" @click="SignInClick()" class="btn btn-primary">
        Sign In
      </button>
      &nbsp;&nbsp;&nbsp;
      <button
        type="button"
        @click="redirectTo({ val: 'SignUp' })"
        class="btn btn-primary"
      >
        Sign Up
      </button>
    </form>
    <div>
      <h1 style="color: red">
        {{ SignInError }}
      </h1>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { reactive, computed } from "vue";
import { required } from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
import axios from "axios";
export default {
  name: "SignInForm",
  setup() {
    const state = reactive({
      UserName: "",
      Password: "",
    });
    const Rules = computed(() => {
      return {
        UserName: { required },
        Password: { required },
      };
    });
    const v$ = useValidate(Rules, state);
    return {
      state,
      v$,
    };
  },
  data() {
    return {
      SignInError: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("UserDate");
    if (user) {
      this.redirectTo({ val: "Student" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async SignInClick() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.post(
          "https://localhost:7037/api/Auth/signin",
          {
            UserName: this.state.UserName,
            Password: this.state.Password,
          }
        );
        if (result.status == 200) {
          localStorage.setItem("UserDate", JSON.stringify(result.data));
          this.$router.push({name:"Student"});
        } else {
          this.SignInError = "UserName or password not correct!";
        }
      } else {
        console.log("failed");
      }
    },
  },
};
</script>

<style>
.error-feedback {
  color: red;
  font-size: 0.85;
}
</style>
