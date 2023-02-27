import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IDataServices } from "../../../core";
import { User, UserDocument, Session, SessionDocument } from "./models";
import { MongoGenericRepository } from "./mongo-generic-repository";

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  users: MongoGenericRepository<User>;
  sessions: MongoGenericRepository<Session>;

  constructor(
    @InjectModel(User.name)
    private UserRepository: Model<UserDocument>,
    @InjectModel(Session.name)
    private SessionRepository: Model<SessionDocument>
  ) {}

  onApplicationBootstrap() {
    this.users = new MongoGenericRepository<User>(this.UserRepository, []);
    this.sessions = new MongoGenericRepository<Session>(
      this.SessionRepository,
      ["user"]
    );
  }
}
