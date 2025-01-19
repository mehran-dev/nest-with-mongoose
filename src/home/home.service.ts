// @ts-nocheck
import { PropertyType } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserInfo } from 'src/user/decorators/user.decorator';
import { HomeResponseDto } from './dto/home.dto';
import { Home, Image } from 'src/models/models';

interface GetHomesParam {
  city?: string;
  price?: {
    gte?: number;
    lte?: number;
  };
  propertyType?: PropertyType;
}

interface CreateHomeParams {
  address: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  city: string;
  price: number;
  landSize: number;
  propertyType: PropertyType;
  images: { url: string }[];
}

interface UpdateHomeParams {
  address?: string;
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
  city?: string;
  price?: number;
  landSize?: number;
  propertyType?: PropertyType;
}

export const homeSelect = {
  id: true,
  address: true,
  city: true,
  price: true,
  propertyType: true,
  number_of_bathrooms: true,
  number_of_bedrooms: true,
};

@Injectable()
export class HomeService {
  async getHomes(filter: GetHomesParam): Promise<HomeResponseDto[]> {
    const homes = await Home.find({
      select: {
        ...homeSelect,
        images: {
          select: {
            url: true,
          },
          take: 1,
        },
      },
      where: filter,
    });

    if (!homes.length) {
      throw new NotFoundException();
    }

    return homes.map((home) => {
      const fetchHome = { ...home, image: home.images?.[0]?.url || '' };
      delete fetchHome.images;
      return new HomeResponseDto(fetchHome);
    });
  }

  async getHomeById(id: number) {
    const home = await Home.findOne({
      where: {
        id,
      },
      select: {
        ...homeSelect,
        images: {
          select: {
            url: true,
          },
        },
        realtor: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!home) {
      throw new NotFoundException();
    }

    return new HomeResponseDto(home);
  }

  async createHome(
    {
      address,
      numberOfBathrooms,
      numberOfBedrooms,
      city,
      landSize,
      price,
      propertyType,
      images,
    }: CreateHomeParams,
    userId: number,
  ) {
    const home = await Home.create({
      address,
      number_of_bathrooms: numberOfBathrooms,
      number_of_bedrooms: numberOfBedrooms,
      city,
      land_size: landSize,
      propertyType,
      price,
      realtor_id: userId,
    });

    const homeImages = images.map((image) => {
      return { ...image, home_id: home.id };
    });

    await Image.create({
      data: homeImages,
    });

    return new HomeResponseDto(home);
  }

  async updateHomeById(id: number, data: UpdateHomeParams) {
    const home = await Home.findOne({
      id,
    });

    if (!home) {
      throw new NotFoundException();
    }

    const updatedHome = await Home.updateMany({
      where: {
        id: id.toString(),
      },
      data,
    });
    // @ts-ignore
    return new HomeResponseDto(updatedHome);
  }

  async deleteHomeById(id: number) {
    await Image.deleteMany({
      where: {
        home_id: id.toString(),
      },
    });

    await Home.deleteMany({
      where: {
        id: id.toString(),
      },
    });
  }

  async getRealtorByHomeId(id: number) {
    const home = await Home.findOne({
      where: {
        id: id.toString(),
      },
      select: {
        realtor: {
          select: {
            name: true,
            id: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!home) {
      throw new NotFoundException();
    }

    return home.realtor;
  }
}
