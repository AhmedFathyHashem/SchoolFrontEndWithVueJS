<template>
<div class="d-flex align-items-center justify-content-center container mt-3 row">
    <h1 class="d-flex align-items-center justify-content-center">Add Lesson</h1>
    <form class="col-4" @click.prevent>
        <div class="mb-3 mt-3">
            <label for="name" class="form-label">name:</label>
            <input type="text" class="form-control" id="name" placeholder="Enter Name" name="name" v-model="state.name" />
            <span class="error-feedback" v-if="v$.name.$error">{{
          v$.name.$errors[0].$  
        }}</span>
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">description:</label>
            <input type="description" class="form-control" id="description" placeholder="Enter description" name="description" v-model="state.description" />
            <span class="error-feedback" v-if="v$.description.$error">{{
          v$.description.$errors[0].$message
        }}</span>
        </div>
        <button type="submit" @click="AddLess()" class="btn btn-primary">
            Add
        </button>
    </form>
    <div>
        <h1 style="color: red">
            {{ AddError }}
        </h1>
    </div>
</div>
</template>

<script>
import {
    reactive,
    computed
} from "vue";
import {
    required
} from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
import axios from "axios";
export default {
    name: "CreateLesson",
    setup() {
        const state = reactive({
            name: "",
            description: "",
        });
        const Rules = computed(() => {
            return {
              name: {
                    required
                },
                description: {
                    required
                },
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
      AddError: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("UserDate");
    if (user) {
      this.redirectTo({ val: "Student" });
    }
  },
  methods: {
    async AddLess() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.post(
          "https://localhost:7037/api/Lessons/CreateLesson",
          {
            name: this.state.name,
            description: this.state.description,
          }
        );
        if (result.status == 200) {
          this.$router.push({name:"Student"});
        } else {
          this.AddError = "Invalid inputs";
        }
      } else {
        console.log("failed");
      }
    },
  },
}
</script>

<style>

</style>
