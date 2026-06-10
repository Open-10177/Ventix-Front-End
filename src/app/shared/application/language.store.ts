import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'es' | 'en';

type Dict = Record<string, string>;

const ES: Dict = {
  // Settings
  'settings.title': 'Configuración',
  'settings.changeEmail': 'Cambiar correo',
  'settings.changePassword': 'Cambiar Contraseña',
  'settings.saveChanges': 'Guardar cambios',
  'settings.chooseLanguage': 'Elige el idioma :',
  'settings.spanish': 'Español',
  'settings.english': 'Inglés',
  'settings.change': 'Cambiar',
  'settings.currentPlan': 'Plan actualmente',
  'settings.changePlan': 'Cambiar plan',
  'settings.switchAccount': 'Cambiar cuenta',
  'settings.logout': 'Cerrar sesión',
  'common.edit': 'Editar',
  'common.save': 'Guardar',
  'settings.editName': 'Editar nombre',
  'nav.settings': 'Configuración',
  'nav.notifications': 'Notificaciones',

  // Home
  'home.greeting': 'Hola, Martina Chavez',
  'home.tempToday': 'Temperatura de hoy',
  'home.co2': 'CO₂',
  'home.humidityToday': 'Humedad de hoy',
  'home.panic': 'Botón de pánico',
  'home.environments': 'Ambientes',
  'home.viewMap': 'Ver mapa',
  'home.addDevice': 'Agregar dispositivo',
  'home.mainFunctions': 'Funciones principales',
  'home.dataHistory': 'Historial de datos',
  'home.thresholds': 'Configuración de los umbrales',
  'home.fanUsage': 'Porcentaje de funcionamiento de los ventiladores',
  'home.monthly': 'Mensual',

  // Notifications
  'notif.title': 'Notificaciones',
  'notif.important': 'IMPORTANTES',
  'notif.info': 'INFORMACIÓN',
  'notif.viewDetails': 'Ver detalles',
  'notif.empty': 'Sin notificaciones',

  // Home map
  'map.title': 'Mapa del Hogar',
  'map.house': 'Casa',
  'map.battery': 'Batería',
  'map.add': 'Agregar',

  // Threshold config
  'th.title': 'Configuración de los umbrales',
  'th.zone': 'Zona',
  'th.nodeBattery': 'Batería del nodo',
  'th.operationMode': 'Modo de operación',
  'th.autoMode': 'Modo automático',
  'th.manualMode': 'Modo manual',
  'th.currentReadings': 'Lecturas actuales',
  'th.temp': 'Temp.',
  'th.humidity': 'Humedad',
  'th.settings': 'Configuraciones',
  'th.tempLimit': 'Temperatura límite',
  'th.co2Limit': 'Límite CO₂',
  'th.lastReading': 'Última lectura',
  'th.node': 'Nodo',
  'th.noData': 'Sin lecturas disponibles',

  // Analytics
  'an.title': 'Historial de datos',
  'an.last30': 'Últimos 30 días',
  'an.pickDate': 'Elegir fecha',
  'an.requestReport': 'Solicitar reporte',
  'an.date': 'Fecha',
  'an.zone': 'Zona',
  'an.humidity': 'Humedad',
  'an.co2': 'CO₂',
  'an.temperature': 'Temperatura',
  'an.systemAction': 'Acción del sistema',
};

const EN: Dict = {
  // Settings
  'settings.title': 'Settings',
  'settings.changeEmail': 'Change email',
  'settings.changePassword': 'Change password',
  'settings.saveChanges': 'Save changes',
  'settings.chooseLanguage': 'Choose language:',
  'settings.spanish': 'Spanish',
  'settings.english': 'English',
  'settings.change': 'Change',
  'settings.currentPlan': 'Current plan',
  'settings.changePlan': 'Change plan',
  'settings.switchAccount': 'Switch account',
  'settings.logout': 'Log out',
  'common.edit': 'Edit',
  'common.save': 'Save',
  'settings.editName': 'Edit name',
  'nav.settings': 'Settings',
  'nav.notifications': 'Notifications',

  // Home
  'home.greeting': 'Hi, Martina Chavez',
  'home.tempToday': "Today's temperature",
  'home.co2': 'CO₂',
  'home.humidityToday': "Today's humidity",
  'home.panic': 'Panic button',
  'home.environments': 'Environments',
  'home.viewMap': 'View map',
  'home.addDevice': 'Add device',
  'home.mainFunctions': 'Main functions',
  'home.dataHistory': 'Data history',
  'home.thresholds': 'Threshold settings',
  'home.fanUsage': 'Fan operation percentage',
  'home.monthly': 'Monthly',

  // Notifications
  'notif.title': 'Notifications',
  'notif.important': 'IMPORTANT',
  'notif.info': 'INFORMATION',
  'notif.viewDetails': 'View details',
  'notif.empty': 'No notifications',

  // Home map
  'map.title': 'Home Map',
  'map.house': 'House',
  'map.battery': 'Battery',
  'map.add': 'Add',

  // Threshold config
  'th.title': 'Threshold settings',
  'th.zone': 'Zone',
  'th.nodeBattery': 'Node battery',
  'th.operationMode': 'Operation mode',
  'th.autoMode': 'Automatic mode',
  'th.manualMode': 'Manual mode',
  'th.currentReadings': 'Current readings',
  'th.temp': 'Temp.',
  'th.humidity': 'Humidity',
  'th.settings': 'Settings',
  'th.tempLimit': 'Temperature limit',
  'th.co2Limit': 'CO₂ limit',
  'th.lastReading': 'Last reading',
  'th.node': 'Node',
  'th.noData': 'No readings available',

  // Analytics
  'an.title': 'Data history',
  'an.last30': 'Last 30 days',
  'an.pickDate': 'Pick a date',
  'an.requestReport': 'Request report',
  'an.date': 'Date',
  'an.zone': 'Zone',
  'an.humidity': 'Humidity',
  'an.co2': 'CO₂',
  'an.temperature': 'Temperature',
  'an.systemAction': 'System action',
};

const DICTS: Record<Lang, Dict> = { es: ES, en: EN };

@Injectable({ providedIn: 'root' })
export class LanguageStore {
  private readonly langSignal = signal<Lang>('es');
  readonly lang = this.langSignal.asReadonly();
  readonly dict = computed(() => DICTS[this.langSignal()]);

  setLang(lang: Lang): void {
    this.langSignal.set(lang);
  }

  t(key: string): string {
    return this.dict()[key] ?? key;
  }
}
