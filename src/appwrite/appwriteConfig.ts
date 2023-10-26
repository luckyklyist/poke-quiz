import { Client, Databases, ID, Query, Models } from "appwrite";
import config from "../Config/config";

export interface userPortfoloio {
  userId: string;
  name: string;
  points: number;
  country: string;
}

export type LeaderBoard = {
  name: string;
  points: number;
  country: string;
} & Models.Document;

export interface userPortfoloioUpdate {
  name?: string;
  points?: number;
  country?: string;
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

  async getPortfolioByUserId(userId: string) {
    try {
      const exist = await this.databases.listDocuments(
        config.databaseId,
        config.collectionId,
        [Query.equal("userId", userId)]
      );
      if (exist.documents.length > 0) {
        return this.databases.getDocument(
          config.databaseId,
          config.collectionId,
          exist.documents[0].$id
        );
      } else {
        throw new Error("User not found");
      }
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
    userBody: userPortfoloioUpdate;
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

  async updatePortfolioByUserId({
    userId,
    userBody,
  }: {
    userId: string;
    userBody: userPortfoloioUpdate;
  }) {
    try {
      const exist = await this.databases.listDocuments(
        config.databaseId,
        config.collectionId,
        [Query.equal("userId", userId)]
      );
      if (exist.documents.length > 0) {
        const id = exist.documents[0].$id;
        return this.databases.updateDocument(
          config.databaseId,
          config.collectionId,
          id,
          userBody
        );
      } else {
        throw new Error("User not found");
      }
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

  async getLeaderBoard() {
    try {
      return this.databases.listDocuments<LeaderBoard>(
        config.databaseId,
        config.collectionId,
        [Query.orderDesc("points")]
      );
    } catch (err) {
      throw err;
    }
  }
}

const service = new Services();
export default service;
