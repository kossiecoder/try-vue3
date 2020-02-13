import { ref, computed } from 'vue';

export const useList = () => {
    const text = ref("");
      const search = ref("");
      const toDoList = ref([]);
  
      const filteredList = computed(() => {
        return toDoList.value.filter(toDo => toDo.text.includes(search.value))
      });
  
      const checkIfAlreadyExists = computed(() => {
        return toDoList.value.some(toDo => toDo.text.trim() === text.value.trim());
      });
  
      const addToDo = () => {
        if (!checkIfAlreadyExists.value) {
          toDoList.value.push({
            createdAt: new Date().getTime(),
            done: false,
            text: text.value
          });
          text.value = "";
        }
      };
  
      const deleteToDo = (createdAt) => {
        const index = toDoList.value.findIndex(
          toDo => toDo.createdAt === createdAt
        );
  
        toDoList.value.splice(index, 1);
  
        
      };
      return {
        text,
        search,
        toDoList,
        filteredList,
        checkIfAlreadyExists,
        addToDo,
        deleteToDo
      };
  };