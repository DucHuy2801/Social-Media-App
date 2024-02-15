import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserInfoDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    city: string

    @ApiProperty()
    website: string

    @ApiProperty()
    cover_picture: string

    @ApiProperty()
    profile_picture: string
}