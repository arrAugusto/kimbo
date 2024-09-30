export function getGeoPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position),
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            alert('Permiso denegado. Por favor, habilita los permisos de ubicación en tu navegador.');
                            reject(new Error('Permiso denegado para obtener la ubicación.'));
                            break;
                        case error.POSITION_UNAVAILABLE:
                            reject(new Error('Ubicación no disponible.'));
                            break;
                        case error.TIMEOUT:
                            reject(new Error('Tiempo de espera agotado para obtener la ubicación.'));
                            break;
                        default:
                            reject(new Error('Error desconocido al obtener la ubicación.'));
                            break;
                    }
                }
            );
        } else {
            reject(new Error('Geolocalización no soportada por el navegador.'));
        }
    });
}


// src/app/utils/trackGeoPosition.ts

// src/app/utils/trackGeoPosition.ts

// Calcula la distancia entre dos puntos en base a sus coordenadas usando la fórmula Haversine.
function getDistanceFromLatLon(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = deg2rad(lat2 - lat1); // Convertir diferencia de latitud a radianes
    const dLon = deg2rad(lon2 - lon1); // Convertir diferencia de longitud a radianes
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Convertir a metros
    return distance;
  }
  
  // Convertir grados a radianes.
  function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
  
  // Iniciar monitoreo de posición con un umbral de distancia mínima para actualización.
  export function trackGeoPosition(
    onPositionChange: (position: GeolocationPosition) => void,
    onError: (error: GeolocationPositionError) => void,
    maxAccuracy: number = 10, // Precisión máxima aceptada en metros
    distanceThreshold: number = 5 // Definimos el umbral de distancia mínimo en 5 metros
  ): number | null {
    let lastPosition: GeolocationPosition | null = null; // Almacena la última posición conocida
  
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { accuracy, latitude, longitude } = position.coords;
  
          // Verificar si la precisión es aceptable antes de notificar la posición
          if (accuracy <= maxAccuracy) {
            // Calcular la distancia respecto a la última posición conocida
            if (lastPosition) {
              const distance = getDistanceFromLatLon(
                lastPosition.coords.latitude,
                lastPosition.coords.longitude,
                latitude,
                longitude
              );
  
              // Si la distancia es mayor que el umbral, considerarlo un cambio significativo
              if (distance >= distanceThreshold) {
                lastPosition = position; // Actualizar la última posición
                console.log(`Movimiento detectado: ${distance.toFixed(2)} metros.`);
                onPositionChange(position);
              } else {
                console.log(`Movimiento ignorado. Distancia menor a ${distanceThreshold} metros.`);
              }
            } else {
              lastPosition = position; // Almacenar la primera posición
              onPositionChange(position); // Primer reporte de posición
            }
          } else {
            console.warn(`Precisión no aceptable: ${accuracy.toFixed(2)} metros. Se requiere una precisión menor a ${maxAccuracy} metros.`);
          }
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert('Permiso denegado. Por favor, habilita los permisos de ubicación en tu navegador.');
              break;
            case error.POSITION_UNAVAILABLE:
              alert('Ubicación no disponible.');
              break;
            case error.TIMEOUT:
              alert('Tiempo de espera agotado para obtener la ubicación.');
              break;
            default:
              alert('Error desconocido al obtener la ubicación.');
              break;
          }
          onError(error);
        },
        {
          enableHighAccuracy: true, // Usar máxima precisión posible
          maximumAge: 0,            // No usar caché, obtener nueva posición
          timeout: 5000             // Tiempo máximo de espera en milisegundos
        }
      );
      return watchId;
    } else {
      alert('Geolocalización no soportada por el navegador.');
      return null;
    }
  }
  
  // Método para detener el monitoreo de la posición
  export function clearGeoWatch(watchId: number): void {
    if (navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId);
    }
  }
  