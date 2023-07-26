import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavsService } from './favs.service';
import { UUIDService } from '@shared/services/uuid.service';
import { FavsResponseDto } from './dtos/favs-response.dto';

@ApiTags('favs')
@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly uuidService: UUIDService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Favorites have been successfully retrieved',
    type: FavsResponseDto,
  })
  findAll() {
    return this.favsService.findAll();
  }

  @Post('album/:id')
  @ApiQuery({
    name: 'id',
    description: 'album id (uuid v4)',
    example: '21d1e499-b101-43bf-aa68-42bc782ca0b2',
  })
  @ApiResponse({
    status: 201,
    description: 'The album has been successfully added to favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Provided id of album is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Album with provided id was not found',
  })
  addAlbum(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const result = this.favsService.addAlbum(id);

    if (!result) {
      throw new UnprocessableEntityException(
        'Album with provided id not found',
      );
    }

    return result;
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiQuery({
    name: 'id',
    description: 'album id (uuid v4)',
    example: '652025d4-37cf-49f5-87a1-88e95774007d',
  })
  @ApiResponse({
    status: 204,
    description: 'Album has been successfully deleted from the favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Provided id of album is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album with provided id was not found in the favorites',
  })
  removeAlbum(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const result = this.favsService.removeAlbum(id);

    if (!result) {
      throw new NotFoundException('Album not found');
    }
  }

  @Post('artist/:id')
  @ApiQuery({
    name: 'id',
    description: 'artist id (uuid v4)',
    example: '8abbc4b2-a0df-4eba-8384-f5077d0d6ed5',
  })
  @ApiResponse({
    status: 201,
    description: 'The artist has been successfully added to favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Provided id of artist is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Artist with provided id was not found',
  })
  addArtist(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const result = this.favsService.addArtist(id);

    if (!result) {
      throw new UnprocessableEntityException(
        'Artist with provided id not found',
      );
    }

    return result;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiQuery({
    name: 'id',
    description: 'artist id (uuid v4)',
    example: '8f62dd6d-db0c-4a93-85d0-850b2a55b8fd',
  })
  @ApiResponse({
    status: 204,
    description: 'Artist has been successfully deleted from the favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Provided id of artist is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist with provided id was not found in the favorites',
  })
  removeArtist(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const result = this.favsService.removeArtist(id);

    if (!result) {
      throw new NotFoundException('Artist not found');
    }
  }

  @Post('track/:id')
  @ApiQuery({
    name: 'id',
    description: 'track id (uuid v4)',
    example: 'ba414b60-d562-4c80-af08-028d43b39f0a',
  })
  @ApiResponse({
    status: 201,
    description: 'The track has been successfully added to favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Provided id of track is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Track with provided id was not found',
  })
  addTrack(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const result = this.favsService.addTrack(id);

    if (!result) {
      throw new UnprocessableEntityException(
        'Track with provided id not found',
      );
    }

    return result;
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiQuery({
    name: 'id',
    description: 'track id (uuid v4)',
    example: 'accb9d24-8192-419e-8e06-01071f90c0e2',
  })
  @ApiResponse({
    status: 204,
    description: 'Track has been successfully deleted from the favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Provided id of track is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Track with provided id was not found in the favorites',
  })
  removeTrack(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const result = this.favsService.removeTrack(id);

    if (!result) {
      throw new NotFoundException('Track not found');
    }
  }
}
