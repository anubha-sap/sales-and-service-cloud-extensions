import { NotFoundException } from '@nestjs/common';
import { ServerException } from './server-exception';

describe('Testing the common exception ', () => {
  it('Should test that instance is created correctly when data is passed', () => {
    const error = new NotFoundException();
    const anyException = new ServerException(error, 'ClassName', 'MethodName');
    expect(anyException.getClassName()).toEqual('ClassName');
    expect(anyException.getMethodName()).toEqual('MethodName');
    expect(anyException.getError()).toBeInstanceOf(NotFoundException);
  });

  it('Should test that instance is created correctly when another instance of same class is passed', () => {
    const error = new NotFoundException();
    const anyException = new ServerException(error, 'ClassName', 'MethodName');
    const anotherAnyExceptin = new ServerException(
      anyException,
      'ClassName2',
      'MethodName2',
    );
    expect(anotherAnyExceptin.getClassName()).toEqual('ClassName');
    expect(anotherAnyExceptin.getMethodName()).toEqual('MethodName');
    expect(anotherAnyExceptin.getError()).toBeInstanceOf(NotFoundException);
  });
});
