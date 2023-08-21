import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AlbumResponseDto } from './dtos/album-response.dto';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumInfoDto } from './dtos/update-album-info.dto';
import { AlbumService } from './album.service';
import { UUID_VERSION } from '@shared/constants/uuid';

@ApiTags('album')
@ApiBearerAuth()
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Access token is missing or invalid',
})
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOperation({
    summary: 'Get albums list',
    description: 'Gets all library albums list',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Albums have been successfully retrieved',
    type: AlbumResponseDto,
    isArray: true,
  })
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Gets single album by id',
  })
  @ApiParam({
    name: 'id',
    description: 'album id (uuid v4)',
    example: '0a91b6a8-d1af-4556-80e0-f482e33232a0',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The album has been successfully retrieved',
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of album is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album with provided id was not found',
  })
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const album = await this.albumService.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  @Post()
  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The album has been successfully created',
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Request body does not contain required fields or artistId in DTO is invalid or points to non-existing entity',
  })
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'album id (uuid v4)',
    example: 'ab00a15e-86c9-4ed1-84e0-3234eb315b2b',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Album's info has been successfully updated",
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Provided id of album is invalid (not uuid) or artistId in DTO is invalid or points to non-existing entity',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album with provided id was not found',
  })
  async updateInfo(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
    @Body() updateAlbumInfoDto: UpdateAlbumInfoDto,
  ) {
    const updatedAlbum = await this.albumService.updateInfo(
      id,
      updateAlbumInfoDto,
    );

    if (!updatedAlbum) {
      throw new NotFoundException('Album not found');
    }

    return updatedAlbum;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album from library',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    description: 'album id (uuid v4)',
    example: 'a868adda-61a6-4d4f-9ba9-43629fa73147',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Album has been successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of album is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album with provided id was not found',
  })
  async remove(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = await this.albumService.remove(id);

    if (!result) {
      throw new NotFoundException('Album not found');
    }
  }
}
