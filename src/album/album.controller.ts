import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlbumResponseDto } from './dtos/album-response.dto';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumInfoDto } from './dtos/update-album-info.dto';
import { AlbumService } from './album.service';
import { UUIDService } from '@shared/services/uuid.service';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly uuidService: UUIDService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Albums have been successfully retrieved',
    type: AlbumResponseDto,
    isArray: true,
  })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiQuery({
    name: 'id',
    description: 'album id (uuid v4)',
    example: '0a91b6a8-d1af-4556-80e0-f482e33232a0',
  })
  @ApiResponse({
    status: 200,
    description: 'The album has been successfully retrieved',
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Provided id of album is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album with provided id was not found',
  })
  findOne(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const album = this.albumService.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The album has been successfully created',
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Request body does not contain required fields',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @ApiQuery({
    name: 'id',
    description: 'album id (uuid v4)',
    example: 'ab00a15e-86c9-4ed1-84e0-3234eb315b2b',
  })
  @ApiResponse({
    status: 200,
    description: "Album's info has been successfully updated",
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Provided id of album is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album with provided id was not found',
  })
  updateInfo(
    @Param('id') id: string,
    @Body() updateAlbumInfoDto: UpdateAlbumInfoDto,
  ) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const updatedAlbum = this.albumService.updateInfo(id, updateAlbumInfoDto);

    if (!updatedAlbum) {
      throw new NotFoundException('Album not found');
    }

    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiQuery({
    name: 'id',
    description: 'album id (uuid v4)',
    example: 'a868adda-61a6-4d4f-9ba9-43629fa73147',
  })
  @ApiResponse({
    status: 204,
    description: 'Album has been successfully deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Provided id of album is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album with provided id was not found',
  })
  remove(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const result = this.albumService.remove(id);

    if (!result) {
      throw new NotFoundException('Album not found');
    }
  }
}
