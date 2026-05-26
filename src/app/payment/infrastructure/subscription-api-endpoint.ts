import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PaymentApi } from './payment-api';
import { Subscription } from '../domain/model/subscription.entity';
import { SubscriptionRequest } from './subscription.request';
import { SubscriptionAssembler } from './subscription-assembler';
import { SubscriptionResponse } from './subscription-response';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionApiEndpoint extends PaymentApi {
  private http = inject(HttpClient);

  getSubscription(userId: string): Observable<Subscription> {
    return this.http
      .get<SubscriptionResponse>(`${this.baseUrl}/subscriptions/users/${userId}`)
      .pipe(map(SubscriptionAssembler.toDomain));
  }

  create(request: SubscriptionRequest): Observable<Subscription> {
    return this.http
      .post<SubscriptionResponse>(`${this.baseUrl}/subscriptions`, request)
      .pipe(map(SubscriptionAssembler.toDomain));
  }

  cancel(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/subscriptions/${id}`);
  }
}
