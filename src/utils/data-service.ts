export default class Service<U> {
  store(key: string, data: U) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  find(key: string) {
    const data = localStorage.getItem(key) as string;

    return JSON.parse(data);
  }
}
