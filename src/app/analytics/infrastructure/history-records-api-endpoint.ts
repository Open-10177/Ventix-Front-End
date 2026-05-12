import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { HistoryRecord } from '../domain/model/history-record.entity';
import { HistoryRecordResource, HistoryRecordsResponse } from './history-records-response';
import { HistoryRecordAssembler } from './history-record-assembler';
import { environment } from '../../../enviroment/environment';

export class HistoryRecordsApiEndpoint extends BaseApiEndpoint<HistoryRecord, HistoryRecordResource, HistoryRecordsResponse, HistoryRecordAssembler> {
  constructor(http: HttpClient) {
    super(http, environment.baseUrl + environment.analyticsReportsEndpointPath, new HistoryRecordAssembler(),);
  }
}


