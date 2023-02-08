import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe, UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation, ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseMessage } from '../common/decorators';
import { ErrorResponseDto, SuccessResponseDto } from '../dtos';
import { ReviewService } from '../services/review.service';
import { Review } from '../entities/review.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly review: ReviewService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get all reviews successfully.')
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiOperation({ summary: 'Get all reviews.' })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  async getAllReviews(): Promise<Review[]> {
    return await this.review.getAll();
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Review deleted successfully.')
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiOperation({ summary: 'Delete reviews' })
  @ApiParam({ name: 'id', type: String, description: 'Review ID', example: 30 })
  async deleteReview(@Param('id', ParseIntPipe) reviewId: number): Promise<any> {
    return await this.review.remove(reviewId);
  }
}
