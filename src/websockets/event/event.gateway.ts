import { Inject, CACHE_MANAGER } from "@nestjs/common";
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { Cache } from "cache-manager";
@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class EventsGateway {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("giveHistory")
  async handleMessage() {
    const keys = await this.cacheManager.store.keys();
    const allData: { [key: string]: any } = {};
    for (const key of keys) {
      allData[key] = await this.cacheManager.get(key);
    }
    this.server.emit("getHistory", allData);
  }

  @SubscribeMessage("giveFive")
  async handleTrigerMessage() {
    this.server.emit("giveFive", "okay, shut up and take my money");
  }
}
