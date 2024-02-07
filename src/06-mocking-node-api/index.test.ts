import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';
import fsAsync from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callbackFn = jest.fn();
    const time = 1000;
    const spyTimeout = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callbackFn, time);
    expect(spyTimeout).toHaveBeenCalledWith(callbackFn, time);
    spyTimeout.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callbackFn = jest.fn();
    doStuffByTimeout(callbackFn, 1000);

    expect(callbackFn).not.toBeCalled();

    jest.runAllTimers();
    expect(callbackFn).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callbackFn = jest.fn();
    const time = 1000;
    const spyInterval = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callbackFn, time);
    expect(spyInterval).toHaveBeenCalledWith(callbackFn, time);
    spyInterval.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callbackFn = jest.fn();
    const time = 1000;

    doStuffByInterval(callbackFn, time);
    jest.advanceTimersByTime(3000);
    expect(callbackFn).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const somePath = 'some/path.txt';
    const mockJoin = jest.spyOn(path, 'join');

    await readFileAsynchronously(somePath);
    expect(mockJoin).toBeCalledWith(__dirname, somePath);
    mockJoin.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const somePath = 'some/path.txt';
    const mockExistsSync = jest.spyOn(fs, 'existsSync');

    mockExistsSync.mockReturnValue(false);
    await expect(readFileAsynchronously(somePath)).resolves.toBeNull();
    mockExistsSync.mockRestore();
  });

  test('should return file content if file exists', async () => {
    const somePath = 'some/path.txt';
    const fileContent = Buffer.from('string');
    const mockExistsSync = jest.spyOn(fs, 'existsSync');
    const mockReadFile = jest.spyOn(fsAsync, 'readFile');

    mockReadFile.mockResolvedValue(fileContent);
    mockExistsSync.mockReturnValue(true);

    await expect(readFileAsynchronously(somePath)).resolves.toEqual(
      expect.any(String),
    );

    mockExistsSync.mockRestore();
    mockReadFile.mockRestore();
  });
});
