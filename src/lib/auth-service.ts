import fs from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';

const AUTH_FILE_PATH = path.join(process.cwd(), 'src/data/auth.json');

interface User {
    id: string;
    email: string;
    role: 'user' | 'admin';
    name?: string;
    password?: string;
}

interface AuthData {
    users: User[];
}

export async function getAuthData(): Promise<AuthData> {
    const data = await fs.readFile(AUTH_FILE_PATH, 'utf-8');
    return JSON.parse(data);
}

export async function updateAuthData(newData: AuthData) {
    await fs.writeFile(AUTH_FILE_PATH, JSON.stringify(newData, null, 2), 'utf-8');
}

export async function getSession() {
    const session = cookies().get('bidauto_session');
    if (!session?.value) return null;

    try {
        const userData = JSON.parse(session.value);
        // In a real app, we would verify a JWT, but for this MVP 
        // we'll check against the local file
        const authData = await getAuthData();
        const user = authData.users.find((u: User) => u.id === userData.id);
        return user || null;
    } catch {
        return null;
    }
}

export async function loginAction(email: string, password: string) {
    const authData = await getAuthData();
    const user = authData.users.find((u: User) => u.email === email && u.password === password);

    if (!user) return { error: "Invalid credentials" };

    // Set session cookie
    cookies().set('bidauto_session', JSON.stringify({ id: user.id, role: user.role }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 4, // 4 hours
    });

    return { success: true, user };
}

export async function logoutAction() {
    cookies().delete('bidauto_session');
}

export async function changePasswordAction(currentPass: string, newPass: string) {
    const sessionUser = await getSession();
    if (!sessionUser) return { error: "Unauthorized" };

    const authData = await getAuthData();
    const userIndex = authData.users.findIndex((u: User) => u.id === sessionUser.id);

    if (userIndex === -1) return { error: "User not found" };
    if (authData.users[userIndex].password !== currentPass) return { error: "Current password incorrect" };

    authData.users[userIndex].password = newPass;
    await updateAuthData(authData);

    return { success: true };
}
