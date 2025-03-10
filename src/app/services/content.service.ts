import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';

export interface VideoContent {
  title?: string;
  url: string;
  urlMobile?: string;
  thumbnail: string;
}

export interface SolutionContent {
  title: string;
  subtitle?: string;
  subtitle2?: string;
  description: string;
  description2?: string;
  description3?: string;
  mainVideo: VideoContent;
  videos: VideoContent[];
  additionalInfo?: {
    title: string;
    description: string;
    image: string;
  };
}

export interface Content {
  home: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
      videoUrl: string;
      videoUrlMobile?: string;
    };
    solutions: {
      title: string;
      items: Array<{
        category: string;
        title: string;
        subtitle: string;
        image: string;
        description: string;
      }>;
    };
    products: {
      title: string;
      items: Array<{
        name: string;
        image: string;
        link: string;
      }>;
    };
  };
  navigation: {
    menu: Array<{
      title: string;
      path: string;
      submenu?: Array<{
        title: string;
        path: string;
      }>;
    }>;
  };
  solutions: {
    gimnasios: SolutionContent;
    parques: SolutionContent;
    parqueaderos: SolutionContent;
    institutos: SolutionContent;
    conjuntosResidenciales: SolutionContent;
  };
  products: {
    title: string;
    items: Product[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private contentSubject = new BehaviorSubject<Content>({
    home: {
      hero: {
        title: '',
        subtitle: '',
        cta: '',
        videoUrl: '',
      },
      solutions: {
        title: '',
        items: [],
      },
      products: {
        title: '',
        items: [],
      },
    },
    navigation: {
      menu: [
        {
          title: 'Inicio',
          path: '/',
        },
        {
          title: 'Soluciones',
          path: '#',
          submenu: [
            {
              title: 'Gimnasios',
              path: '/soluciones/gimnasios',
            },
            {
              title: 'Parques',
              path: '/soluciones/parques',
            },
            {
              title: 'Parqueaderos',
              path: '/soluciones/parqueaderos',
            },
            {
              title: 'Institutos',
              path: '/soluciones/institutos',
            },
            {
              title: 'Conjuntos Residenciales',
              path: '/soluciones/conjuntos-residenciales',
            },
          ],
        },
        {
          title: 'Productos',
          path: '/productos',
        },
      ],
    },
    solutions: {
      gimnasios: {
        title: 'GIMNASIOS',
        subtitle: 'Soluciones Avanzadas de Control de Acceso para Gimnasios.',
        subtitle2: 'Impulsa el crecimiento y la satisfacción de tus clientes.',
        description: `Impulsa la eficiencia y rentabilidad de tu gimnasio con un sistema diseñado para 
        ofrecer seguridad, control y una experiencia excepcional para tus usuarios. Nuestra solución 
        integra tecnología de vanguardia con controles biométricos, teclados digitales y torniquetes 
        autónomos, garantizando un acceso ágil y seguro, mientras optimiza la gestión de clientes y 
        mejora la recolección de cartera. Todo esto se traduce en un incremento de la rentabilidad 
        de hasta un 45% anual.`,
        description2: `Nuestra solución no solo optimiza los procesos internos, sino que también 
        contribuye a la retención de clientes al ofrecerles herramientas que facilitan su progreso y 
        motivación. Eleva la operación de tu gimnasio con una plataforma que combina innovación, 
        eficiencia y resultados tangibles.`,
        mainVideo: {
          title: 'VÍDEO GYM',
          url: 'assets/videos/gym-main.mp4',
          urlMobile: 'assets/videos/gym-main-mobile.mp4',
          thumbnail: 'assets/images/solutions/gym-main.webp',
        },
        videos: [
          {
            title: 'Entrenamiento 1',
            url: 'assets/videos/gym-1.mp4',
            thumbnail: 'assets/images/soluciones/Gym.png',
          },
          {
            title: 'Entrenamiento 2',
            url: 'assets/videos/gym-2.mp4',
            thumbnail: 'assets/images/soluciones/gym-2.png',
          },
        ],
        additionalInfo: {
          title: 'Información adicional',
          description: `
            Tenemos para ti una aplicación móvil que te permitirá el monitoreo del sistema desde tu 
            celular, además con nuestra app DosblokesGYM podrás ofrecer a tus usuarios una experiencia 
            única mediante rutinas de ejercicios, sugeridos de alimentación, agendamiento de clases, 
            y lo mejor de todo podrás fidelizar por su record de asistencia y mensajes de cumpleaños 
            al ingresar por el torniquete.`,
          image: 'assets/images/soluciones/Gym.png',
        },
      },
      parques: {
        title: 'PARQUES',
        subtitle: 'Soluciones Avanzadas de Control de Acceso para Parques',
        description: `Mejora la gestión de ingresos en tu parque con nuestra innovadora solución de control de acceso. 
        Ofrecemos un sistema flexible que combina la tecnología de códigos QR o manillas resistentes al agua y control 
        de tiempo diseñado para brindar comodidad y durabilidad.`,
        mainVideo: {
          title: 'VÍDEO PARQUES',
          url: 'assets/videos/gym-main.mp4',
          urlMobile: 'assets/videos/gym-main-mobile.mp4',
          thumbnail: 'assets/images/soluciones/Parques.png',
        },
        videos: [
          {
            title: 'Parques 1',
            url: 'assets/videos/gym-1.mp4',
            thumbnail: 'assets/images/soluciones/Parques.png',
          },
        ],
        additionalInfo: {
          title: 'Información adicional',
          description: `Optimiza la operación de tu parque con nuestra solución integral de control de acceso, 
          diseñada para mejorar la experiencia del visitante y maximizar tus ingresos.`,
          image: 'assets/images/soluciones/Parques.png',
        },
      },
      parqueaderos: {
        title: 'PARQUEADEROS',
        subtitle: 'Soluciones Avanzadas de Control de Acceso para Parqueaderos',
        description: `Optimiza la operación de tu parqueadero con una plataforma completa diseñada para mejorar 
        la eficiencia, automatizar procesos y aumentar tu rentabilidad. Nuestra solución combina tecnología 
        avanzada con herramientas de gestión que facilitan el control total de los accesos.`,
        mainVideo: {
          title: 'VÍDEO PARQUEADEROS',
          url: 'assets/videos/gym-main.mp4',
          urlMobile: 'assets/videos/gym-main-mobile.mp4',
          thumbnail: 'assets/images/soluciones/Parqueadero.png',
        },
        videos: [
          {
            title: 'Parqueaderos 1',
            url: 'assets/videos/gym-1.mp4',
            thumbnail: 'assets/images/soluciones/Parqueadero.png',
          },
        ],
        additionalInfo: {
          title: 'Información adicional',
          description: `Transforma tu parqueadero con nuestra solución integral que combina hardware robusto y 
          software inteligente para una gestión eficiente y rentable.`,
          image: 'assets/images/soluciones/Parqueadero.png',
        },
      },
      institutos: {
        title: 'INSTITUTOS',
        subtitle:
          'Soluciones Avanzadas de Control de Acceso para para tu Campus.',
        description: `Brinda la máxima seguridad a tu institución con nuestras barreras 
        físicas, diseñadas para asegurar que solo las personas autorizadas puedan ingresar. 
        Con nuestra tecnología, el acceso de estudiantes y personal se realiza de manera 
        rápida y sencilla mediante cédula o código QR, optimizando la gestión y protegiendo 
        tus instalaciones.`,
        mainVideo: {
          title: 'VÍDEO INSTITUTOS',
          url: 'assets/videos/instituto-main.mp4',
          urlMobile: 'assets/videos/gym-main-mobile.mp4',
          thumbnail: 'assets/images/soluciones/Institutos.png',
        },
        videos: [
          {
            title: 'Institutos 1',
            url: 'assets/videos/instituto-main.mp4',
            thumbnail: 'assets/images/soluciones/Institutos.png',
          },
        ],
        additionalInfo: {
          title: 'Información adicional',
          description: `
            Esta solución se puede complementar con un torniquete, permitiéndote verificar automáticamente 
            que los estudiantes estén al día con sus compromisos, garantizando así un control de acceso aún 
            más eficiente. Transforma tu universidad o instituto con tecnología avanzada Nuestra plataforma 
            es la herramienta ideal para fortalecer la seguridad, mejorar la gestión interna y modernizar tu 
            institución educativa, facilitando la transformación digital y potenciando el crecimiento.
            Asegura el control, la eficiencia y la tranquilidad con una solución moderna, escalable y fácil de implementar`,
          image: 'assets/images/soluciones/Institutos.png',
        },
      },
      conjuntosResidenciales: {
        title: 'CONJUNTOS RESIDENCIALES',
        subtitle:
          'Soluciones Avanzadas de Control de Acceso para conjunto residenciales',
        description: `Garantiza la seguridad y optimiza la gestión de accesos en tu copropiedad 
        con nuestra tecnología avanzada, diseñada para automatizar ingresos vehiculares y 
        peatonales de manera eficiente. Nuestra solución se adapta a las necesidades específicas 
        de cada conjunto residencial, automatizamos puertas vehiculares o peatonales, pueden ser 
        integradas con huellas, tarjetas, tag y antenas UHF, cámara de placa.`,
        mainVideo: {
          title: 'VÍDEO CONJUNTOS',
          url: 'assets/videos/gym-main.mp4',
          urlMobile: 'assets/videos/gym-main-mobile.mp4',
          thumbnail: 'assets/images/soluciones/Conjuntos.png',
        },
        videos: [
          {
            title: 'Conjuntos 1',
            url: 'assets/videos/gym-1.mp4',
            thumbnail: 'assets/images/soluciones/Conjuntos.png',
          },
        ],
        additionalInfo: {
          title: 'Información adicional',
          description: `
            Moderniza tu conjunto residencial con una solución de control de acceso 
            innovadora, segura y diseñada para mejorar la calidad de vida de toda la comunidad.`,
          image: 'assets/images/soluciones/Conjuntos.png',
        },
      },
    },
    products: {
      title: 'Nuestros Productos',
      items: [],
    },
  });
  private contentUrl = 'assets/data/content.json';
  private isLoading = false;

  constructor(private http: HttpClient) {
    // Cargar el contenido inmediatamente al inicializar el servicio
    this.loadContent();
  }

  private loadContent() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.http
      .get<Content>(this.contentUrl)
      .pipe(
        catchError((error) => {
          console.error('Error al cargar el contenido:', error);
          return of(this.contentSubject.value);
        })
      )
      .subscribe((content) => {
        this.contentSubject.next(content);
        this.isLoading = false;
      });
  }

  /**
   * Obtiene el contenido del sitio desde el archivo JSON
   * @returns Observable con el contenido
   */
  getContent(): Observable<Content> {
    return this.contentSubject.asObservable();
  }

  /**
   * Obtiene el contenido de una solución específica
   * @param solutionKey Clave de la solución (gimnasios, parques, etc.)
   * @returns Observable con el contenido de la solución
   */
  getSolutionContent(
    solutionKey: keyof Content['solutions']
  ): Observable<SolutionContent> {
    return new Observable((observer) => {
      this.getContent().subscribe({
        next: (content) => {
          if (content.solutions && content.solutions[solutionKey]) {
            observer.next(content.solutions[solutionKey]);
            observer.complete();
          } else {
            // Proporcionar un objeto de contenido predeterminado en caso de que no exista en el JSON
            const defaultContent: SolutionContent = {
              title: solutionKey.toUpperCase(),
              subtitle: `Soluciones para ${solutionKey}`,
              description:
                'Contenido no disponible. Por favor, configure el contenido en el archivo content.json.',
              mainVideo: {
                title: 'Video no disponible',
                url: 'assets/videos/placeholder.mp4',
                thumbnail: 'assets/images/placeholder.jpg',
              },
              videos: [],
            };
            console.warn(
              `No se encontró contenido para la solución: ${solutionKey}. Usando contenido predeterminado.`
            );
            observer.next(defaultContent);
            observer.complete();
          }
        },
        error: (error) => {
          console.error(
            `Error al obtener el contenido para ${solutionKey}:`,
            error
          );
          observer.error(error);
        },
      });
    });
  }

  /**
   * Recarga el contenido forzando una nueva solicitud HTTP
   * Útil cuando se ha actualizado el archivo JSON y se quiere reflejar los cambios
   */
  reloadContent(): Observable<Content> {
    this.loadContent();
    return this.contentSubject.asObservable();
  }
}
