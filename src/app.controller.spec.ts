import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import {
  AddPeripheralDeviceDto,
  DeletePeripheralDeviceDto,
  DeviceStatus,
  Gateway,
  GatewayDto,
} from './data';

// Add Gateway
describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            addGateway: jest.fn(),
          },
        },
        Logger,
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  describe('addGateway', () => {
    it('should add a new gateway', async () => {
      const gatewayDto: GatewayDto = {
        serialNumber: '9375932-3322-015',
        name: 'Gateway 1',
        ipv4Address: '192.168.1.1',
        peripheralDevices: [
          {
            uid: 1,
            vendor: 'Cisco',
            status: DeviceStatus.Offline,
          },
        ],
      };

      const createdGateway: Gateway = {
        id: 1,
        serialNumber: '9375932-3322-015',
        name: 'Gateway 1',
        ipv4Address: '192.168.1.1',
        peripheralDevices: [
          {
            id: 1,
            uid: 1,
            vendor: 'Cisco',
            dateCreated: new Date(),
            status: DeviceStatus.Offline,
          },
        ],
      };

      (service.addGateway as jest.Mock).mockResolvedValue(createdGateway);

      const result = await controller.addGateway(gatewayDto);

      expect(result).toBe(createdGateway);
    });

    it('should throw InternalServerErrorException on service error', async () => {
      const gatewayDto: GatewayDto = {
        serialNumber: '9375932-3322-015',
        name: 'Gateway 1',
        ipv4Address: '192.168.1.1',
        peripheralDevices: [
          {
            uid: 1,
            vendor: 'Cisco',
            status: DeviceStatus.Offline,
          },
        ],
      };

      (service.addGateway as jest.Mock).mockRejectedValue(new Error());

      await expect(controller.addGateway(gatewayDto)).rejects.toThrow();
    });
  });
});

// Get all Gateways
describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getAllGateways: jest.fn(),
          },
        },
        Logger,
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  describe('getAllGateways', () => {
    it('should retrieve all gateways', async () => {
      const mockGateways: Gateway[] = [
        {
          id: 1,
          serialNumber: '9375932-3322-015',
          name: 'Gateway 1',
          ipv4Address: '192.168.1.1',
          peripheralDevices: [
            {
              id: 1,
              uid: 1,
              vendor: 'Cisco',
              dateCreated: new Date(),
              status: DeviceStatus.Offline,
            },
          ],
        },
        {
          id: 2,
          serialNumber: '9375932-3322-015',
          name: 'Gateway 1',
          ipv4Address: '192.168.1.1',
          peripheralDevices: [
            {
              id: 1,
              uid: 1,
              vendor: 'Cisco',
              dateCreated: new Date(),
              status: DeviceStatus.Offline,
            },
          ],
        },
      ];

      (service.getAllGateways as jest.Mock).mockResolvedValue(mockGateways);

      const result = await controller.getAllGateways();

      expect(result).toEqual(mockGateways);
    });

    it('should throw InternalServerErrorException on service error', async () => {
      (service.getAllGateways as jest.Mock).mockRejectedValue(new Error());

      await expect(controller.getAllGateways()).rejects.toThrow();
    });
  });
});

// Get Gateway by Id
describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getGatewayById: jest.fn(),
          },
        },
        Logger,
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  describe('getGatewayById', () => {
    it('should retrieve a gateway by id', async () => {
      const id = 1;
      const mockGateway: Gateway = {
        id: 1,
        serialNumber: '9375932-3322-015',
        name: 'Gateway 1',
        ipv4Address: '192.168.1.1',
        peripheralDevices: [
          {
            id: 1,
            uid: 1,
            vendor: 'Cisco',
            dateCreated: new Date(),
            status: DeviceStatus.Offline,
          },
        ],
      };

      (service.getGatewayById as jest.Mock).mockResolvedValue(mockGateway);

      const result = await controller.getGatewayById(id);

      expect(result).toEqual(mockGateway);
    });

    it('should throw InternalServerErrorException on service error', async () => {
      const id = 1;

      (service.getGatewayById as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );

      await expect(controller.getGatewayById(id)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});

// Get Gateway by Serial Number
describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getGatewayBySerialNumber: jest.fn(),
          },
        },
        Logger,
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  describe('getGatewayBySerialNumber', () => {
    it('should retrieve a gateway by serial number', async () => {
      const serialNumber = 'ABC123';
      const mockGateway: Gateway = {
        id: 1,
        serialNumber: '9375932-3322-015',
        name: 'Gateway 1',
        ipv4Address: '192.168.1.1',
        peripheralDevices: [
          {
            id: 1,
            uid: 1,
            vendor: 'Cisco',
            dateCreated: new Date(),
            status: DeviceStatus.Offline,
          },
        ],
      };

      (service.getGatewayBySerialNumber as jest.Mock).mockResolvedValue(
        mockGateway,
      );

      const result = await controller.getGatewayBySerialNumber(serialNumber);

      expect(result).toEqual(mockGateway);
    });

    it('should throw InternalServerErrorException on service error', async () => {
      const serialNumber = 'ABC123';

      (service.getGatewayBySerialNumber as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );

      await expect(
        controller.getGatewayBySerialNumber(serialNumber),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});

// Add Gateway Device
describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            addDevice: jest.fn(),
          },
        },
        Logger,
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  describe('addDevice', () => {
    it('should add a new device to a gateway', async () => {
      const addPeripheralDeviceDto: AddPeripheralDeviceDto = {
        gatewayId: 1,
        peripheralDevices: [
          {
            uid: 1,
            vendor: 'Cisco',
            status: DeviceStatus.Offline,
          },
        ],
      };

      const mockGateway: Gateway = {
        id: 1,
        serialNumber: '9375932-3322-015',
        name: 'Gateway 1',
        ipv4Address: '192.168.1.1',
        peripheralDevices: [
          {
            id: 1,
            uid: 1,
            vendor: 'Cisco',
            dateCreated: new Date(),
            status: DeviceStatus.Offline,
          },
        ],
      };

      (service.addDevice as jest.Mock).mockResolvedValue(mockGateway);

      const result = await controller.addDevice(addPeripheralDeviceDto);

      expect(result).toEqual(mockGateway);
    });

    it('should throw InternalServerErrorException on service error', async () => {
      const addPeripheralDeviceDto: AddPeripheralDeviceDto = {
        gatewayId: 1,
        peripheralDevices: [
          {
            uid: 1,
            vendor: 'Cisco',
            status: DeviceStatus.Offline,
          },
        ],
      };

      (service.addDevice as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );

      await expect(
        controller.addDevice(addPeripheralDeviceDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});

// Delete Gateway Device
describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            deleteDevice: jest.fn(),
          },
        },
        Logger,
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  describe('deleteDevice', () => {
    it('should delete a device from a gateway', async () => {
      const deletePeripheralDeviceDto: DeletePeripheralDeviceDto = {
        gatewayId: 1,
        deviceId: 1,
      };

      const mockGateway: Gateway = {
        id: 1,
        serialNumber: '9375932-3322-015',
        name: 'Gateway 1',
        ipv4Address: '192.168.1.1',
        peripheralDevices: [
          {
            id: 1,
            uid: 1,
            vendor: 'Cisco',
            dateCreated: new Date(),
            status: DeviceStatus.Offline,
          },
        ],
      };

      (service.deleteDevice as jest.Mock).mockResolvedValue(mockGateway);

      const result = await controller.deleteDevice(deletePeripheralDeviceDto);

      expect(result).toEqual(mockGateway);
    });

    it('should throw InternalServerErrorException on service error', async () => {
      const deletePeripheralDeviceDto: DeletePeripheralDeviceDto = {
        gatewayId: 1,
        deviceId: 1,
      };

      (service.deleteDevice as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );

      await expect(
        controller.deleteDevice(deletePeripheralDeviceDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
