import { Controller, Get, Req, Post, Response, Request, HttpStatus} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('prices')
  async getPrices(@Request() request, @Response() response){
    const body: {coinBase: string, coins: string[]} = request.body
    const prices =  await this.appService.getPrices(body);
    return response.status(HttpStatus.OK).json({
      prices,
    });
  }
}
