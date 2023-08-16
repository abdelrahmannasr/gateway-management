export class Constants {
  // API Routes
  public static API_VERSION = 'v0.0.1';
  public static API_PREFIX = 'api';
  public static APP_VERSION = 'v0.0.1';

  // Server Configurations
  public static JSON_SERVER = 'http://localhost:3000/';
  public static PORT = process.env.PORT ? process.env.PORT : '3001';

  // Data Configurations
  public static MAX_PERIPHERAL_DEVICES = 10;

  // Regex
  public static IPV4_REGEX = /^(\d{1,3}\.){3}\d{1,3}$/;

  // Swagger
  public static API_TITLE = 'Managing Gateways API';
  public static API_DESCRIPTION =
    'Managing Gateways API provide the easy way to integrate and handle gateways logic and model with hight quality and performance';
  public static API_TAG = 'Docs';
  public static API_AUTH_TYPE = 'http';

  // Gateway Paths
  public static GATEWAY_PATH = [
    `${Constants.API_VERSION}/${Constants.API_PREFIX}/gateway`,
  ];
  public static GATEWAY_TAG = 'Gateway Management';
  public static PERIPHERAL_DEVICE_TAG = 'Peripheral Device Management';

  // CRUD Paths
  public static ADD_PATH = 'add';
  public static GET_ALL_PATH = 'getAll';
  public static UPDATE_PATH = 'update';
  public static BY_ID_PATH = '/:id';
  public static DELETE_PATH = 'delete';

  // Gateway Paths
  public static GET_GATEWAY_BY_SERIAL_NUMBER_PATH = '/:serialNumber';
  public static ADD_PERIPHERAL_DEVICE_PATH = '/addDevice';
  public static DELETE_PERIPHERAL_DEVICE_PATH = '/deleteDevice';
}
