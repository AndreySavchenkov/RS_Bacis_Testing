import { BankAccount, getBankAccount } from '.';

const INITIAL_BALANCE = 777;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(INITIAL_BALANCE)).toEqual({
      _balance: INITIAL_BALANCE,
    });
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(INITIAL_BALANCE).withdraw(800)).toThrowError(
      `Insufficient funds: cannot withdraw more than ${INITIAL_BALANCE}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = new BankAccount(INITIAL_BALANCE);
    const account2 = new BankAccount(0);

    expect(() => account1.transfer(800, account2)).toThrowError(
      `Insufficient funds: cannot withdraw more than ${INITIAL_BALANCE}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = new BankAccount(INITIAL_BALANCE);

    expect(() => account.transfer(800, account)).toThrowError(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const account = new BankAccount(INITIAL_BALANCE);
    const depositCount = 223;

    expect(account.deposit(depositCount)).toEqual({
      _balance: INITIAL_BALANCE + depositCount,
    });
  });

  test('should withdraw money', () => {
    const account = new BankAccount(INITIAL_BALANCE);
    const withdrawCount = 100;

    expect(account.withdraw(withdrawCount)).toEqual({
      _balance: INITIAL_BALANCE - withdrawCount,
    });
  });

  test('should transfer money', () => {
    const initialBalance = 777;
    const account1 = new BankAccount(initialBalance);
    const account2 = new BankAccount(0);

    expect(account1.transfer(200, account2)).toEqual({
      _balance: 577,
    });
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 777;
    const account = new BankAccount(initialBalance);
    const result = await account.fetchBalance();

    typeof result === 'number' && expect(typeof result).toEqual('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = new BankAccount(0);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(INITIAL_BALANCE);
    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(0);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
