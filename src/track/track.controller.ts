import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrackResponseDto } from './dtos/track-response.dto';
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackInfoDto } from './dtos/update-track-info.dto';
import { TrackService } from './track.service';
import { UUIDService } from '@shared/services/uuid.service';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private uuidService: UUIDService,
  ) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tracks have been successfully retrieved',
    type: TrackResponseDto,
    isArray: true,
  })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiQuery({
    name: 'id',
    description: 'track id (uuid v4)',
    example: '11035eda-0858-43bc-9ab7-9d4ba0da4e09',
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
  findOne(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const track = this.trackService.findOne(id);

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
    description: 'Request body does not contain required fields',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @ApiQuery({
    name: 'id',
    description: 'track id (uuid v4)',
    example: '3a36a0e8-186e-4861-940b-12326e4f4691',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Track's info has been successfully updated",
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
  updateInfo(
    @Param('id') id: string,
    @Body() updateTrackInfoDto: UpdateTrackInfoDto,
  ) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const updatedTrack = this.trackService.updateInfo(id, updateTrackInfoDto);

    if (!updatedTrack) {
      throw new NotFoundException('Track not found');
    }

    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiQuery({
    name: 'id',
    description: 'track id (uuid v4)',
    example: 'a7f382c5-a607-4cb4-be24-c2b669c1017d',
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
  remove(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const result = this.trackService.remove(id);

    if (!result) {
      throw new NotFoundException('Track not found');
    }
  }
}
