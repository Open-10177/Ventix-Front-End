import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IamApi } from '../infrastructure/iam-api';
import { SignInRequest } from '../infrastructure/sign-in.request';
import { SignUpRequest } from '../infrastructure/sign-up.request';
import { User } from '../domain/model/user.entity';

const STORAGE_KEY = 'ventix.auth';

/**
 * Application-level authentication state for the Ventix frontend.
 * Keeps the signed-in user + token, persists the session in localStorage and
 * exposes sign-in / sign-up / logout flows backed by the real backend.
 */
@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly api = inject(IamApi);

  private readonly _user = signal<User | null>(this.restore());

  readonly currentUser = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);
  readonly token = computed(() => this._user()?.token ?? '');

  signIn(request: SignInRequest): Observable<User> {
    return this.api.signIn(request).pipe(tap(user => this.persist(user)));
  }

  signUp(request: SignUpRequest): Observable<User> {
    return this.api.signUp(request).pipe(tap(user => this.persist(user)));
  }

  /** Switches the active session to the given user (used by account switching). */
  setCurrentUser(user: User): void {
    this.persist(user);
  }

  logout(): void {
    this._user.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  private persist(user: User): void {
    this._user.set(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  private restore(): User | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const u = JSON.parse(raw);
      return new User(u.id, u.email, u.username, u.role, u.avatarUrl, u.token);
    } catch {
      return null;
    }
  }
}
