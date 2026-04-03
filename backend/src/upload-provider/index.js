'use strict';

module.exports = {
  init(providerOptions) {
    const microserviceUrl = providerOptions.microserviceUrl;
    const publicUrl = providerOptions.publicUrl || '';

    async function uploadBuffer(buffer, filename, mime) {
      const blob = new Blob([buffer], { type: mime });
      const formData = new FormData();
      formData.append('file', blob, filename);

      const response = await fetch(`${microserviceUrl}/upload`, {
        method: 'POST',
        body: formData,
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

      async delete() {
        // No-op: implement DELETE /upload/{key} on microservice if needed
      },

      isPrivate() {
        return false;
      },
    };
  },
};
