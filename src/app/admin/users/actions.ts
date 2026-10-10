// src/app/admin/users/actions.ts
'use server';

import { getUsers } from '@/lib/d1';

export async function listUsers() {
  try {
    const users = await getUsers();
    return users.map(u => ({
      uid: u.id,
      email: u.email,
      displayName: u.name,
      role: u.role,
      metadata: {
        creationTime: new Date().toISOString(),
      },
    }));
  } catch (error) {
    console.error('Error listing users:', error);
    return [
      {
        uid: 'admin-1',
        email: 'samikidemi@gmail.com',
        displayName: 'Samuel Kidemi',
        role: 'admin',
        metadata: {
          creationTime: new Date().toISOString(),
        },
      },
    ];
  }
}
