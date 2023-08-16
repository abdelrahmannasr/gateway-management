import { ApiProperty } from '@nestjs/swagger';
import { PeripheralDevice } from './peripheral-device.model';
import { Expose, Transform } from 'class-transformer';
import { MapperHelper } from './../../utilities';

export class Gateway {
  @ApiProperty({
    example: '1',
    description: 'Gateway id',
    required: true,
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: '9375932-3322-015',
    description: 'Gateway Serial Number',
    required: true,
  })
  @Expose()
  serialNumber: string;

  @ApiProperty({
    example: 'Gateway 1',
    description: 'Gateway Name',
    required: true,
  })
  @Expose()
  name: string;

  @ApiProperty({
    example: '192.0. 2.146',
    description: 'Gateway IPv4',
    required: true,
  })
  @Expose()
  ipv4Address: string;

  @ApiProperty({
    description: 'Devices',
    required: false,
    type: [PeripheralDevice],
  })
  @Transform(
    ({ obj }) => {
      if (obj.peripheralDevices?.length)
        return MapperHelper.toClientList(
          PeripheralDevice,
          obj.peripheralDevices,
        );
    },
    { toClassOnly: true },
  )
  @Expose()
  peripheralDevices: PeripheralDevice[];
}
