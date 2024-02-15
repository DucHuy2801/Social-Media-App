import { Body, Controller, Get, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserInfoDto } from './dto/update_user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    getInfo(@Param('id') id: number) {
        return this.userService.getInfo(id)
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    updateUser(@Param('id') id: number, @Body() userInfo: UserInfoDto) {
        return this.userService.updateUser(id, userInfo)
    }
}
