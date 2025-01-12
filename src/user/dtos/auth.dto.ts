import { UserType } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({ description: 'The name of the example' })
  @IsString()
  @IsNotEmpty()
  name: string;

  /*  @Matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
    message: 'phone must be a valid phone number',
    }) */
  @ApiProperty({ description: 'The name of the example' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'The name of the example' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The name of the example' })
  @IsString()
  @MinLength(5)
  password: string;

  @ApiProperty({ description: 'The name of the example' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  productKey?: string;
}

export class SigninDto {
  @ApiProperty({ description: 'The name of the example' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The name of the example' })
  @IsString()
  password: string;
}

export class GenerateProductKeyDto {
  @ApiProperty({ description: 'The name of the example' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The name of the example' })
  @IsEnum(UserType)
  userType: UserType;
}
