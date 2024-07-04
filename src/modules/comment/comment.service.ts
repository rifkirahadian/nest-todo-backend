import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENTS_REPOSITORY')
    private commentsRepository: typeof Comment,
  ) {}

  create(payload: CreateCommentDto, userId: number) {
    return this.commentsRepository.create({ ...payload, userId });
  }
}
