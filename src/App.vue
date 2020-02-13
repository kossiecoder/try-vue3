<template>
  <div class="container">
    <h1 class="text-center mb-3">List</h1>
    <div class="row">
      <div :class="selected ? 'col-8' : 'col-12'">
        <input
          class="w-100 p-2 mb-4"
          type="text"
          placeholder="Search.."
          v-model="search"
          @keypress.enter="searchToDo"
        />
        <div>
          <p v-if="checkIfAlreadyExists" class="alert alert-danger">'{{ text }}'는 이미 존재합니다</p>
          <div class="border d-flex">
            <input
              v-model="text"
              class="w-100 border-0 py-2 pl-3"
              type="text"
              placeholder="+ Add a Task"
              @keypress.enter="addToDo"
            />
          </div>
          <div
            class="border d-flex align-items-center"
            v-for="toDo in filteredList"
            :key="toDo.createdAt"
          >
            <input class="mx-3" type="checkbox" v-model="toDo.done" />
            <div
              class="w-100 border-0 p-2"
              style="cursor: pointer;"
              :class="toDo.done ? 'task-completed' : ''"
              @click="openDetails(toDo)"
            >{{ toDo.text }}</div>
            <button class="btn btn-danger btn-sm mr-1" @click="deleteToDoAndResetSelected(toDo.createdAt)">Delete</button>
          </div>
        </div>
      </div>
      <div
        v-if="selected"
        class="border"
        :class="selected ? 'col-4' : 'd-none'"
        style="height: 200px"
      >
        <div class="d-flex align-items-center py-2">
          <span class="flex-grow-1 font-weight-bold">Todo Details</span>
          <button class="btn" @click="closeDetails">X</button>
        </div>
        <div class="d-flex align-items-center">
          <input class="mx-3" type="checkbox" v-model="selected.done" />
          <input
            type="text"
            class="border-0"
            :class="selected.done ? 'task-completed' : ''"
            v-model="selected.text"
          />
        </div>
        <hr />
        <div class="d-flex flex-column align-items-end mb-3">
          <small>Created At: {{ new Date(selected.createdAt).toDateString() }} {{ new Date(selected.createdAt).toLocaleTimeString() }}</small>
        </div>
        <div class="d-flex">
          <div class="flex-grow-1"></div>
          <button class="btn btn-danger" @click="deleteToDoAndResetSelected(selected.createdAt)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useDetailCard } from '@/compositions/detail-card';
import { useList } from '@/compositions/list';

export default {
  setup() {
    const { text, search, filteredList, checkIfAlreadyExists, addToDo, toDoList, deleteToDo} = useList();

    const { selected, openDetails, closeDetails, resetSelected } = useDetailCard();
    
    const deleteToDoAndResetSelected = (createdAt) => {
      deleteToDo(createdAt);

      resetSelected(createdAt);
    }

    return {
      text,
      search,
      toDoList,
      selected,
      filteredList,
      checkIfAlreadyExists,
      addToDo,
      openDetails,
      closeDetails,
      deleteToDoAndResetSelected
    }
  }
  // data() {
  //   return {
  //     text: "",
  //     search: "",
  //     toDoList: [],
  //     selected: null
  //   };
  // },

  // computed: {
  //   checkIfAlreadyExists() {
  //     return this.toDoList.some(toDo => toDo.text.trim() === this.text.trim());
  //   },

  //   filteredList() {
  //     return this.toDoList.filter(toDo => toDo.text.includes(this.search));
  //   }
  // },

  // methods: {
  //   addToDo() {
  //     if (!this.checkIfAlreadyExists) {
  //       this.toDoList.push({
  //         createdAt: new Date().getTime(),
  //         done: false,
  //         text: this.text
  //       });
  //       this.text = "";
  //     }
  //   },

  //   deleteToDo(createdAt) {
  //     const index = this.toDoList.findIndex(
  //       toDo => toDo.createdAt === createdAt
  //     );

  //     this.toDoList.splice(index, 1);

  //     if (createdAt === this.selected.createdAt) {
  //       this.selected = null;
  //     }
  //   },

  //   openDetails(selectedToDo) {
  //     this.selected = selectedToDo;
  //   },

  //   closeDetails() {
  //     this.selected = null;
  //   }
  // }
};
</script>

<style scoped>
.task-completed {
  text-decoration: line-through;
  color: gray;
}
</style>
