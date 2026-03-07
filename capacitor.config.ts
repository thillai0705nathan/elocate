import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.elocate.app',
    appName: 'ELocate',
    webDir: 'out',
    server: {
        androidScheme: 'https'
    }
};

export default config;
