import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { PeripheralDeviceDto } from './peripheral-device.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIPv4 } from './../../utilities';

export class GatewayDto {
  @ApiProperty({
    example: '9375932-3322-015',
    description: 'Gateway Serial Number',
    required: true,
  })
  @IsNotEmpty()
  serialNumber: string;

  @ApiProperty({
    example: 'Gateway 1',
    description: 'Gateway Name',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '192.168.1.1',
    description: 'Gateway IPv4',
    required: true,
  })
  @IsIPv4()
  ipv4Address: string;

  @ApiProperty({
    description: 'Devices',
    type: [PeripheralDeviceDto],
    required: false,
  })
  @IsOptional()
  @Type(() => PeripheralDeviceDto)
  @IsArray()
  @ValidateNested()
  peripheralDevices: PeripheralDeviceDto[];
}
