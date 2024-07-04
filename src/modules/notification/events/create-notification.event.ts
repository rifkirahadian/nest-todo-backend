export class CreateNotificationEvent {
  content: string;
  type: string;
  userId: number;
  taskId: number;
  commentId: number;

  constructor(data: {
    content: string;
    type: string;
    userId: number;
    taskId: number;
    commentId: number;
  }) {
    this.content = data.content;
    this.type = data.type;
    this.userId = data.userId;
    this.taskId = data.taskId;
    this.commentId = data.commentId;
  }
}
