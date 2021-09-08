export interface UsersDetailsInterface {
  id: number,
  first_name: string,
  middle_name: string,
  last_name: string,
  gender: string,
  dob: string,
  city: string,
  state: string,
  country: string,
  email: string,
  phone_number: string,
  password?: string
  userType: string
}
