interface IName {
  title: string;
  first: string;
  last: string;
}

interface IStreet {
  number: number;
  name: string;
}

interface ICoordinates {
  latitude: string;
  longitude: string;
}

interface ITimezone {
  offset: string;
  description: string;
}

interface ILocation {
  street: IStreet;
  city: string;
  state: string;
  country: string;
  postcode: number | string;
  coordinates: ICoordinates;
  timezone: ITimezone;
}

interface ILogin {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

interface IDateInfo {
  date: string;
  age: number;
}

interface IID {
  name: string;
  value: string | null;
}

interface IPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface IUser {
  gender: string;
  name: IName;
  location: ILocation;
  email: string;
  login: ILogin;
  dob: IDateInfo;
  registered: IDateInfo;
  phone: string;
  cell: string;
  id: IID;
  picture: IPicture;
  nat: string;
}

export class User implements IUser {
  gender: string;
  name: IName;
  location: ILocation;
  email: string;
  login: ILogin;
  dob: IDateInfo;
  registered: IDateInfo;
  phone: string;
  cell: string;
  id: IID;
  picture: IPicture;
  nat: string;

  constructor() {
    this.gender = '';
    this.name = { title: '', first: '', last: '' };
    this.location = {
      street: { number: 0, name: '' },
      city: '',
      state: '',
      country: '',
      postcode: '',
      coordinates: { latitude: '', longitude: '' },
      timezone: { offset: '', description: '' }
    };
    this.email = '';
    this.login = {
      uuid: '',
      username: '',
      password: '',
      salt: '',
      md5: '',
      sha1: '',
      sha256: ''
    };
    this.dob = { date: '', age: 0 };
    this.registered = { date: '', age: 0 };
    this.phone = '';
    this.cell = '';
    this.id = { name: '', value: null };
    this.picture = { large: '', medium: '', thumbnail: '' };
    this.nat = '';
  }
}