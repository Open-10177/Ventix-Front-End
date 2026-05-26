import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { HistoryRecord } from '../domain/model/history-record.entity';
import { HistoryRecordResource, HistoryRecordsResponse } from './history-records-response';

export class HistoryRecordAssembler implements BaseAssembler<HistoryRecord, HistoryRecordResource, HistoryRecordsResponse> {

  toEntityFromResource(resource: HistoryRecordResource): HistoryRecord {
    return new HistoryRecord({
      id: resource.id,
      date: resource.date,
      zone: resource.zone,
      humidity: resource.humidity,
      co2: resource.co2,
      temperature: resource.temperature,
      action: resource.action
    });
  }

  toResourceFromEntity(entity: HistoryRecord): HistoryRecordResource {

    return {
      id: entity.id,
      date: entity.date,
      zone: entity.zone,
      humidity: entity.humidity,
      co2: entity.co2,
      temperature: entity.temperature,
      action: entity.action
    } as HistoryRecordResource;
  }

  toEntitiesFromResponse(response: HistoryRecordsResponse
  ): HistoryRecord[] {
    return response.historyRecords.map(resource =>
      this.toEntityFromResource(
        resource as HistoryRecordResource
      )
    );
  }
}
