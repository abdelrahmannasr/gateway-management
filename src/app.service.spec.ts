import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import {
  Constants,
  DeviceStatus,
  Gateway,
  GatewayDto,
  GatewaysRepository,
} from './data';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

describe('AppService', () => {
  let appService: AppService;
  let gatewaysRepository: GatewaysRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: GatewaysRepository,
          useValue: {
            getGatewayBySerialNumber: jest.fn(),
            generateNewId: jest.fn(),
            addGateway: jest.fn(),
          },
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    gatewaysRepository = module.get<GatewaysRepository>(GatewaysRepository);
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

      const mockFoundGateway = null; // Gateway doesn't exist
      const mockGeneratedId = 1;
      const mockAddedGateway: Gateway = {
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

      (
        gatewaysRepository.getGatewayBySerialNumber as jest.Mock
      ).mockResolvedValue(mockFoundGateway);
      (gatewaysRepository.generateNewId as jest.Mock).mockResolvedValue(
        mockGeneratedId,
      );
      (gatewaysRepository.addGateway as jest.Mock).mockResolvedValue(
        mockAddedGateway,
      );

      const result = await appService.addGateway(gatewayDto);

      expect(result).toEqual(mockAddedGateway);
    });

    it('should throw HttpException when a gateway with the same serial number exists', async () => {
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

      const mockFoundGateway: Gateway = new Gateway();
      mockFoundGateway.id = 1;
      mockFoundGateway.serialNumber = '9375932-3322-015';
      mockFoundGateway.name = 'Gateway 1';
      mockFoundGateway.ipv4Address = '192.168.1.1';
      mockFoundGateway.peripheralDevices = [
        {
          id: 1,
          uid: 1,
          vendor: 'Cisco',
          dateCreated: new Date(),
          status: DeviceStatus.Offline,
        },
      ];

      (
        gatewaysRepository.getGatewayBySerialNumber as jest.Mock
      ).mockResolvedValue(mockFoundGateway);

      await expect(appService.addGateway(gatewayDto)).rejects.toThrow(
        new HttpException(
          `Serial Number ${gatewayDto.serialNumber} already exist`,
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should add peripheral devices when provided in the DTO', async () => {
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

      const mockFoundGateway = null; // Gateway doesn't exist
      const mockGeneratedId = 1;
      const mockAddedGateway: Gateway = {
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

      (
        gatewaysRepository.getGatewayBySerialNumber as jest.Mock
      ).mockResolvedValue(mockFoundGateway);
      (gatewaysRepository.generateNewId as jest.Mock).mockResolvedValue(
        mockGeneratedId,
      );
      (gatewaysRepository.addGateway as jest.Mock).mockResolvedValue(
        mockAddedGateway,
      );

      const result = await appService.addGateway(gatewayDto);

      expect(result).toEqual(mockAddedGateway);
      expect(gatewaysRepository.addGateway).toHaveBeenCalledWith(
        expect.objectContaining({
          peripheralDevices: expect.any(Array),
        }),
      );
    });

    it('should throw HttpException when the number of peripheral devices exceeds the limit', async () => {
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
          {
            uid: 2,
            vendor: 'Cisco',
            status: DeviceStatus.Offline,
          },
          {
            uid: 3,
            vendor: 'Cisco',
            status: DeviceStatus.Offline,
          },
          {
            uid: 4,
            vendor: 'Cisco',
            status: DeviceStatus.Offline,
          },
          {
            uid: 5,
            vendor: 'Cisco',
            status: DeviceStatus.Offline,
          },
          {
            uid: 6,
            vendor: 'Cisco',
            status: DeviceStatus.Offline,
          },
          {
            uid: 7,
            vendor: 'Cisco',
            status: DeviceStatus.Offline,
          },
          {
            uid: 8,
            vendor: 'Cisco',
            status: DeviceStatus.Offline,
          },
          {
            uid: 9,
            vendor: 'Cisco',
            status: DeviceStatus.Offline,
          },
          {
            uid: 10,
            vendor: 'Cisco',
            status: DeviceStatus.Offline,
          },
          {
            uid: 11,
            vendor: 'Cisco',
            status: DeviceStatus.Offline,
          },
        ],
      };

      const mockFoundGateway = null; // Gateway doesn't exist

      (
        gatewaysRepository.getGatewayBySerialNumber as jest.Mock
      ).mockResolvedValue(mockFoundGateway);

      await expect(appService.addGateway(gatewayDto)).rejects.toThrow(
        new HttpException(
          `Devices cannot exceed more than ${Constants.MAX_PERIPHERAL_DEVICES} Device`,
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should throw InternalServerErrorException on repository error', async () => {
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

      (
        gatewaysRepository.getGatewayBySerialNumber as jest.Mock
      ).mockRejectedValue(new Error());

      await expect(appService.addGateway(gatewayDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
