import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dto/create-category-dto';

@Controller('categories')
export class CategoriesController {

    constructor(private catServ: CategoriesService){}

    @Post()
    create(@Body() catDto : CreateCategoryDto, @Res() response){
        this.catServ.createCategory(catDto)
            .then( cat => {
                response.status(HttpStatus.CREATED).json(cat);
            }).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the creation of the category'});
            });
    }

    @Post('bulk')
    createMany(@Body() catsDto: CreateCategoryDto[], @Res() response) {
        this.catServ.createCategories(catsDto)
            .then(cats => {
                response.status(HttpStatus.CREATED).json(cats);
            })
            .catch(() => {
                response.status(HttpStatus.FORBIDDEN).json(
                    { mensaje: 'Error in the creation of categories' }
                );
            });
    }

    @Get()
    getAll(@Res() response){
        this.catServ.getAll()
            .then( catsList => {
                response.status(HttpStatus.OK).json(catsList);
            }).catch( () => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the getting of the categories'});
            });
    }

    @Get(':id')
    getById(@Res() response,@Param('id') idCat){
        this.catServ.getById(idCat)
            .then( cat => {
                response.status(HttpStatus.OK).json(cat);
            }).catch( () => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the getting of the category by id'});
            });
    }

    @Put(':id')
    update(@Body() updateCat: CreateCategoryDto, @Res() response, @Param('id') idCat : number){
        this.catServ.updateCategory(idCat, updateCat)
            .then(catUpdated => {
                response.status(HttpStatus.OK).json(catUpdated);
            }).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the modification of the category'});
            });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idCat : number){
        this.catServ.deleteCategory(idCat)
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the elimination of the category'});
            });
    }

    @Delete()
    deleteAll(@Res() response){
        this.catServ.deleteAll()
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the elimination of all the categories'});
            });
    }
}