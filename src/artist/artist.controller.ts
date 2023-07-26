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
import { UUIDService } from '@shared/services/uuid.service';
import { ArtistService } from './artist.service';
import { ArtistResponseDto } from './dtos/artist-response.dto';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistInfoDto } from './dtos/update-artist-info.dto';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly uuidService: UUIDService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Artists have been successfully retrieved',
    type: ArtistResponseDto,
    isArray: true,
  })
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiQuery({
    name: 'id',
    description: 'artist id (uuid v4)',
    example: '7b06da94-6e57-4641-8baa-6f6d975c70aa',
  })
  @ApiResponse({
    status: 200,
    description: 'The artist has been successfully retrieved',
    type: ArtistResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Provided id of artist is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist with provided id was not found',
  })
  findOne(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const artist = this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The artist has been successfully created',
    type: ArtistResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Request body does not contain required fields',
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  @ApiQuery({
    name: 'id',
    description: 'artist id (uuid v4)',
    example: '70083ecc-00e2-45fd-b7fb-1a7b58eab45f',
  })
  @ApiResponse({
    status: 200,
    description: "Artist's info has been successfully updated",
    type: ArtistResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Provided id of artist is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist with provided id was not found',
  })
  updateInfo(
    @Param('id') id: string,
    @Body() updateArtistInfoDto: UpdateArtistInfoDto,
  ) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const updatedArtist = this.artistService.updateInfo(
      id,
      updateArtistInfoDto,
    );

    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }

    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiQuery({
    name: 'id',
    description: 'artist id (uuid v4)',
    example: '25f82d5b-e19f-405d-bafa-191930b0577b',
  })
  @ApiResponse({
    status: 204,
    description: 'Artist has been successfully deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Provided id of artist is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist with provided id was not found',
  })
  remove(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const result = this.artistService.remove(id);

    if (!result) {
      throw new NotFoundException('Artist not found');
    }
  }
}
