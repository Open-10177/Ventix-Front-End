import { PlaceOrderCommand } from '../domain/model/place-order.command';
import { Order } from '../domain/model/order.entity';
import { OrderRequest } from './order.request';
import { OrderResponse } from './order-response';

export class OrderAssembler {
  static toDomain(response: OrderResponse): Order {
    return new Order(
      response.orderId,
      response.orderUuid,
      response.userUuid,
      response.nodeUuid,
      response.planType,
      response.status,
      response.amount,
      response.currency,
      response.stripePaymentIntentId,
    );
  }

  static toRequest(command: PlaceOrderCommand): OrderRequest {
    return {
      userId: command.userId,
      nodeUuid: command.nodeUuid,
      planType: command.planType,
    };
  }
}
