import { defineStore } from 'pinia';
import requests from '@/api/http-client';
import * as ISubject from '@/interfaces/subject';

const useSubjectStore = defineStore('subject', {
  state: () => ({
    subject: {} as ISubject,
    subjects: [] as ISubject[],
    users: [] as string[]
  }),

  actions: {
    async fetchSubjects() {
      this.subjects = await requests.post('/SearchSubjects/');
    },
    async fetchListUsers() {
      const result = await requests.post('/ListUsers', {});
      this.users = result.ListUsersResult;
      await this.fetchListSubjects()
    },
    async fetchListSubjects() {
      let subjects:ISubject[]  = []
      await Promise.all(this.users.map(async (user)=> {
        const result = await requests.post('/GetSubjectInfo', {SubjectCode: user});
        subjects.push(result.GetSubjectInfoResult);
      }))
      this.subjects = subjects;
    },
    async fetchSubjectInfo(SubjectCode: string) {
      const result = await requests.post('/GetSubjectInfo', {SubjectCode});
      this.subject = result.GetSubjectInfoResult;
    },
  },
});

export default useSubjectStore;