import { defineStore } from 'pinia';
import ISelectOption
 from '../interfaces/select-option';

const useSubjectStore = defineStore('filter', {
  state: () => ({ subjects: [] }),
  getters: {
    subjectOptions(): ISelectOption[] {
      // const periodStore = usePeriodStore();
      // return periodStore.periods.map((item: IPeriod) => ({ label: item.name, value: item.id }));
      return []
    },
  },
  actions: {
  },
});

export default useSubjectStore;