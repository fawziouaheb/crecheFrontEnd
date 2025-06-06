declare var bootstrap: any;

declare module 'leaflet-control-geocoder' {
  import * as L from 'leaflet';

  interface GeocoderControlOptions extends L.ControlOptions {
    defaultMarkGeocode?: boolean;
    showResultIcons?: boolean;
    collapsed?: boolean;
    expand?: 'touch' | 'click' | 'hover' | 'always';
    placeholder?: string;
    errorMessage?: string;
    iconLabel?: string;
    geocoder?: any;
  }

  class GeocoderControl extends L.Control {
    constructor(options?: GeocoderControlOptions);
    options: GeocoderControlOptions;
    on(event: string, callback: (e: any) => void, context?: any): this;
    off(event?: string, callback?: (e: any) => void, context?: any): this;
  }

  const Geocoder: {
    new (options?: GeocoderControlOptions): GeocoderControl;
    nominatim(): any;
  };
  export = Geocoder;
}

declare module 'leaflet-control-geocoder' {
  const Geocoder: any;
  export = Geocoder;
}
