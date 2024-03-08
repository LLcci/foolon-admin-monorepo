/*
https://docs.nestjs.com/modules
*/

import { Global, Module } from '@nestjs/common'
import { SocketGateway } from './socket.gateway'

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [SocketGateway],
  exports: [SocketGateway]
})
export class SocketModule {}
