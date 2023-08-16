import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeletePeripheralDeviceDto {
  @ApiProperty({
    example: '1',
    description: 'Gateway Id',
    required: true,
  })
  @IsNotEmpty()
  gatewayId: number;

  @ApiProperty({
    example: '1',
    description: 'Device Id',
    required: true,
  })
  @IsNotEmpty()
  deviceId: number;
}
