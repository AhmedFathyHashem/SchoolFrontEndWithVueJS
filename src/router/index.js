import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";
import Student from "../views/Student.vue";
import CreateLesson from "../components/Student/CreateLesson.vue";
import LessonDetails from "../components/Student/LessonDetails.vue";
import DeleteLesson from "../components/Student/DeleteLesson.vue";
import EditLesson from "../components/Student/EditLesson.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "SignUp",
      component: SignUp,
    },
    {
      path: "/SignIn",
      name: "SignIn",
      component: SignIn,
    },
    {
      path: "/Student",
      name: "Student",
      component: Student,
    },
    {
      path:"/CreateLesson",
      name:"CreateLesson",
      component:CreateLesson
    },
    {
      path:"/LessonDetails/:Id",
      name:"LessonDetails",
      component:LessonDetails
    },
    {
      path:"/DeleteLesson/:Id",
      name:"DeleteLesson",
      component:DeleteLesson
    },
    {
      path:"/EditLesson/:Id",
      name:"EditLesson",
      component:EditLesson
    }
  ]
});

export default router;
