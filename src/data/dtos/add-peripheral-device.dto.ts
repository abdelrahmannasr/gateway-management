import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { PeripheralDeviceDto } from './peripheral-device.dto';

export class AddPeripheralDeviceDto {
  @ApiProperty({
    example: '1',
    description: 'Gateway Id',
    required: true,
  })
  @IsNotEmpty()
  gatewayId: number;

  @ApiProperty({
    description: 'Devices',
    type: [PeripheralDeviceDto],
    required: true,
  })
  @Type(() => PeripheralDeviceDto)
  @IsArray()
  @ValidateNested()
  peripheralDevices: PeripheralDeviceDto[];
}
