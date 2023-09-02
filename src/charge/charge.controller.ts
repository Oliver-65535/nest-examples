import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import CreateChargeDto from './dto/createCharge.dto';
import RequestWithUser from '../authentication/requestWithUser.interface';
import StripeService from '../stripe/stripe.service';

@Controller('charge')
export default class ChargeController {
  constructor(
    private readonly stripeService: StripeService
  ) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createCharge(@Body() charge: CreateChargeDto, @Req() request: RequestWithUser) {
    await this.stripeService.charge(charge.amount, charge.paymentMethodId, request.user.stripeCustomerId);
  }
}
