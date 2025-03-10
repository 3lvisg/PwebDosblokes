import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ImageSizes {
  product: {
    width: number;
    height: number;
  };
  solution: {
    width: number;
    height: number;
  };
  family: {
    width: number;
    height: number;
  };
}

interface MediaSizes {
  product: {
    imageWidth: number;
    imageHeight: number;
    videoWidth: number;
    videoHeight: number;
  };
  solution: {
    imageWidth: number;
    imageHeight: number;
    videoWidth: number;
    videoHeight: number;
  };
  family: {
    imageWidth: number;
    imageHeight: number;
  };
  hero: {
    videoWidth: number;
    videoHeight: number;
    videoMinHeight: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ImageSizeManagerService {
  private readonly defaultSizes: ImageSizes = {
    product: {
      width: 280,
      height: 280,
    },
    solution: {
      width: 0, // 0 significa 100%
      height: 400,
    },
    family: {
      width: 0, // 0 significa 100%
      height: 200,
    },
  };

  private readonly sizesSubject = new BehaviorSubject<ImageSizes>(
    this.defaultSizes
  );
  public sizes$ = this.sizesSubject.asObservable();

  constructor() {
    this.initialize();
  }

  private initialize() {
    // Inicializar con valores de CSS si están disponibles
    this.updateFromCssVariables();

    // Escuchar cambios en el CSS
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.updateFromCssVariables());
    }
  }

  private updateFromCssVariables() {
    if (typeof window === 'undefined') return;

    const styles = getComputedStyle(document.documentElement);

    const productHeight = Number.parseInt(
      styles.getPropertyValue('--product-card-image-height') || '280'
    );
    const solutionHeight = Number.parseInt(
      styles.getPropertyValue('--solution-image-height') || '400'
    );
    const familyHeight = Number.parseInt(
      styles.getPropertyValue('--family-card-image-height') || '200'
    );

    this.sizesSubject.next({
      product: {
        width: this.defaultSizes.product.width,
        height: productHeight || this.defaultSizes.product.height,
      },
      solution: {
        width: 0,
        height: solutionHeight || this.defaultSizes.solution.height,
      },
      family: {
        width: 0,
        height: familyHeight || this.defaultSizes.family.height,
      },
    });
  }

  /**
   * Actualiza el tamaño de un grupo específico de imágenes
   */
  updateSize(
    type: 'product' | 'solution' | 'family',
    width?: number,
    height?: number
  ) {
    const currentSizes = this.sizesSubject.value;
    const newSizes = { ...currentSizes };

    if (width !== undefined) {
      newSizes[type].width = width;

      // Actualizar variable CSS
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty(
          `--${type}-card-image-width`,
          width === 0 ? '100%' : `${width}px`
        );
      }
    }

    if (height !== undefined) {
      newSizes[type].height = height;

      // Actualizar variable CSS
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty(
          `--${type}-card-image-height`,
          `${height}px`
        );
      }
    }

    this.sizesSubject.next(newSizes);
  }

  /**
   * Restablece todos los tamaños a los valores predeterminados
   */
  resetSizes() {
    this.sizesSubject.next(this.defaultSizes);

    // Restablecer variables CSS
    if (typeof document !== 'undefined') {
      document.documentElement.style.removeProperty(
        '--product-card-image-width'
      );
      document.documentElement.style.removeProperty(
        '--product-card-image-height'
      );
      document.documentElement.style.removeProperty('--solution-image-height');
      document.documentElement.style.removeProperty(
        '--family-card-image-height'
      );
    }
  }
}

export class MediaSizeManagerService {
  private readonly defaultSizes: MediaSizes = {
    product: {
      imageWidth: 0, // 0 significa 100%
      imageHeight: 280,
      videoWidth: 0,
      videoHeight: 300,
    },
    solution: {
      imageWidth: 0,
      imageHeight: 400,
      videoWidth: 0,
      videoHeight: 400,
    },
    family: {
      imageWidth: 0,
      imageHeight: 200,
    },
    hero: {
      videoWidth: 0,
      videoHeight: 70, // vh
      videoMinHeight: 500,
    },
  };

  private readonly sizesSubject = new BehaviorSubject<MediaSizes>(
    this.defaultSizes
  );
  public sizes$ = this.sizesSubject.asObservable();

  constructor() {
    // Inicializar con valores de CSS si están disponibles
    this.updateFromCssVariables();

    // Escuchar cambios en el CSS
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.updateFromCssVariables());
    }
  }

  private updateFromCssVariables() {
    if (typeof window === 'undefined') return;

    const styles = getComputedStyle(document.documentElement);

    // Imágenes
    const productImageHeight = this.getCssVarAsNumber(
      styles,
      '--product-card-image-height',
      280
    );
    const productImageWidth = this.getCssVarAsNumber(
      styles,
      '--product-card-image-width',
      0
    );
    const solutionImageHeight = this.getCssVarAsNumber(
      styles,
      '--solution-image-height',
      400
    );
    const solutionImageWidth = this.getCssVarAsNumber(
      styles,
      '--solution-image-width',
      0
    );
    const familyImageHeight = this.getCssVarAsNumber(
      styles,
      '--family-card-image-height',
      200
    );
    const familyImageWidth = this.getCssVarAsNumber(
      styles,
      '--family-card-image-width',
      0
    );

    // Videos
    const heroVideoHeight = this.getCssVarAsNumber(
      styles,
      '--hero-video-height',
      70
    );
    const heroVideoWidth = this.getCssVarAsNumber(
      styles,
      '--hero-video-width',
      0
    );
    const heroVideoMinHeight = this.getCssVarAsNumber(
      styles,
      '--hero-video-min-height',
      500
    );
    const solutionVideoHeight = this.getCssVarAsNumber(
      styles,
      '--solution-video-height',
      400
    );
    const solutionVideoWidth = this.getCssVarAsNumber(
      styles,
      '--solution-video-width',
      0
    );
    const productVideoHeight = this.getCssVarAsNumber(
      styles,
      '--product-video-height',
      300
    );
    const productVideoWidth = this.getCssVarAsNumber(
      styles,
      '--product-video-width',
      0
    );

    this.sizesSubject.next({
      product: {
        imageWidth: productImageWidth,
        imageHeight: productImageHeight,
        videoWidth: productVideoWidth,
        videoHeight: productVideoHeight,
      },
      solution: {
        imageWidth: solutionImageWidth,
        imageHeight: solutionImageHeight,
        videoWidth: solutionVideoWidth,
        videoHeight: solutionVideoHeight,
      },
      family: {
        imageWidth: familyImageWidth,
        imageHeight: familyImageHeight,
      },
      hero: {
        videoWidth: heroVideoWidth,
        videoHeight: heroVideoHeight,
        videoMinHeight: heroVideoMinHeight,
      },
    });
  }

  private getCssVarAsNumber(
    styles: CSSStyleDeclaration,
    varName: string,
    defaultValue: number
  ): number {
    const value = styles.getPropertyValue(varName).trim();
    if (!value) return defaultValue;

    // Si termina en px, quitar el px y convertir a número
    if (value.endsWith('px')) {
      return Number.parseInt(value.slice(0, -2), 10) || defaultValue;
    }

    // Si termina en %, quitar el % y convertir a número
    if (value.endsWith('%')) {
      return Number.parseInt(value.slice(0, -1), 10) || defaultValue;
    }

    // Si termina en vh, quitar el vh y convertir a número
    if (value.endsWith('vh')) {
      return Number.parseInt(value.slice(0, -2), 10) || defaultValue;
    }

    // Si es 'auto' o cualquier otro valor no numérico
    if (isNaN(Number(value))) {
      return defaultValue;
    }

    return Number(value) || defaultValue;
  }

  /**
   * Actualiza el tamaño de imágenes
   */
  updateImageSize(
    type: 'product' | 'solution' | 'family',
    width?: number,
    height?: number
  ) {
    const currentSizes = this.sizesSubject.value;
    const newSizes = { ...currentSizes };

    if (width !== undefined) {
      newSizes[type].imageWidth = width;

      // Actualizar variable CSS
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty(
          `--${type}-${type === 'family' ? 'card-' : ''}image-width`,
          width === 0 ? '100%' : `${width}px`
        );
      }
    }

    if (height !== undefined) {
      newSizes[type].imageHeight = height;

      // Actualizar variable CSS
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty(
          `--${type}-${type === 'family' ? 'card-' : ''}image-height`,
          `${height}px`
        );
      }
    }

    this.sizesSubject.next(newSizes);
  }

  /**
   * Actualiza el tamaño de videos
   */
  updateVideoSize(
    type: 'hero' | 'solution' | 'product',
    width?: number,
    height?: number,
    minHeight?: number
  ) {
    const currentSizes = this.sizesSubject.value;
    const newSizes = { ...currentSizes };

    if (width !== undefined && type in newSizes) {
      newSizes[type].videoWidth = width;

      // Actualizar variable CSS
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty(
          `--${type}-video-width`,
          width === 0 ? '100%' : `${width}px`
        );
      }
    }

    if (height !== undefined && type in newSizes) {
      newSizes[type].videoHeight = height;

      // Actualizar variable CSS
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty(
          `--${type}-video-height`,
          type === 'hero' ? `${height}vh` : `${height}px`
        );
      }
    }

    if (minHeight !== undefined && type === 'hero') {
      newSizes.hero.videoMinHeight = minHeight;

      // Actualizar variable CSS
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty(
          `--hero-video-min-height`,
          `${minHeight}px`
        );
      }
    }

    this.sizesSubject.next(newSizes);
  }

  /**
   * Restablece todos los tamaños a los valores predeterminados
   */
  resetSizes() {
    this.sizesSubject.next(this.defaultSizes);

    // Restablecer variables CSS
    if (typeof document !== 'undefined') {
      // Imágenes
      document.documentElement.style.removeProperty(
        '--product-card-image-width'
      );
      document.documentElement.style.removeProperty(
        '--product-card-image-height'
      );
      document.documentElement.style.removeProperty('--solution-image-width');
      document.documentElement.style.removeProperty('--solution-image-height');
      document.documentElement.style.removeProperty(
        '--family-card-image-width'
      );
      document.documentElement.style.removeProperty(
        '--family-card-image-height'
      );

      // Videos
      document.documentElement.style.removeProperty('--hero-video-width');
      document.documentElement.style.removeProperty('--hero-video-height');
      document.documentElement.style.removeProperty('--hero-video-min-height');
      document.documentElement.style.removeProperty('--solution-video-width');
      document.documentElement.style.removeProperty('--solution-video-height');
      document.documentElement.style.removeProperty('--product-video-width');
      document.documentElement.style.removeProperty('--product-video-height');
    }
  }
}
