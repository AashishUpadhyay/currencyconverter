const someFunction = jest.fn(() => __value);
someFunction.__setValue = v => __value = v;
export default someFunction;