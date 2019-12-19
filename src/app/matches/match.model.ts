export interface Match {
  date: string;
  type: Type;
  hostName: string;
  guestName: string;
  hostClub: string;
  guestClub: string;
  hostScore: number;
  guestScore: number;
  status: Status;
}

export enum Type {
  FRIENDLY = 'friendly',
  CUP = 'cup',
  LEAGUE = 'league'
}

export enum Status {
  REPORTED = 'reported',
  CONFIRMED = 'confirmed',
  INCLUDED = 'included',
  REJECTED = 'rejected'
}
