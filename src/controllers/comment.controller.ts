import { Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation, ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseMessage } from '../common/decorators';
import { ErrorResponseDto, SuccessResponseDto } from '../dtos';
import { CommentService } from '../services/comment.service';
import { Comment } from '../entities';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly comment: CommentService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get all comments successfully.')
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiOperation({ summary: 'Get all comments.' })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  async getAllComment(): Promise<Comment[]> {
    return await this.comment.getAll();
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Comment deleted successfully.')
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiOperation({ summary: 'Delete comment' })
  @ApiParam({ name: 'id', type: String, description: 'Comment ID', example: 33 })
  async deleteComment(@Param('id', ParseIntPipe) commentId: number): Promise<any> {
    return await this.comment.remove(commentId);
  }
}