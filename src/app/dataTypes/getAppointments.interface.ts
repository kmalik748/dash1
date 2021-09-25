export interface getAppointmentsInterface {
  id: number,
  DoctorName: string,
  PatientName?: string,
  docID?: number,
  patID? : number,
  pic: string,
  time: string,
  date: string,
  timestamp: string,
  specialty?: string
}
