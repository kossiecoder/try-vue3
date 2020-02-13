import { ref } from 'vue';
export const useDetailCard = () => {
    const selected = ref(null);
  
      const openDetails = (selectedToDo) => {
        selected.value = selectedToDo;
      };
  
      const closeDetails = () => {
        selected.value = null;
      };
  
      const resetSelected = (createdAt) => {
        if (selected.value && createdAt === selected.value.createdAt) {
          selected.value = null;
        }
      };
  
      return {
        selected,
        openDetails,
        closeDetails,
        resetSelected
      }
  };