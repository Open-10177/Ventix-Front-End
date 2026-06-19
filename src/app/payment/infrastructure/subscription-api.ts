import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/environment';

export interface CurrentPlan {
  email: string;
  planId: string;
  planName: string;
  price: string;
  period: string;
}

/**
 * Infrastructure client for the backend current-plan (subscription) endpoint.
 */
@Injectable({ providedIn: 'root' })
export class SubscriptionApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.baseUrl}${environment.paymentCurrentPlanEndpointPath}`;

  getCurrentPlan(email: string): Observable<CurrentPlan> {
    const query = email ? `?email=${encodeURIComponent(email)}` : '';
    return this.http.get<CurrentPlan>(`${this.url}${query}`);
  }

  changePlan(plan: CurrentPlan): Observable<CurrentPlan> {
    return this.http.put<CurrentPlan>(this.url, plan);
  }
}
