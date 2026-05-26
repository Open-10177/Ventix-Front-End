import { PlanType } from '../domain/model/subscription.entity';

export interface OrderRequest {
  userId: string;
  nodeUuid: string;
  planType: PlanType;
}
