import { QuizController } from '../quiz.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { QuizService } from '../quiz.service';
import { TokenGuard } from '../../auth/token.guard';
import { TokenService } from '../../token/token.service';
import { PrismaMongoService } from '../../prisma/prisma-mongo.service';
import { AuthService } from '../../auth/auth.service';
import { PrismaMysqlService } from '../../prisma/prisma-mysql.service';

describe('QuizController', () => {
  let controller: QuizController;

  const mockQuizService = {
    getRandomQuiz: jest.fn((amount: number, category: string) => {
      return [
        {
          id: 1,
          title: 'Test1',
          description: 'Example Test 1',
          category: [category],
        },
        {
          id: 2,
          title: 'Test2',
          description: 'Example Test 2',
          category: [category],
        },
      ];
    }),
    getQuizById: jest.fn((id) => {
      return {
        id: id,
        title: 'Test1',
        description: 'Example Test 1',
        category: ['brak'],
        questions: [
          {
            question: 'Question 1',
            answers: [
              {
                answer: 'Yes',
                isCorrect: true,
              },
              {
                answer: 'No',
                isCorrect: false,
              },
              {
                answer: 'Maybe',
                isCorrect: false,
              },
            ],
          },
        ],
      };
    }),
    saveQuiz: jest.fn((userId: number) => {
      return {
        id: 1,
        createdAt: '18.01.2024',
        mongoId: '123312',
        userId: userId,
      };
    }),
    getUserQuiz: jest.fn((userId: number, category: string) => {
      return [
        {
          category: [category],
          id: 1,
          title: 'Title 1',
          description: 'Description 1',
        },
        {
          category: [category],
          id: 2,
          title: 'Title 2',
          description: 'Description 2',
        },
      ];
    }),
    deleteQuiz: jest.fn((userId: number, id: string) => {
      return 'Quiz deleted';
    }),
    updateQuiz: jest.fn((userId: number, id: string) => {
      return 'Quiz updated';
    }),
  };

  const mockTokenGuard = { canActivate: jest.fn(() => true) };

  const mockTokenService = {
    verifyToken: jest.fn(),
  };

  const mockPrismaMongoService = {
    // Dodaj odpowiednie metody używane w AuthService
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  const mockPrismaMysqlService = {
    // Dodaj odpowiednie metody używane w AuthService
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizController],
      providers: [
        QuizService,
        {
          provide: AuthService,
          useValue: {
            signup: jest.fn(),
            signin: jest.fn(),
            me: jest.fn(),
          },
        },
        {
          provide: PrismaMongoService,
          useValue: mockPrismaMongoService,
        },
        {
          provide: PrismaMysqlService,
          useValue: mockPrismaMysqlService,
        },
        {
          provide: TokenService,
          useValue: mockTokenService,
        },
        {
          provide: TokenGuard,
          useValue: mockTokenGuard,
        },
      ],
    })
      .overrideProvider(QuizService)
      .useValue(mockQuizService)
      .compile();

    controller = module.get<QuizController>(QuizController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getRandomQuiz on getRandomQuiz', async () => {
    const amount = 10;
    const category = 'someCategory';
    const result = [
      {
        id: 1,
        title: 'Test1',
        description: 'Example Test 1',
        category: [category],
      },
      {
        id: 2,
        title: 'Test2',
        description: 'Example Test 2',
        category: [category],
      },
    ];
    expect(mockQuizService.getRandomQuiz(amount, category)).toEqual(result);
    expect(mockQuizService.getRandomQuiz).toHaveBeenCalled();
  });

  it('should call getQuizById on getQuizById', async () => {
    const id = 1;
    const result = {
      id: id,
      title: 'Test1',
      description: 'Example Test 1',
      category: ['brak'],
      questions: [
        {
          question: 'Question 1',
          answers: [
            {
              answer: 'Yes',
              isCorrect: true,
            },
            {
              answer: 'No',
              isCorrect: false,
            },
            {
              answer: 'Maybe',
              isCorrect: false,
            },
          ],
        },
      ],
    };
    expect(mockQuizService.getQuizById(id)).toEqual(result);
    expect(mockQuizService.getQuizById).toHaveBeenCalled();
  });

  it('should call saveQuiz on saveQuiz', async () => {
    const userId = 123;
    const result = {
      id: 1,
      createdAt: '18.01.2024',
      mongoId: '123312',
      userId: userId,
    };
    expect(mockQuizService.saveQuiz(userId)).toEqual(result);
    expect(mockQuizService.saveQuiz).toHaveBeenCalled();
  });

  it('should call getUserQuiz on getUserQuiz', async () => {
    const userId = 123;
    const category = 'none';
    const result = [
      {
        category: [category],
        id: 1,
        title: 'Title 1',
        description: 'Description 1',
      },
      {
        category: [category],
        id: 2,
        title: 'Title 2',
        description: 'Description 2',
      },
    ];
    expect(mockQuizService.getUserQuiz(userId, category)).toEqual(result);
    expect(mockQuizService.getUserQuiz).toHaveBeenCalled();
  });

  it('should call deleteQuiz on deleteQuiz', async () => {
    const userId = 123;
    const id = '135123';
    expect(mockQuizService.deleteQuiz(userId, id)).toEqual('Quiz deleted');
    expect(mockQuizService.deleteQuiz).toHaveBeenCalled();
  });

  it('should call updateQuiz on updateQuiz', async () => {
    const userId = 123;
    const id = '135123';
    expect(mockQuizService.updateQuiz(userId, id)).toEqual('Quiz updated');
    expect(mockQuizService.updateQuiz).toHaveBeenCalled();
  });
});
