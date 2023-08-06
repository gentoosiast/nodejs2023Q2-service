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
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrackResponseDto } from './dtos/track-response.dto';
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackInfoDto } from './dtos/update-track-info.dto';
import { TrackService } from './track.service';
import { UUID_VERSION } from '@shared/constants/uuid';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tracks have been successfully retrieved',
    type: TrackResponseDto,
    isArray: true,
  })
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'track id (uuid v4)',
    example: '11035eda-0858-43bc-9ab7-9d4ba0da4e09',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The track has been successfully retrieved',
    type: TrackResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of track is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track with provided id was not found',
  })
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const track = await this.trackService.findOne(id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The track has been successfully created',
    type: TrackResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Request body does not contain required fields or one of ids in DTO is invalid or points to non-existing entity',
  })
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'track id (uuid v4)',
    example: '3a36a0e8-186e-4861-940b-12326e4f4691',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Track's info has been successfully updated",
    type: TrackResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Provided id of track is invalid (not uuid) or one of ids in DTO is invalid or points to non-existing entity',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track with provided id was not found',
  })
  async updateInfo(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
    @Body() updateTrackInfoDto: UpdateTrackInfoDto,
  ) {
    const updatedTrack = await this.trackService.updateInfo(
      id,
      updateTrackInfoDto,
    );

    if (!updatedTrack) {
      throw new NotFoundException('Track not found');
    }

    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    description: 'track id (uuid v4)',
    example: 'a7f382c5-a607-4cb4-be24-c2b669c1017d',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Track has been successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of track is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track with provided id was not found',
  })
  async remove(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = await this.trackService.remove(id);

    if (!result) {
      throw new NotFoundException('Track not found');
    }
  }
}
