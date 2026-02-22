import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { Task } from './entities/task.entity';
import { ITasksRepository } from './interfaces/tasks-repository.interface';

describe('TasksService', () => {
  let service: TasksService;

  // Criamos um Mock do Repositório
  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findBy: jest.fn(),
    findAllByUser: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: ITasksRepository, // Injetamos o TOKEN da interface
          useValue: mockRepository, // Usamos o Mock criado acima
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  // Limpa os mocks entre cada teste para evitar "sujeira"
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findBy', () => {
    it('deve retornar uma task se encontrada', async () => {
      const mockTask = { id: 1, title: 'Test' } as Task;
      mockRepository.findBy.mockResolvedValue(mockTask);

      const result = await service.findBy({ id: 1 });

      expect(result).toEqual(mockTask);
      expect(mockRepository.findBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('deve lançar NotFoundException se a task não existir', async () => {
      mockRepository.findBy.mockResolvedValue(null);

      await expect(service.findBy({ id: 1 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('deve atualizar a task se o usuário for o dono', async () => {
      const user = { id: 10 } as User;
      const existingTask = { id: 1, title: 'Old', user: user } as Task;
      const updateDto = { title: 'New' };

      // Mockando a busca interna que o update faz
      mockRepository.findBy.mockResolvedValue(existingTask);
      mockRepository.save.mockResolvedValue({ ...existingTask, ...updateDto });

      const result = await service.update(1, updateDto, user);

      expect(result.title).toBe('New');
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });
});
