export type Game = {
  name: string;
  location: string;
  date: string;
  hour: string;
  _id: string;
  type: string;
  description: string;
  host_ID: string;
  value: string;
  finished: boolean;
  hostName: string;
  hostEmail: string;
}

export type GameList = {
  _id: string;
  user_ID: string;
  name: string;
  email: string;
  confirmed: boolean;
  reputation: number;
}

export type User = {
  _id: string;
  name: string;
  user_ID: string;
  email: string;
  auth_token: string;
  reputation: number;
}

export type Friend = {
  _id: string;
  user_ID: string;
  friend_ID: string;
  name: string;
  reputation: number;
}

export type Invite = {
  _id: string;
  host_ID: string;
  game_ID: string;
  hostName: string;
  gameName: string;
  date: string;
  hour: string;
  location: string;
}

export type Params = {
  id: string | null;
}

export type Evaluation = {
  user_ID: string;
  paid: boolean;
  participated: boolean;
}