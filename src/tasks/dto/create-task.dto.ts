import { User } from "src/user/entities/user.entity";

export class CreateTaskDto {
  title: string;
  description: string;
  repository_id: number;
}
