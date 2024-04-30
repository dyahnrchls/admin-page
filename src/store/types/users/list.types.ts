interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface UserListState {
  loading: boolean;
  list: Array<User>;
  error: string | undefined;
}

export const userListState: UserListState = {
  loading: false,
  list: [],
  error: undefined,
};
