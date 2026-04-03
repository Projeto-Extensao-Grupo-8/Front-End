import type { Core } from '@strapi/strapi';
import path from 'path';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      provider: path.join(process.cwd(), 'src', 'upload-provider'),
      providerOptions: {
        microserviceUrl: env('UPLOAD_MICROSERVICE_URL', 'http://localhost:8080'),
        publicUrl: env('UPLOAD_PUBLIC_URL', ''),
      },
    },
  },
});

export default config;
