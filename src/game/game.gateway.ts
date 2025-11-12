import { WebSocketGateway, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { GameService } from './game.service';
import { OperationType } from './enums/operation-type.enum';
// import { Server } from 'http';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: {
    origin: 'http://localhost:4200',
    credentials: true,
  }, transports: ['websocket']})
export class GameGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly gameService: GameService) {}

  @SubscribeMessage('connect')
  handleConnection(client: Socket) {
    this.gameService.logConnection(client);
  }
  @SubscribeMessage('disconnect')
  handleDisconnect(client: Socket) {
    this.gameService.logDisconnect(client);
  }

  @SubscribeMessage('startGame')
  handleStartGame(client, data: { operationType: OperationType, count?: number }) {
    const count = data.count ?? 10;
    const exercises = this.gameService.generateGame(data.operationType, count);
    client.emit('gameStarted', { exercises });
  }

}
