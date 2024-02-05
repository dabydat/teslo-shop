import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;
  constructor(private readonly messagesWsService: MessagesWsService) { }
  
  handleConnection(client: Socket) {
    this.messagesWsService.registerCLient(client);
    this.wss.emit('clients-updated', [this.messagesWsService.getConnectedClients()])
  }
  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
    this.wss.emit('clients-updated', [this.messagesWsService.getConnectedClients()])
  }
}
