<template>
<form class="mb-3 mt-3" @click.prevent>
    <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto d-block">
            <h1>Are you sure to delete this lesson!</h1>
            <label for="UserName" class="form-label">Name:</label>
            {{ name }}<br />
            <label for="password" class="form-label">Description:</label>
            {{ description }}<br />
        </div>
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
</form>
</template>

<script>
import axios from 'axios';
export default {
    name: "DeleteLesson",
    data() {
        return {
            name: "",
            description: "",
            Id: "",
            LessonData: "",
            message: ""
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
            }
        },
        async Delete() {
            let result = await axios.delete("https://localhost:7037/api/Lessons/" + this.$route.params.Id);
            if (result.status == 200) {
                this.$router.push({
                    name: "Student"
                });
            }
        },
        Edit() {
            this.$router.push({
                name: "EditLesson"
            })
        }
    }
}
</script>

<style>

    </style>
