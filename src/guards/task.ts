import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TaskService } from 'src/modules/task/task.service';

@Injectable()
export class TaskGuard implements CanActivate {
  constructor(private taskService: TaskService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    const { id } = request.params;
    const task = await this.taskService.findOne(id);
    const { userAssigneeId, userCreatedId } = task;
    if (userCreatedId !== user.id && userAssigneeId !== user.id) {
      throw new UnauthorizedException(
        'You are not allowed to access this task',
      );
    }
    request['task'] = task;
    return true;
  }
}
