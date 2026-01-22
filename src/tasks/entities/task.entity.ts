enum TaskStatus {
  TO_DO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

export class Task {
  id: number;
  title: string;
  status: TaskStatus = TaskStatus.TO_DO;
  responsible: string;
  repository_id: number;
}
