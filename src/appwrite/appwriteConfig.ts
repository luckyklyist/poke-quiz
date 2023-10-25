import { Client, Databases, ID, Query } from "appwrite";
import config from "../Config/config";

export interface userPortfoloio {
  userId: string;
  name: string;
  points: number;
  country: string;
}

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

  async userProfileExists(userId: string) {
    try {
      const exist = await this.databases.listDocuments(
        config.databaseId,
        config.collectionId,
        [Query.equal("userId", userId)]
      );
      return exist.documents.length > 0;
    } catch (err) {
      throw err;
    }
  }

  async createPortfolio(userBody: userPortfoloio) {
    try {
      return await this.databases.createDocument(
        config.databaseId,
        config.collectionId,
        ID.unique(),
        userBody
      );
    } catch (err) {
      throw err;
    }
  }

  async updatePortfolio({
    id,
    userBody,
  }: {
    id: string;
    userBody: userPortfoloio;
  }) {
    try {
      return this.databases.updateDocument(
        config.databaseId,
        config.collectionId,
        id,
        userBody
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
