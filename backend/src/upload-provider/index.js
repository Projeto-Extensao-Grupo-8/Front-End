'use strict';

module.exports = {
  init(providerOptions) {
    const microserviceUrl = providerOptions.microserviceUrl;
    const publicUrl = providerOptions.publicUrl || '';

    async function uploadBuffer(buffer, filename, mime) {
      const FormData = require('form-data');
      
      const form = new FormData();
      form.append('file', buffer, {
        filename: filename,
        contentType: mime,
      });

      const response = await fetch(`${microserviceUrl}/upload`, {
        method: 'POST',
        body: form,
        headers: form.getHeaders(),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Microservice upload error ${response.status}: ${text}`);
      }

      const key = await response.text();
      return key.trim();
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