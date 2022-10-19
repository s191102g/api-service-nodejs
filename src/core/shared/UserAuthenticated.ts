

export class UserAuthenticated {
  userId: string;
  role: string;

  constructor(userId: string, role: string) {
    this.userId = userId;
    this.role = role;
  }
}
