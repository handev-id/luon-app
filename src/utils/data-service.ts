export default class Service {
  store<U>(key: string, data: U) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  find<T>(key: string): T {
    const data = localStorage.getItem(key) as string;

    return JSON.parse(data);
  }
}
