import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { VcardService } from './vcard.service';
import { CreateVcardDto } from './dto/createVcardDto.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entity/user.entity';
import { GetUser } from '../auth/get-user-decoratore';
import { VCard } from './entity/vcard.entitiy';

@ApiTags('Vcard')
@Controller('vcard')
export class VcardController {
  constructor(private vcardService: VcardService) {}

  // @UseGuards(AuthGuard())
  @Post()
  async createVcard(
    @GetUser() user: User,
    @Body() createVcardDto: CreateVcardDto,
  ): Promise<VCard> {

    console.log(user,"USER_INFO")

    const vcard = await this.vcardService.create(createVcardDto,user.id);
    return vcard;
  }

  @Get()
  async findAll(@GetUser() user: User): Promise<VCard[]> {
    const vcard = await this.vcardService.findAll(user.id);
    return vcard;
  }

  @Get('/:id')
  async find(@Param('id') id: string, @GetUser() user: User): Promise<VCard[]> {
    const vcard = await this.vcardService.findOne(user.id, id);
    return vcard;
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.vcardService.delete(id);
  }
}