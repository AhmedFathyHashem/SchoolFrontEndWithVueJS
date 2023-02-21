<template>
<div class="d-flex align-items-center justify-content-center container mt-3 row">
    <h1 class="d-flex align-items-center justify-content-center">Please insert the modified fields</h1>
    <form class="col-4" @click.prevent>
        <div class="mb-3 mt-3">
            <label for="name" class="form-label">name:</label>
            <input type="text" class="form-control" id="name" placeholder="Enter Name" name="name" v-model="name" />
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">description:</label>
            <input type="description" class="form-control" id="description"  name="description" v-model="description"  />
        </div>
        <button type="submit" @click="Edit()" class="btn btn-warning">
            Edit
        </button>
        &nbsp;&nbsp;&nbsp;
        <button type="submit" @click="Delete()" class="btn btn-danger">
            Delete
        </button>
        &nbsp;&nbsp;&nbsp;
        <button type="button" @click="GoBack()" class="btn btn-info">
            Go Back
        </button>
        <div>
            <h1 style="color: red">
                {{ AddError }}
            </h1>
        </div>
    </form>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: "EditLesson",
    data() {
        return {
            name: "",
            description: "",
            Id: "",
            AddError: ""
        }
    },
    mounted() {
        this.Id = this.$route.params.Id;
        this.GetData();
    },
    methods: {
        GoBack() {
            this.$router.push({
                name: "Student"
            });
        },
        async Edit() {
            let result = await axios.put("https://localhost:7037/api/Lessons/" + this.$route.params.Id,{
                name:this.name,
                description:this.description
            } );
            if (result.status == 200) {
                this.$router.push({
                    name: "Student"
                });
            } else {
                this.AddError = "Lesson didn't updated!";
            };
        },
        async GetData() {
            let result = await axios.get("https://localhost:7037/api/Lessons/" + this.$route.params.Id);
            if (result.status == 200) {
                this.LessonData = result.data;
                this.name = this.LessonData.name;
                this.description = this.LessonData.description;
            } else {
                this.$router.push({
                name: "Student"
            });
            };
        },
        Delete() {
            this.$router.push({
                name: "DeleteLesson"
            });
        },
    }
}
</script>

<style>

    </style>
