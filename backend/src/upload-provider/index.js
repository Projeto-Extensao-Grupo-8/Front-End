'use strict';

module.exports = {
  init(providerOptions) {
    const microserviceUrl = providerOptions.microserviceUrl;
    const publicUrl = providerOptions.publicUrl || '';

    async function uploadBuffer(buffer, filename, mime) {
      const FormData = require('form-data');
      const http = require('http');
      const https = require('https');

      const form = new FormData();
      form.append('file', buffer, {
        filename: filename,
        contentType: mime,
      });

      return new Promise((resolve, reject) => {
        const url = new URL(`${microserviceUrl}/upload`);
        const transport = url.protocol === 'https:' ? https : http;

        const options = {
          hostname: url.hostname,
          port: url.port || (url.protocol === 'https:' ? 443 : 80),
          path: url.pathname,
          method: 'POST',
          headers: form.getHeaders(),
        };

        const req = transport.request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(data.trim());
            } else {
              reject(new Error(`Microservice upload error ${res.statusCode}: ${data}`));
            }
          });
        });

        req.on('error', reject);
        form.pipe(req);
      });
    }

    return {
      checkFileSize(file, { sizeLimit } = {}) {
        if (sizeLimit && file.size > sizeLimit / 1024) {
          throw new Error(`File size limit exceeded: ${file.name}`);
        }
      },

      async upload(file) {
        const filename = `${file.hash}${file.ext}`;
        const key = await uploadBuffer(file.buffer, filename, file.mime);
        file.url = publicUrl ? `${publicUrl}/${key}` : `/${key}`;
      },

      async uploadStream(file) {
        const chunks = [];
        for await (const chunk of file.stream) {
          chunks.push(Buffer.from(chunk));
        }
        const buffer = Buffer.concat(chunks);
        const filename = `${file.hash}${file.ext}`;
        const key = await uploadBuffer(buffer, filename, file.mime);
        file.url = publicUrl ? `${publicUrl}/${key}` : `/${key}`;
      },

      async delete() {},

      isPrivate() {
        return false;
      },
    };
  },
};