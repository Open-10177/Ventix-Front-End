import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PaymentApi } from './payment-api';
import { Order } from '../domain/model/order.entity';
import { OrderRequest } from './order.request';
import { OrderAssembler } from './order-assembler';
import { OrderResponse } from './order-response';

@Injectable({
  providedIn: 'root',
})
export class OrderApiEndpoint extends PaymentApi {
  private http = inject(HttpClient);

  placeOrder(request: OrderRequest): Observable<Order> {
    return this.http
      .post<OrderResponse>(`${this.baseUrl}/orders`, request)
      .pipe(map(OrderAssembler.toDomain));
  }

  getOrder(id: string): Observable<Order> {
    return this.http
      .get<OrderResponse>(`${this.baseUrl}/orders/${id}`)
      .pipe(map(OrderAssembler.toDomain));
  }
}
