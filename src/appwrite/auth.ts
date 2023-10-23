import { Client, Account, ID } from "appwrite";
import config from "../Config/config";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(config.apiBaseUrl).setProject(config.projectId);
    this.account = new Account(this.client);
  }

  async getUserSession() {
    try {
      return this.account.get();
    } catch (err) {
      throw err;
    }
  }

  async googleLogin() {
    try {
      return this.account.createOAuth2Session(
        "google",
        "http://localhost:5173",
        "http://localhost:5173/login"
      );
    } catch (err) {
      throw err;
    }
  }

  async getCuurentSession() {
    try {
      return this.account.getSession("current");
    } catch (err) {
      throw err;
    }
  }
}

const authService = new AuthService();
export default authService;
