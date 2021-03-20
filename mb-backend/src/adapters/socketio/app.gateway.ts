  
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(3002, { namespace: 'room', transports: ['websocket'] })
export class AppGateway implements OnGatewayConnection{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('MessageGateway');

  @SubscribeMessage('send-message')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    client.broadcast.emit('receive-message', data)
    return data;
  }

  handleConnection(client: Socket): void {
    console.log('connection', client.id)
  }

  public afterInit(server: Server): void {
    return this.logger.log('Init');
  }
}
