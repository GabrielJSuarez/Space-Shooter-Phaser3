import 'jest-localstorage-mock';
import getDataFromStorage from "../Objects/localStorage";

it('Test if a name can be saved in the local session', () => {
    getDataFromStorage.setUser('Gabriel');
    expect(localStorage.getItem('user')).toEqual('Gabriel');
});

it('Test if a name can be retrieved from local storage', () => {
    localStorage.clear();
    getDataFromStorage.setUser();
    expect(localStorage.getItem('user')).toEqual('Anonymous');
});