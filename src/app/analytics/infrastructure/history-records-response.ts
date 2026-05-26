import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface HistoryRecordResource extends BaseResource {
  id: number;
  date: string;
  zone: string;
  humidity: string;
  co2: string;
  temperature: string;
  action: string;
}

export interface HistoryRecordsResponse extends BaseResponse {
  historyRecords: HistoryRecordResource[];
}
