<template>
<div>
    <!-- <button class="btn btn-primary" type="button" @click="GetStudent()">Get List</button> -->
    <button class="btn btn-success" @click="AddLesson()" style="margin-top: 5%;">Create</button>
    <table class="table caption-top" v-if="ListOfLessons.length>0">
        <thead class="table-dark">
            <tr>
                <th scope="col">
                    Lesson Name
                </th>
                <th scope="col">
                    Lesson Description
                </th>
                <th scope="col">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(list , l) in ListOfLessons" :key="l">
                <td>
                    {{ list.name }}
                </td>
                <td>
                    {{ list.description }}
                </td>
                <td>

                    <button @click="DeleteLesson(list.id)" type="button" class="btn btn-danger">Delete</button>|
                    <button @click="EditLesson(list.id)" class="btn btn-warning">Edit</button>|
                    <button @click="LessonDetails(list.id)" type="button" class="btn btn-info">View</button>

                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "StudentList",
    data() {
        return {
            ListOfLessons: [],
        };
    },
    mounted() {
        let user = localStorage.getItem("UserDate");
        if (!user) {
            this.$router.push({
                name: "SignIn"
            });
        }
         this.GetStudent();
    },
    components: {

    },

    methods: {
        async GetStudent() {
            let result = await axios.get(
                "https://localhost:7037/api/Lessons/Lessons"
            );
            if (result.status == 200) {
                console.log(result.data);
                this.ListOfLessons = result.data;
            }
        },
        AddLesson() {
            this.$router.push({
                name: "CreateLesson"
            });
        },
        LessonDetails(id) {
            this.$router.push({
                name: "LessonDetails",
                params:{Id:id}
            });
        },
        DeleteLesson(id){
            this.$router.push({
                name:"DeleteLesson",
                params:{Id:id}
            });
        },
        EditLesson(id){
            this.$router.push({
                name:"EditLesson",
                params:{Id:id}
            })
        }
    },
};
</script>
