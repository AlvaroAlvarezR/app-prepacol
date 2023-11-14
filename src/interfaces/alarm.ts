import IBestCandidate from "./candidate";
import IBestImage from "./image";

export default interface IGetAlarmExtendedResult {
  id: number;
  BestCandidate: IBestCandidate;
  BestFaceImage: IBestImage;
  IsIdentification: boolean;
  CreationTimestamp: Date;
}

