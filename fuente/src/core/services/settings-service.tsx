export class SettingsService {
  
  private static instance: SettingsService;
  public debug: boolean;
  public publicPath: string;
  public appBaseUrl: string;
  public apiRandomUserBaseUrl: string;

  private constructor() {
    this.debug = false;
    this.publicPath = "/"
    this.appBaseUrl = "";
    this.apiRandomUserBaseUrl = "";
  }

  public static getInstance(): SettingsService {
    if (!SettingsService.instance) {
      SettingsService.instance = new SettingsService();
    }

    return SettingsService.instance;
  }

}