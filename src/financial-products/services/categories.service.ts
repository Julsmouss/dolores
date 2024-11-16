import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category-dto';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>
    ) {}

    async getAll(): Promise<CategoryEntity[]> {
        return await this.categoryRepository.find({
            relations: {
                financialProducts: true,
            }
        });
    }

    async getById(idCategory: number): Promise<CategoryEntity> {
        return await this.categoryRepository.findOne({
            where: {id: idCategory},
            relations: {
                financialProducts: true,
            }
        });
    }

    async createCategory(newCat: CreateCategoryDto): Promise<CategoryEntity> {
        const cat = new CategoryEntity();
        cat.name = newCat.name;
        return await this.categoryRepository.save(cat);
    }

    async updateCategory(idCat: number, modifiedCat: CreateCategoryDto): Promise<CategoryEntity> {
        const catUpdate: CategoryEntity = await this.categoryRepository.findOneBy({id:idCat});
        catUpdate.name = modifiedCat.name;
        return await this.categoryRepository.save(catUpdate);
    }

    async deleteCategory(idCat: number): Promise<any> {
        return await this.categoryRepository.delete(idCat);
    }

    async createCategories(newCats: CreateCategoryDto[]): Promise<CategoryEntity[]> {
        const catsToSave = newCats.map(newCat => {
            const cat = new CategoryEntity();
            cat.name = newCat.name;
            return cat;
        });
        return await this.categoryRepository.save(catsToSave);
    }
    
    async deleteAll(): Promise<any> {
        return await this.categoryRepository.clear();
    }

}
