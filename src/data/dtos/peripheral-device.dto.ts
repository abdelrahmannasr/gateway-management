import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { DeviceStatus } from '../common';

export class PeripheralDeviceDto {
  @ApiProperty({
    example: '001',
    description: 'Device UID',
    required: true,
  })
  @IsNotEmpty()
  uid: number;

  @ApiProperty({
    example: 'Cisco',
    description: 'Device Vendor Name',
    required: true,
  })
  @IsNotEmpty()
  vendor: string;

  @ApiProperty({
    enum: Object.values(DeviceStatus),
    example: DeviceStatus.Offline,
    description: 'Device State',
    required: true,
  })
  @IsEnum(DeviceStatus)
  status: DeviceStatus;
}
