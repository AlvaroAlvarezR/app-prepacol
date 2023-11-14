import { defineStore } from 'pinia';
import requests from '@/api/http-client';
import * as IGroup from '@/interfaces/group';

const useGroupStore = defineStore('group', {
  state: () => ({
    groups: [] as IGroup[],
  }),

  actions: {
    async fetchGroups() {
      const result = await requests.post('/ListGroups');
      this.groups = result.ListGroupsResult;
    },
  },
});

export default useGroupStore;
