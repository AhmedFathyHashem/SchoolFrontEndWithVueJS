<template>
<NavBar v-if="!user" />

<StudentList />
</template>

<script>
import NavBar from '../components/Header/NavBar.vue';
import StudentList from '../components/Student/StudentList.vue';
export default {
    name: "Student",
    components: {
      StudentList,
        NavBar,
    }
}
</script>

<style>

</style>
