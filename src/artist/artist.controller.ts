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
import { ArtistService } from './artist.service';
import { ArtistResponseDto } from './dtos/artist-response.dto';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistInfoDto } from './dtos/update-artist-info.dto';
import { UUID_VERSION } from '@shared/constants/uuid';

@ApiTags('artist')
@ApiBearerAuth()
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists', description: 'Gets all artists' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Artists have been successfully retrieved',
    type: ArtistResponseDto,
    isArray: true,
  })
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single artist by id',
    description: 'Get single artist by id',
  })
  @ApiParam({
    name: 'id',
    description: 'artist id (uuid v4)',
    example: '7b06da94-6e57-4641-8baa-6f6d975c70aa',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The artist has been successfully retrieved',
    type: ArtistResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of artist is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist with provided id was not found',
  })
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  @Post()
  @ApiOperation({ summary: 'Add new artist', description: 'Add new artist' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The artist has been successfully created',
    type: ArtistResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request body does not contain required fields',
  })
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update artist information',
    description: 'Update artist information by UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'artist id (uuid v4)',
    example: '70083ecc-00e2-45fd-b7fb-1a7b58eab45f',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Artist's info has been successfully updated",
    type: ArtistResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of artist is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist with provided id was not found',
  })
  async updateInfo(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
    @Body() updateArtistInfoDto: UpdateArtistInfoDto,
  ) {
    const updatedArtist = await this.artistService.updateInfo(
      id,
      updateArtistInfoDto,
    );

    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }

    return updatedArtist;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete artist',
    description: 'Delete artist from library',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    description: 'artist id (uuid v4)',
    example: '25f82d5b-e19f-405d-bafa-191930b0577b',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Artist has been successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of artist is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist with provided id was not found',
  })
  async remove(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = await this.artistService.remove(id);

    if (!result) {
      throw new NotFoundException('Artist not found');
    }
  }
}
