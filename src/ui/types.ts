export enum ViewResponseType {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export class ViewResponse<T = void> {
  constructor(readonly responseType: ViewResponseType, readonly data?: T) {}
}
