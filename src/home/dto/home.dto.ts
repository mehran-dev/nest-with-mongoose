import { PropertyType } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class HomeResponseDto {
  @ApiProperty({ description: 'The name of the example' })
  id: number;
  @ApiProperty({ description: 'The name of the example' })
  @ApiProperty({ description: 'The name of the example' })
  address: string;

  @ApiProperty({ description: 'The name of the example' })
  @Exclude()
  number_of_bedrooms: number;

  @ApiProperty({ description: 'The name of the example' })
  @Expose({ name: 'numberOfBedrooms' })
  numberOfBedrooms() {
    return this.number_of_bedrooms;
  }

  @ApiProperty({ description: 'The name of the example' })
  @Exclude()
  number_of_bathrooms: number;

  @ApiProperty({ description: 'The name of the example' })
  @Expose({ name: 'numberOfBathrooms' })
  numberOfBathrooms() {
    return this.number_of_bathrooms;
  }

  @ApiProperty({ description: 'The name of the example' })
  city: string;

  @ApiProperty({ description: 'The name of the example' })
  @Exclude()
  listed_date: Date;

  @ApiProperty({ description: 'The name of the example' })
  @Expose({ name: 'listedDate' })
  listedDate() {
    return this.listedDate;
  }

  @ApiProperty({ description: 'The name of the example' })
  price: number;

  @ApiProperty({ description: 'The name of the example' })
  image: string;

  @ApiProperty({ description: 'The name of the example' })
  @Exclude()
  land_size: number;

  @ApiProperty({ description: 'The name of the example' })
  @Expose({ name: 'landSize' })
  landSize() {
    return this.landSize;
  }
  @ApiProperty({ description: 'The name of the example' })
  propertyType: PropertyType;

  @ApiProperty({ description: 'The name of the example' })
  @Exclude()
  created_at: Date;
  @ApiProperty({ description: 'The name of the example' })
  @Exclude()
  updated_at: Date;
  @ApiProperty({ description: 'The name of the example' })
  @Exclude()
  realtor_id: number;

  constructor(paritial: Partial<HomeResponseDto>) {
    Object.assign(this, paritial);
  }
}

class Image {
  @IsString()
  @IsNotEmpty()
  url: string;
}

export class CreateHomeDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsPositive()
  numberOfBedrooms: number;

  @IsNumber()
  @IsPositive()
  numberOfBathrooms: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  landSize: number;

  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Image)
  images: Image[];
}

export class UpdateHomeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  numberOfBedrooms?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  numberOfBathrooms?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  landSize?: number;

  @IsOptional()
  @IsEnum(PropertyType)
  propertyType?: PropertyType;
}

export class InquireDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
