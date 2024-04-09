export interface Action<T = any, R = any> {
  type: string;
  payload?: T;
  response?: R;
}
