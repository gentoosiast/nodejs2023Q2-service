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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FavsService } from './favs.service';
import { FavsResponseDto } from './dtos/favs-response.dto';
import { UUID_VERSION } from '@shared/constants/uuid';

@ApiTags('favs')
@ApiBearerAuth()
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorites movies, tracks and books',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Favorites have been successfully retrieved',
    type: FavsResponseDto,
  })
  async findAll() {
    return await this.favsService.findAll();
  }

  @Post('album/:id')
  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Add album to the favorites',
  })
  @ApiParam({
    name: 'id',
    description: 'album id (uuid v4)',
    example: '21d1e499-b101-43bf-aa68-42bc782ca0b2',
    required: true,
    type: 'string',
    format: 'uuid',
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
  async addAlbum(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = await this.favsService.addAlbum(id);

    if (!result) {
      throw new UnprocessableEntityException(
        'Album with provided id not found',
      );
    }

    return result;
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites',
  })
  @ApiParam({
    name: 'id',
    description: 'album id (uuid v4)',
    example: '652025d4-37cf-49f5-87a1-88e95774007d',
    required: true,
    type: 'string',
    format: 'uuid',
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
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = await this.favsService.removeAlbum(id);

    if (!result) {
      throw new NotFoundException('Album not found');
    }
  }

  @Post('artist/:id')
  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Add artist to the favorites',
  })
  @ApiParam({
    name: 'id',
    description: 'artist id (uuid v4)',
    example: '8abbc4b2-a0df-4eba-8384-f5077d0d6ed5',
    required: true,
    type: 'string',
    format: 'uuid',
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
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = await this.favsService.addArtist(id);

    if (!result) {
      throw new UnprocessableEntityException(
        'Artist with provided id not found',
      );
    }

    return result;
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites',
  })
  @ApiParam({
    name: 'id',
    description: 'artist id (uuid v4)',
    example: '8f62dd6d-db0c-4a93-85d0-850b2a55b8fd',
    required: true,
    type: 'string',
    format: 'uuid',
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
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = await this.favsService.removeArtist(id);

    if (!result) {
      throw new NotFoundException('Artist not found');
    }
  }

  @Post('track/:id')
  @ApiOperation({
    summary: 'Add track to the favorites',
    description: 'Add track to the favorites',
  })
  @ApiParam({
    name: 'id',
    description: 'track id (uuid v4)',
    example: 'ba414b60-d562-4c80-af08-028d43b39f0a',
    required: true,
    type: 'string',
    format: 'uuid',
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
  async addTrack(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = await this.favsService.addTrack(id);

    if (!result) {
      throw new UnprocessableEntityException(
        'Track with provided id not found',
      );
    }

    return result;
  }

  @Delete('track/:id')
  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    description: 'track id (uuid v4)',
    example: 'accb9d24-8192-419e-8e06-01071f90c0e2',
    required: true,
    type: 'string',
    format: 'uuid',
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
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = await this.favsService.removeTrack(id);

    if (!result) {
      throw new NotFoundException('Track not found');
    }
  }
}
