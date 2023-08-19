import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  AddPeripheralDeviceDto,
  Collection,
  Constants,
  DeletePeripheralDeviceDto,
  Gateway,
  GatewayDto,
  GatewaysRepository,
  PeripheralDevice,
} from './data';

@Injectable()
export class AppService {
  private logger = new Logger('AppService', { timestamp: true });

  constructor(private gatewaysRepository: GatewaysRepository) {}

  public async addGateway(gatewayDto: GatewayDto): Promise<Gateway> {
    return new Promise(async (resolve, reject) => {
      try {
        const foundGateway =
          await this.gatewaysRepository.getGatewayBySerialNumber(
            gatewayDto.serialNumber,
          );

        if (foundGateway && foundGateway instanceof Gateway)
          return reject(
            new HttpException(
              `Serial Number ${gatewayDto.serialNumber} already exist`,
              HttpStatus.BAD_REQUEST,
            ),
          );
        const gateway = new Gateway();
        gateway.id = await this.gatewaysRepository.generateNewId();
        gateway.serialNumber = gatewayDto.serialNumber;
        gateway.name = gatewayDto.name;
        gateway.ipv4Address = gatewayDto.ipv4Address;
        if (gatewayDto.peripheralDevices) {
          if (
            gatewayDto.peripheralDevices.length >
            Constants.MAX_PERIPHERAL_DEVICES
          )
            return reject(
              new HttpException(
                `Devices cannot exceed more than ${Constants.MAX_PERIPHERAL_DEVICES} Device`,
                HttpStatus.BAD_REQUEST,
              ),
            );
          gateway.peripheralDevices = [];
          gatewayDto.peripheralDevices.forEach((element, index) => {
            const device = new PeripheralDevice();
            device.id = ++index;
            device.uid = element.uid;
            device.vendor = element.vendor;
            device.dateCreated = new Date();
            device.status = element.status;
            gateway.peripheralDevices.push(device);
          });
        }

        return resolve(this.gatewaysRepository.addGateway(gateway));
      } catch (error) {
        this.logger.error(error);
        return reject(new InternalServerErrorException());
      }
    });
  }

  public async addDevice(
    addPeripheralDeviceDto: AddPeripheralDeviceDto,
  ): Promise<Gateway> {
    return new Promise(async (resolve, reject) => {
      try {
        const foundGateway = await this.gatewaysRepository.getGatewayById(
          addPeripheralDeviceDto.gatewayId,
        );
        if (!foundGateway || !(foundGateway instanceof Gateway))
          return reject(
            new HttpException(
              `Gateway with ${addPeripheralDeviceDto.gatewayId} id is not exist`,
              HttpStatus.NOT_FOUND,
            ),
          );
        if (addPeripheralDeviceDto.peripheralDevices) {
          if (
            foundGateway.peripheralDevices &&
            foundGateway.peripheralDevices.length +
              addPeripheralDeviceDto.peripheralDevices.length >
              Constants.MAX_PERIPHERAL_DEVICES
          )
            return reject(
              new HttpException(
                `Devices cannot exceeded more than ${Constants.MAX_PERIPHERAL_DEVICES} Device`,
                HttpStatus.BAD_REQUEST,
              ),
            );
          let lastDeviceId = 0;

          if (
            !foundGateway.peripheralDevices ||
            foundGateway.peripheralDevices.length === 0
          ) {
            lastDeviceId = 1;
            foundGateway.peripheralDevices = [];
          } else {
            lastDeviceId = await this.gatewaysRepository.generateNewId(
              Collection.PeripheralDevice,
              addPeripheralDeviceDto.gatewayId,
            );
          }
          addPeripheralDeviceDto.peripheralDevices.forEach((element) => {
            const device = new PeripheralDevice();
            device.id = lastDeviceId++;
            device.uid = element.uid;
            device.vendor = element.vendor;
            device.dateCreated = new Date();
            device.status = element.status;
            foundGateway.peripheralDevices.push(device);
          });
          return resolve(this.gatewaysRepository.updateGateway(foundGateway));
        }
      } catch (error) {
        this.logger.error(error);
        return reject(new InternalServerErrorException());
      }
    });
  }

  public async deleteDevice(
    deletePeripheralDeviceDto: DeletePeripheralDeviceDto,
  ): Promise<Gateway> {
    return new Promise(async (resolve, reject) => {
      try {
        const foundGateway = await this.gatewaysRepository.getGatewayById(
          deletePeripheralDeviceDto.gatewayId,
        );
        if (!foundGateway || !(foundGateway instanceof Gateway))
          return reject(
            new HttpException(
              `Gateway with ${deletePeripheralDeviceDto.gatewayId} id is not exist`,
              HttpStatus.NOT_FOUND,
            ),
          );
        if (
          !foundGateway.peripheralDevices ||
          foundGateway.peripheralDevices.length === 0
        )
          return reject(
            new HttpException(
              `Devices ${deletePeripheralDeviceDto.deviceId} is not exist for this gateway`,
              HttpStatus.BAD_REQUEST,
            ),
          );
        const foundDevice = foundGateway.peripheralDevices.find(
          (device) => device.id === deletePeripheralDeviceDto.deviceId,
        );
        if (!foundDevice)
          return reject(
            new HttpException(
              `Devices ${deletePeripheralDeviceDto.deviceId} is not exist for this gateway`,
              HttpStatus.BAD_REQUEST,
            ),
          );
        const deviceIndex = foundGateway.peripheralDevices.indexOf(foundDevice);
        foundGateway.peripheralDevices.splice(deviceIndex, 1);
        return resolve(this.gatewaysRepository.updateGateway(foundGateway));
      } catch (error) {
        this.logger.error(error);
        return reject(new InternalServerErrorException());
      }
    });
  }

  public async getAllGateways(): Promise<Gateway[]> {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(this.gatewaysRepository.getAllGateways());
      } catch (error) {
        this.logger.error(error);
        return reject(new InternalServerErrorException());
      }
    });
  }

  public async getGatewayById(id: number): Promise<Gateway> {
    return new Promise(async (resolve, reject) => {
      try {
        const foundGateway = this.gatewaysRepository.getGatewayById(id);
        if (!foundGateway)
          return reject(
            new HttpException(`Gateway is not found`, HttpStatus.NOT_FOUND),
          );
        return resolve(foundGateway);
      } catch (error) {
        this.logger.error(error);
        return reject(new InternalServerErrorException());
      }
    });
  }

  public async getGatewayTById(id: number): Promise<Gateway> {
    return new Promise(async (resolve, reject) => {
      try {
        const foundGateway = this.gatewaysRepository.getGatewayById(id);
        if (!foundGateway)
          return reject(
            new HttpException(`Gateway is not found`, HttpStatus.NOT_FOUND),
          );
        return resolve(foundGateway);
      } catch (error) {
        this.logger.error(error);
        return reject(new InternalServerErrorException());
      }
    });
  }

  public async getGatewayBySerialNumber(
    serialNumber: string,
  ): Promise<Gateway> {
    return new Promise(async (resolve, reject) => {
      try {
        const foundGateway =
          this.gatewaysRepository.getGatewayBySerialNumber(serialNumber);
        if (!foundGateway)
          return reject(
            new HttpException(`Gateway is not found`, HttpStatus.NOT_FOUND),
          );
        return resolve(foundGateway);
      } catch (error) {
        this.logger.error(error);
        return reject(new InternalServerErrorException());
      }
    });
  }
}
