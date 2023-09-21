import { saveData, removeData } from "./LocalData";

const token = 'ABC123';
const role = 'Admin';
const name = 'Jane Doe';

it('should save token, role, and name to local storage', () => {
    saveData(token, role, name);
    expect(localStorage.getItem('token')).toBe('ABC123');
    expect(localStorage.getItem('role')).toBe('Admin');
    expect(localStorage.getItem('name')).toBe('Jane Doe');
});

it('should remove token from localStorage when token is a string', () => {
    removeData(token, role, name);
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
    expect(localStorage.getItem('name')).toBeNull();
});