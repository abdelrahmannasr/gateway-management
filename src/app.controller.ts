import {
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Body, Post, UsePipes } from '@nestjs/common';
import {
  AddPeripheralDeviceDto,
  Constants,
  DeletePeripheralDeviceDto,
  Gateway,
  GatewayDto,
} from './data';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller(Constants.GATEWAY_PATH)
export class AppController {
  private logger = new Logger('AppController', { timestamp: true });

  constructor(private readonly appService: AppService) {}

  @Post(Constants.ADD_PATH)
  @ApiOperation({
    summary: 'Adding new gateway',
    tags: [Constants.GATEWAY_TAG],
  })
  @ApiResponse({
    status: 200,
    description: 'gateway has been added successfully',
    type: Gateway,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  addGateway(@Body() gatewayDto: GatewayDto): Promise<Gateway> {
    try {
      return this.appService.addGateway(gatewayDto);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Get(Constants.GET_ALL_PATH)
  @ApiOperation({
    summary: 'Retrieving all gateways',
    tags: [Constants.GATEWAY_TAG],
  })
  @ApiResponse({
    status: 200,
    description: 'Gateways has been retrieved successfully',
    type: Gateway,
  })
  getAllGateways(): Promise<Gateway[]> {
    try {
      return this.appService.getAllGateways();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Get(Constants.BY_ID_PATH)
  @ApiOperation({
    summary: 'Retrieving gateways by id',
    tags: [Constants.GATEWAY_TAG],
  })
  @ApiResponse({
    status: 200,
    description: 'Gateway has been retrieved successfully',
    type: Gateway,
  })
  getGatewayById(@Param('id', ParseIntPipe) id: number): Promise<Gateway> {
    try {
      return this.appService.getGatewayById(id);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Get(Constants.GET_GATEWAY_BY_SERIAL_NUMBER_PATH)
  @ApiOperation({
    summary: 'Retrieving gateways by serial number',
    tags: [Constants.GATEWAY_TAG],
  })
  @ApiResponse({
    status: 200,
    description: 'Gateway has been retrieved successfully',
    type: Gateway,
  })
  getGatewayBySerialNumber(
    @Query('serialNumber') serialNumber: string,
  ): Promise<Gateway> {
    try {
      console.log(serialNumber);
      return this.appService.getGatewayBySerialNumber(serialNumber);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Patch(Constants.ADD_PERIPHERAL_DEVICE_PATH)
  @ApiOperation({
    summary: 'Adding new device to gateway',
    tags: [Constants.PERIPHERAL_DEVICE_TAG],
  })
  @ApiResponse({
    status: 200,
    description: 'Device has been added successfully',
    type: Gateway,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  addDevice(
    @Body() addPeripheralDeviceDto: AddPeripheralDeviceDto,
  ): Promise<Gateway> {
    try {
      return this.appService.addDevice(addPeripheralDeviceDto);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Delete(Constants.DELETE_PERIPHERAL_DEVICE_PATH)
  @ApiOperation({
    summary: 'delete device from gateway',
    tags: [Constants.PERIPHERAL_DEVICE_TAG],
  })
  @ApiResponse({
    status: 200,
    description: 'Device has been deleted successfully',
    type: Gateway,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  Device(
    @Body() deletePeripheralDeviceDto: DeletePeripheralDeviceDto,
  ): Promise<Gateway> {
    try {
      return this.appService.deleteDevice(deletePeripheralDeviceDto);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
