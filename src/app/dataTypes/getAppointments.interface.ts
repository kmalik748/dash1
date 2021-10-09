export interface getAppointmentsInterface {
  id: number,
  DoctorName: string,
  PatientName?: string,
  docID?: number,
  patID? : number,
  pic: string,
  time: string,
  date: string,
  date_standard: string,
  timestamp: string,
  specialty?: string
  email?: string
}
