import { Client, Databases, ID, Query } from "appwrite";
import config from "../Config/config";

export class Services {
  client = new Client();
  databases;

  constructor() {
    this.client.setEndpoint(config.apiBaseUrl).setProject(config.projectId);
    this.databases = new Databases(this.client);
  }

  async getUserPortfolios() {
    try {
      return this.databases.listDocuments(
        config.databaseId,
        config.collectionId
      );
    } catch (err) {
      throw err;
    }
  }

  async getPortfolioById(id: string) {
    try {
      return this.databases.getDocument(
        config.databaseId,
        config.collectionId,
        id
      );
    } catch (err) {
      throw err;
    }
  }

  async createPortfolio(name: string, points: number) {
    try {
      return this.databases.createDocument(
        config.databaseId,
        config.collectionId,
        ID.unique(),
        {
          name,
          points,
        }
      );
    } catch (err) {
      throw err;
    }
  }

  async updatePortfolio(id: string, name: string, points: number) {
    try {
      return this.databases.updateDocument(
        config.databaseId,
        config.collectionId,
        id,
        {
          name,
          points,
        }
      );
    } catch (err) {
      throw err;
    }
  }

  async deletePortfolio(id: string) {
    try {
      return this.databases.deleteDocument(
        config.databaseId,
        config.collectionId,
        id
      );
    } catch (err) {
      throw err;
    }
  }
}

const service = new Services();
export default service;
