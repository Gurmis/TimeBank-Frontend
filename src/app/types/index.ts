export interface Job {
  id: number;
  name: string;
  description: string;
  duration: number;
  averageRating: number;
  likesCount: number;
  user: User;
}

export interface NewJob {
  name: string;
  description: string;
  duration: number;
  userId: number;
}

export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface NewUser {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
}

export interface Hours {
  userFromId: number;
  amount: number;
}

export interface Rating {
  rating: number;
}

export interface Log {
  name: string;
  amount: number;
  jobCompletionDate: string;
  firstNameFrom: string;
  lastNameFrom: string;
}

export interface Login {
  phoneNumber: string;
  password: string;
}

/*tasks
  -editovanie jobov, vymazavanie jobov
  -v my section urobit bubliny kde bude na vyber user details(editovanie) + my jobs + history log

  -prihlasovanie
*/
