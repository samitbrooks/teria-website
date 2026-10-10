// functions/api/upload.ts
import { verifySessionToken, parseCookie } from '../_shared/auth';

export const onRequestPost = async (context: any) => {
  try {
    const token = parseCookie(context.request.headers.get('Cookie'), 'admin_session');
    const session = token ? await verifySessionToken(token) : null;

    if (!session) {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const contentType = context.request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await context.request.formData();
      const file = formData.get('file');

      if (!file || typeof file === 'string') {
        return Response.json({ success: false, message: 'No file uploaded' }, { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      let binary = '';
      const chunkSize = 8192;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize) as any);
      }
      const base64 = btoa(binary);
      const mimeType = file.type || 'image/jpeg';
      const dataUrl = `data:${mimeType};base64,${base64}`;

      return Response.json({ success: true, url: dataUrl });
    }

    if (contentType.includes('application/json')) {
      const body = await context.request.json();
      if (body.url) {
        return Response.json({ success: true, url: body.url });
      }
    }

    return Response.json({ success: false, message: 'Invalid upload payload' }, { status: 400 });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};
