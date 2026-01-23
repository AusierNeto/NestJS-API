import { User } from "src/user/entities/user.entity";

export class CreateTaskDto {
  title: string;
  user: User;
  repository_id: number;
}
