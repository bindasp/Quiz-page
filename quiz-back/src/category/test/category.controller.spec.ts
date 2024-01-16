import { CategoryController } from '../category.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';

describe('CategoryController', () => {
  let controller: CategoryController;

  const mockCategoryService = {
    getAllCategories: jest.fn(() => {
      return [
        { id: 1, categoryName: 'brak' },
        { id: 2, categoryName: 'informatyka' },
      ];
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    })
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
      .compile();
    controller = module.get<CategoryController>(CategoryController);
  });

  it('should de defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all categories', () => {
    expect(controller.getAllCategories()).toEqual([
      { id: 1, categoryName: 'brak' },
      { id: 2, categoryName: 'informatyka' },
    ]);
    expect(mockCategoryService.getAllCategories).toHaveBeenCalled();
  });
});
