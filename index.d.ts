declare function is<Type>(instance: any, keys: keyof Type|(keyof Type)[]): instance is Type

export { is };
