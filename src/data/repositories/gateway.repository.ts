import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Gateway } from '../models';
import { Collection, Constants } from '../common';
import { HttpService } from '@nestjs/axios';
import { MapperHelper } from './../../utilities';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class GatewaysRepository {
  private logger = new Logger('GatewaysRepository', { timestamp: true });
  constructor(private httpService: HttpService) {}

  public async addGateway(data: Gateway): Promise<Gateway> {
    const url = `${Constants.JSON_SERVER}${Collection.Gateway}`;
    return new Promise(async (resolve, reject) => {
      try {
        this.httpService.post(url, data).subscribe((response) => {
          resolve(MapperHelper.toClient(Gateway, response.data));
        });
      } catch (error) {
        this.logger.error('Error adding object:', error.message);
        reject(error);
      }
    });
  }

  public async getAllGateways(): Promise<Gateway[]> {
    const url = `${Constants.JSON_SERVER}${Collection.Gateway}`;
    return new Promise(async (resolve, reject) => {
      try {
        this.httpService.get(url).subscribe((response) => {
          resolve(MapperHelper.toClientList(Gateway, response.data));
        });
      } catch (error) {
        this.logger.error('Error fetching object:', error.message);
        reject(error);
      }
    });
  }

  public async getGatewayById(id: number): Promise<Gateway> {
    const url = `${Constants.JSON_SERVER}${Collection.Gateway}/${id}`;
    const { data } = await firstValueFrom(
      this.httpService.get(url).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.code);
          throw new HttpException(`Gateway is not found`, HttpStatus.NOT_FOUND);
        }),
      ),
    );
    return MapperHelper.toClient(Gateway, data);
  }

  public async getGatewayTById(id: number): Promise<Gateway> {
    const url = `${Constants.JSON_SERVER}${Collection.Gateway}/${id}`;
    const { data } = await firstValueFrom(
      this.httpService.get(url).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.code);
          throw new HttpException(`Gateway is not found`, HttpStatus.NOT_FOUND);
        }),
      ),
    );
    return MapperHelper.toClient(Gateway, data);
  }

  public async getGatewayBySerialNumber(
    serialNumber: string,
  ): Promise<Gateway> {
    const url = `${Constants.JSON_SERVER}${Collection.Gateway}?serialNumber=${serialNumber}`;
    return new Promise(async (resolve, reject) => {
      try {
        this.httpService.get(url).subscribe((response) => {
          if (!response.data)
            reject(
              new HttpException(`Gateway is not found`, HttpStatus.NOT_FOUND),
            );
          resolve(MapperHelper.toClient(Gateway, response.data));
        });
      } catch (error) {
        this.logger.error('Error fetching object:', error.message);
        reject(error);
      }
    });
  }

  public async updateGateway(data: Gateway): Promise<Gateway> {
    const url = `${Constants.JSON_SERVER}${Collection.Gateway}/${data.id}`;
    return new Promise(async (resolve, reject) => {
      try {
        this.httpService.put(url, data).subscribe((response) => {
          resolve(MapperHelper.toClient(Gateway, response.data));
        });
      } catch (error) {
        this.logger.error('Error updating object:', error.message);
        reject(error);
      }
    });
  }

  public async generateNewId(
    collection: Collection = Collection.Gateway,
    id = 0,
  ): Promise<number> {
    let collections = [];
    switch (collection) {
      case Collection.Gateway:
        collections = await this.getAllGateways();
        break;
      case Collection.PeripheralDevice:
        const gateway = await this.getGatewayById(id);
        collections = gateway.peripheralDevices;
        break;
    }
    if (!collections || collections.length === 0) return 1;
    const highestId = collections.reduce((maxId, item) => {
      return item.id > maxId ? item.id : maxId;
    }, 0);

    return highestId + 1;
  }
}
