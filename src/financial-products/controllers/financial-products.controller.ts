import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { FinancialProductsService } from '../services/financial-products.service';
import { CreateFinancialProductDto } from '../dto/create-financial-product-dto';

@Controller('financial-products')
export class FinancialProductsController {

    constructor(private financialProductsService: FinancialProductsService){}

    @Post()
    create(@Body() productDto : CreateFinancialProductDto, @Res() response){
        this.financialProductsService.createFinancialProduct(productDto)
            .then( product => {
                response.status(HttpStatus.CREATED).json(product);
            }).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the creation of the financial product'});
            });
    }

    @Post('bulk')
    createMany(@Body() productsDto: CreateFinancialProductDto[], @Res() response) {
        this.financialProductsService.createFinancialProducts(productsDto)
            .then(products => {
                response.status(HttpStatus.CREATED).json(products);
            })
            .catch(() => {
                response.status(HttpStatus.FORBIDDEN).json(
                    { mensaje: 'Error in the creation of financial products' }
                );
            });
    }

    @Get()
    getAll(@Res() response){
        this.financialProductsService.getAll()
            .then( productsList => {
                response.status(HttpStatus.OK).json(productsList);
            }).catch( () => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the getting of the financial products'});
            });
    }

    @Get(':id')
    getById(@Res() response,@Param('id') idProduct){
        this.financialProductsService.getById(idProduct)
            .then( product => {
                response.status(HttpStatus.OK).json(product);
            }).catch( () => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the getting of the financial product by id'});
            });
    }

    @Put(':id')
    update(@Body() updateProductDto: CreateFinancialProductDto, @Res() response, @Param('id') idProduct : number){
        this.financialProductsService.updateFinancialProduct(idProduct, updateProductDto)
            .then(productUpdated => {
                response.status(HttpStatus.OK).json(productUpdated);
            }).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the modification of the financial product'});
            });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idProduct : number){
        this.financialProductsService.deleteProduct(idProduct)
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the elimination of the financial product'});
            });
    }

    @Delete()
    deleteAll(@Res() response){
        this.financialProductsService.deleteAll()
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the elimination of all the financial products'});
            });
    }
}
