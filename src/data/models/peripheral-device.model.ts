import { ApiProperty } from '@nestjs/swagger';
import { DeviceStatus } from '../common';
import { Expose } from 'class-transformer';

export class PeripheralDevice {
  @ApiProperty({
    example: '1',
    description: 'Device id',
    required: true,
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: '001',
    description: 'Device UID',
    required: true,
  })
  @Expose()
  uid: number;

  @ApiProperty({
    example: 'Cisco',
    description: 'Device Vendor Name',
    required: true,
  })
  @Expose()
  vendor: string;

  @ApiProperty({
    example: '01/08/2023',
    description: 'Device Create At',
    required: true,
  })
  @Expose()
  dateCreated: Date;

  @ApiProperty({
    enum: Object.values(DeviceStatus),
    example: DeviceStatus.Offline,
    description: 'Device State',
    required: true,
  })
  @Expose()
  status: string;
}
