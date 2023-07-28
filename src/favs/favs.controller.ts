import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavsService } from './favs.service';
import { FavsResponseDto } from './dtos/favs-response.dto';
import { UUID_VERSION } from '@shared/constants/uuid';

@ApiTags('favs')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
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
    status: HttpStatus.CREATED,
    description: 'The album has been successfully added to favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of album is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Album with provided id was not found',
  })
  addAlbum(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = this.favsService.addAlbum(id);

    if (!result) {
      throw new UnprocessableEntityException(
        'Album with provided id not found',
      );
    }

    return result;
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiQuery({
    name: 'id',
    description: 'album id (uuid v4)',
    example: '652025d4-37cf-49f5-87a1-88e95774007d',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Album has been successfully deleted from the favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of album is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album with provided id was not found in the favorites',
  })
  removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
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
    status: HttpStatus.CREATED,
    description: 'The artist has been successfully added to favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of artist is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Artist with provided id was not found',
  })
  addArtist(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = this.favsService.addArtist(id);

    if (!result) {
      throw new UnprocessableEntityException(
        'Artist with provided id not found',
      );
    }

    return result;
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiQuery({
    name: 'id',
    description: 'artist id (uuid v4)',
    example: '8f62dd6d-db0c-4a93-85d0-850b2a55b8fd',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Artist has been successfully deleted from the favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of artist is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist with provided id was not found in the favorites',
  })
  removeArtist(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
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
    status: HttpStatus.CREATED,
    description: 'The track has been successfully added to favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of track is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Track with provided id was not found',
  })
  addTrack(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = this.favsService.addTrack(id);

    if (!result) {
      throw new UnprocessableEntityException(
        'Track with provided id not found',
      );
    }

    return result;
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiQuery({
    name: 'id',
    description: 'track id (uuid v4)',
    example: 'accb9d24-8192-419e-8e06-01071f90c0e2',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Track has been successfully deleted from the favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of track is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track with provided id was not found in the favorites',
  })
  removeTrack(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = this.favsService.removeTrack(id);

    if (!result) {
      throw new NotFoundException('Track not found');
    }
  }
}
