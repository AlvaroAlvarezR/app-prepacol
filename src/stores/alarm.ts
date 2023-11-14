import { toRaw } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import requests from '@/api/http-client';

import useSubjectStore from './subject';
import * as IGetAlarmExtendedResult from '@/interfaces/alarm';
import * as ISubject from '@/interfaces/subject';


const useAlarmStore = defineStore('alarm', {

  state: () => ({ 
    alarms: [],
    lastAlarmId: null,
    lastAlarm: IGetAlarmExtendedResult,
    loaded: false,
  }),

  actions: {
    async fetchAlarms(dates: any[], group: string) {

      const date1 = Date.UTC(dates[0].getUTCFullYear(), dates[0].getUTCMonth(), dates[0].getUTCDate(), dates[0].getUTCHours(), dates[0].getUTCMinutes(), dates[0].getUTCSeconds());
      const date2 = Date.UTC(dates[1].getUTCFullYear(), dates[1].getUTCMonth(), dates[1].getUTCDate(), dates[1].getUTCHours(), dates[1].getUTCMinutes(), dates[1].getUTCSeconds());
      const dateUTC1 = new Date(date1)
      const dateUTC2 = new Date(date2)
      const dateString1 = dateUTC1.toISOString().split('.')
      const dateString2 = dateUTC2.toISOString().split('.')
      const body = {
        "request": {
          "Keyword": group,
          "AddDetectionAlarms": false,
          "AddIdentificatioAlarms": true,
          "Descendant": true,
          "Offset": 0,
          "MaximumResults": 50,
          "StartDate": dateString1[0],
          "EndDate": dateString2[0],
          "StartTime": dateString1[0],
          "EndTime": dateString2[0]
        }
      };
      const result = await requests.post('/SearchExtendedAlarms', body);
      this.alarms = result.SearchExtendedAlarmsResult.value;
    },
    async fetchLastAlarm() {
      const result1 = await requests.post('/GetLastAlarmID', {})
      this.lastAlarmId = result1.GetLastAlarmIDResult;
      const body = {
        "request": {
          "Id": this.lastAlarmId ,
          "AddFrame": false,
          "AddAllAlarmPhotos": false,
          "AddCandidatePhotos": true,
          "AddTemplate": false
        }
      }
      const result2 = await requests.post('/GetAlarmExtended', body)
      this.lastAlarm = result2.GetAlarmExtendedResult;
      this.loaded = true
    },
  },
  getters: {
    getLastAlarm: (state) => {
      return state.lastAlarm
    },
    getDataCard: (state) => {
      if (state.loaded && state.lastAlarm.IsIdentification ) {
        return {
          title: state.lastAlarm.BestCandidate.SubjectName + ' ' + state.lastAlarm.BestCandidate.SubjectLastName,
          subtitle: state.lastAlarm.BestCandidate.SubjectGroup,
          description: state.lastAlarm.BestFaceImage.Timestamp,
          src: 'data:image/jpeg;base64,' + state.lastAlarm.BestFaceImage.Image,
          IsIdentification: true
        }
      } else{ 
        return {
          title: 'No identificado',
          subtitle: 'No identificado',
          description: 'No identificado',
          src: './src/assets/no-user.jpeg',
          IsIdentification: false
        }
      }
    },
    getIdentificationAlarms: (state) => {
      const alarms:IGetAlarmExtendedResult[]  = [];
      state.alarms.map( (alarm:IGetAlarmExtendedResult)  => {
        if (alarm.BestCandidate) {
          alarms.push({
            Name: alarm.BestCandidate.SubjectName,
            LastName: alarm.BestCandidate.SubjectLastName,
            UserCode: alarm.BestCandidate.SubjectCode,
            Group: alarm.BestCandidate.SubjectGroup,
            Date: alarm.CreationTimestamp,
          })
        }
      })
      return alarms
      /**
       * Returns the identification alarms.
       *
       * @returns {IGetAlarmExtendedResult[]}
      */
    },
    getAlarms: (state) => {
      const alarms:IGetAlarmExtendedResult[]  = [];
      state.alarms.map( (alarm:IGetAlarmExtendedResult)  => {
        if (alarm.BestCandidate) {
          alarms.push({
            Name: alarm.BestCandidate.SubjectName,
            LastName: alarm.BestCandidate.SubjectLastName,
            UserCode: alarm.BestCandidate.SubjectCode,
            Group: alarm.BestCandidate.SubjectGroup,
            Date: alarm.CreationTimestamp,
            IsIdentification: 'Si'
          })
        } else {
          alarms.push({
            Name: 'Sin',
            LastName: 'Identificar',
            UserCode: '',
            Group: '',
            Date: alarm.CreationTimestamp,
            IsIdentification: 'No'
          })
        }
      })
      return alarms
    },

    getIdentified() {
      const { subjects } = useSubjectStore();
      const subjectsObject = JSON.parse(JSON.stringify(toRaw(subjects)));
      let identifiedOrNot: ISubject[] = []
      subjectsObject.forEach( (subject:ISubject)  => {
        const subjectExist = this.getIdentificationAlarms.filter(alarm => alarm.UserCode===subject.UserCode)
        if (subjectExist.length>0) identifiedOrNot.push({...subject})
      })
      return identifiedOrNot
    },
    getMissing() {
      const { subjects } = useSubjectStore();
      const subjectsObject = JSON.parse(JSON.stringify(toRaw(subjects)));
      let identifiedOrNot: ISubject[] = []

      subjectsObject.forEach( (subject:ISubject)  => {
        const subjectExist = this.getIdentificationAlarms.filter(alarm => alarm.UserCode===subject.UserCode)
        if (subjectExist.length==0) identifiedOrNot.push({...subject})
      })
      return identifiedOrNot
    },
  }
});

export default useAlarmStore;
