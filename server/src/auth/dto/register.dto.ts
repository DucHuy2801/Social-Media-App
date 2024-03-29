import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RegisterDto {
    @ApiProperty()
    @IsString()
    username: string

    @ApiProperty()
    @IsString()
    password: string

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    name: string
}