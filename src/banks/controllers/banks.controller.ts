import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateBankDto } from '../dto/create-bank-dto';
import { BanksService } from '../services/banks.service';

@Controller('banks')
export class BanksController {

    constructor(private banksService: BanksService){}

    @Post()
    create(@Body() createBankDto : CreateBankDto, @Res() response){
        this.banksService.createBank(createBankDto)
            .then( bank => {
                response.status(HttpStatus.CREATED).json(bank);
            }).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the creation of the bank'});
            });
    }

    @Post('bulk')
    createMany(@Body() createBanksDto: CreateBankDto[], @Res() response) {
        this.banksService.createBanks(createBanksDto)
            .then(banks => {
                response.status(HttpStatus.CREATED).json(banks);
            })
            .catch(() => {
                response.status(HttpStatus.FORBIDDEN).json(
                    { mensaje: 'Error in the creation of banks' }
                );
            });
    }

    @Get()
    getAll(@Res() response){
        this.banksService.getAll()
            .then( banksList => {
                response.status(HttpStatus.OK).json(banksList);
            }).catch( () => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the getting of the banks'});
            });
    }

    @Get(':id')
    getById(@Res() response,@Param('id') idBank){
        this.banksService.getById(idBank)
            .then( bank => {
                response.status(HttpStatus.OK).json(bank);
            }).catch( () => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the getting of the bank by id'});
            });
    }

    @Put(':id')
    update(@Body() updateBankDto: CreateBankDto, @Res() response, @Param('id') idBank : number){
        this.banksService.updateBank(idBank, updateBankDto)
            .then(bankUpdated => {
                response.status(HttpStatus.OK).json(bankUpdated);
            }).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the modification of the bank'});
            });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idBank : number){
        this.banksService.deleteBank(idBank)
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the elimination of the bank'});
            });
    }

    @Delete()
    deleteAll(@Res() response){
        this.banksService.deleteAll()
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the elimination of all the banks'});
            });
    }
}